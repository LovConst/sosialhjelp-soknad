import React, {useState, useRef} from "react";
import {lastOppEttersendelseVedlegg, slettEttersendtVedlegg} from "../../redux/ettersendelse/ettersendelseActions";
import {useDispatch, useSelector} from "react-redux";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import {MargIkon, MargIkoner} from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import {FormattedMessage} from "react-intl";
import {EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL, REST_STATUS} from "../../redux/soknad/soknadTypes";
import PaperclipIcon from "../../../nav-soknad/components/digisosIkon/paperclipIcon";
import {Knapp} from "nav-frontend-knapper";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";

interface Props {
    ettersendelseAktivert: boolean;
    children: React.ReactNode;
    vedlegg: EttersendelseVedleggBackend;
    feilKode?: string;
}

const EttersendelseVedlegg = (props: Props) => {
    const [filnavn, setFilnavn] = useState<string | null>(null);

    const {brukerbehandlingId, feiletVedleggId, opplastingStatus, ettersendStatus, opplastingVedleggType} = useSelector(
        (state: State) => state.ettersendelse
    );

    const dispatch = useDispatch();

    const leggTilVedleggKnapp = useRef<HTMLInputElement>(null);

    //leggTilVedleggKnapp!: HTMLInputElement | null;

    const removeFile = (filId: string, opplysningType: OpplysningType) => {
        if (brukerbehandlingId) {
            dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files) {
            return;
        }
        if (files.length !== 1) {
            return;
        }
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        setFilnavn(files[0].name);
        if (brukerbehandlingId) {
            dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, props.vedlegg.type, formData));
        }
        if (leggTilVedleggKnapp.current) {
            leggTilVedleggKnapp.current.value = "";
        }
    };

    const opplastingsFeil: boolean = opplastingStatus === REST_STATUS.FEILET && feiletVedleggId === props.vedlegg.type;
    const visFeilFiltypeFeilmelding: boolean = opplastingsFeil && props.feilKode === REST_FEIL.FEIL_FILTPYE;

    return (
        <span className="">
            <AvsnittMedMarger className="vedleggsliste__detalj">
                {props.children}
                <input
                    ref={leggTilVedleggKnapp}
                    onChange={(e) => handleFileUpload(e.target.files)}
                    type="file"
                    className="visuallyhidden"
                    tabIndex={-1}
                    accept={
                        window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                            ? "*"
                            : "image/jpeg,image/png,application/pdf"
                    }
                />
                {props.vedlegg?.filer.map((fil: Fil) => {
                    const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
                    return (
                        <div key={fil.uuid} className="vedleggsliste__filnavn_wrapper">
                            <LinkButton
                                className="vedleggsliste__filnavn_button"
                                title="Last ned vedlegg"
                                onClick={() => downloadAttachedFile(lastNedUrl)}
                            >
                                <PaperclipIcon />
                                <div className="vedleggsliste__filnavn_tekst">{fil.filNavn}</div>
                            </LinkButton>
                            <div className="vedleggsliste__fil_slett_wrapper">
                                <LinkButton
                                    className="vedleggsliste__fil_slett"
                                    title="Fjern vedlegg"
                                    onClick={() => removeFile(fil.uuid, props.vedlegg.type)}
                                >
                                    Fjern
                                    <MargIkon ikon={MargIkoner.SØPPELBØTTE} />
                                </LinkButton>
                            </div>
                        </div>
                    );
                })}

                {opplastingsFeil && props.feilKode !== REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                    <>
                        <span className="skjema__feilmelding">
                            "{filnavn}" &nbsp;
                            {!visFeilFiltypeFeilmelding && (
                                <FormattedMessage
                                    id={props.feilKode ? props.feilKode : "opplysninger.vedlegg.ugyldig"}
                                />
                            )}
                            {visFeilFiltypeFeilmelding && <FormattedMessage id="fil.feil.format" />}
                        </span>
                        <br />
                    </>
                )}

                {opplastingsFeil && props.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE && (
                    <>
                        <span className="skjema__feilmelding">{<FormattedMessage id={props.feilKode} />}</span>
                        <br />
                    </>
                )}

                <Knapp
                    type="standard"
                    spinner={props.vedlegg.type === opplastingVedleggType}
                    disabled={ettersendStatus === REST_STATUS.PENDING || opplastingStatus === REST_STATUS.PENDING}
                    autoDisableVedSpinner={true}
                    onClick={() => props.ettersendelseAktivert && leggTilVedleggKnapp.current?.click()}
                >
                    Velg vedlegg
                </Knapp>
            </AvsnittMedMarger>
        </span>
    );
};

export default EttersendelseVedlegg;
