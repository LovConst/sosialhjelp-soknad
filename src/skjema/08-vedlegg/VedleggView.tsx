import * as React from "react";
import VedleggFileSelector from "./LastOppFil";
import {Checkbox} from "nav-frontend-skjema";
import OpplastetVedlegg from "./OpplastetVedlegg";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../generated/model";
import {useVedlegg} from "./useVedlegg";
import {Opplysning, opplysningSpec} from "../../lib/opplysninger";
import {ChangeEvent} from "react";
import {useUpdateOkonomiskOpplysning} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {useQueryClient} from "@tanstack/react-query";
import {Alert} from "@navikt/ds-react";

const VedleggView = ({opplysning}: {opplysning: Opplysning}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const {textKey} = opplysningSpec[opplysning.type];
    const queryClient = useQueryClient();

    const {mutate} = useUpdateOkonomiskOpplysning({});

    const {deleteFile, files, upload, error, success, loading} = useVedlegg(opplysning);

    const handleAlleredeLastetOpp = async (e: ChangeEvent<HTMLInputElement>) => {
        await mutate({
            behandlingsId,
            data: {
                ...opplysning,
                vedleggStatus: e.target.checked
                    ? VedleggFrontendVedleggStatus.VedleggAlleredeSendt
                    : VedleggFrontendVedleggStatus.VedleggKreves,
            },
        });

        // FIXME: Don't know why this is needed, presumably race condition on back-end
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

        await queryClient.refetchQueries([`/soknader/${behandlingsId}/okonomiskeOpplysninger`]);
    };

    return (
        <div>
            <p>{t(`${textKey}.vedlegg.sporsmal.tittel`)}</p>
            <div className="vedleggsliste">
                {files.map((fil) => (
                    <OpplastetVedlegg key={fil.uuid} fil={fil} onDelete={deleteFile} />
                ))}
            </div>
            <VedleggFileSelector
                opplysning={opplysning}
                isDisabled={loading || opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                visSpinner={!!opplysning.pendingLasterOppFil}
                doUpload={upload}
            />
            {success && (
                <Alert variant="success" className={"py-2"}>
                    {success}
                </Alert>
            )}
            {error && (
                <Alert variant="error" className={"py-2"}>
                    {t(error)}
                </Alert>
            )}
            <Checkbox
                label={t("opplysninger.vedlegg.alleredelastetopp")}
                id={opplysning.type + "_allerede_lastet_opp_checkbox"}
                className={cx("vedleggLastetOppCheckbox", {
                    "checkboks--disabled": opplysning.filer?.length,
                })}
                onChange={handleAlleredeLastetOpp}
                checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
                disabled={!!files.length || loading}
            />
        </div>
    );
};

export default VedleggView;
