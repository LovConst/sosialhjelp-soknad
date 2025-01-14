import {useTranslation} from "react-i18next";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentSivilstatus} from "../../generated/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import * as React from "react";
import {LocalizedDate} from "../../lib/components/LocalizedDate";
import {FullName} from "../01-personalia/FulltNavn";
import {LocalizedYesNo} from "../../lib/components/LocalizedYesNo";

export const EktefellePersonaliaSystem = () => {
    const {t} = useTranslation("skjema", {keyPrefix: "system.familie"});
    const {expectOK} = useAlgebraic(useHentSivilstatus(useBehandlingsId()));

    // FIXME: Handle the reverse case of this if clause
    return expectOK(({ektefelle, erFolkeregistrertSammen}) =>
        ektefelle?.navn ? (
            <>
                <SysteminfoItem label={t("sivilstatus.label")} comment={t("sivilstatus")} />
                <SysteminfoItem label={t(`sivilstatus.gift.ektefelle.navn`)}>
                    <FullName name={ektefelle.navn} />
                </SysteminfoItem>
                {ektefelle?.fodselsdato && (
                    <SysteminfoItem label={t(`sivilstatus.gift.ektefelle.fodselsdato`)}>
                        <LocalizedDate date={ektefelle.fodselsdato} />
                    </SysteminfoItem>
                )}
                <SysteminfoItem label={t(`sivilstatus.gift.ektefelle.folkereg`)}>
                    <LocalizedYesNo value={erFolkeregistrertSammen} />
                </SysteminfoItem>
            </>
        ) : null
    );
};
