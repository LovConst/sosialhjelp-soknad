import React from "react";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {downloadAttachedFile} from "../../nav-soknad/utils/rest-utils";
import {Fil} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {basePath} from "../../configuration";

export const OpplastetVedlegg = (props: {behandlingsId: string | undefined; fil: Fil; onSlett: (fil: Fil) => void}) => {
    const handleSlett = (fil: Fil) => {
        props.onSlett(fil);
    };

    const lastNedUrl = `opplastetVedlegg/${props.behandlingsId}/${props.fil.uuid}/fil`;

    return (
        <div className="vedleggsliste__vedlegg">
            <span className="vedleggsliste__filnavn">
                <LinkButton onClick={() => downloadAttachedFile(lastNedUrl)}>{props.fil.filNavn}</LinkButton>
            </span>
            <span className="vedleggsliste__slett_ikon">
                <LinkButton onClick={() => handleSlett(props.fil)} aria-label={`Slett ${props.fil.filNavn}`}>
                    <img src={`${basePath}/statisk/bilder/ikon_trashcan.svg`} alt={""} />
                </LinkButton>
            </span>
        </div>
    );
};

export default OpplastetVedlegg;