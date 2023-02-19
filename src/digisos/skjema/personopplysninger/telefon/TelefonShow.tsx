import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useHentTelefonnummer} from "../../../../generated/telefonnummer-ressurs/telefonnummer-ressurs";
import {useBehandlingsId} from "../../../../lib/hooks/useBehandlingsId";
import {TelefonShowBrukerdefinert} from "./TelefonShowBrukerdefinert";
import {TelefonShowFraKRR} from "./TelefonShowFraKRR";
import {LinkButton} from "../../../../nav-soknad/components/linkButton/LinkButton";
import * as React from "react";

export const TelefonShow = ({onEdit}: {onEdit: () => void}) => {
    const {expectOK} = useAlgebraic(useHentTelefonnummer(useBehandlingsId()));

    return expectOK(({systemverdi, brukerutfyltVerdi, brukerdefinert}) => {
        if (brukerdefinert && brukerutfyltVerdi)
            return <TelefonShowBrukerdefinert brukerutfyltVerdi={brukerutfyltVerdi} onEdit={onEdit} />;
        if (systemverdi?.length) return <TelefonShowFraKRR systemverdi={systemverdi} onEdit={onEdit} />;

        // TODO: Hardkodet i18n-streng
        return (
            <>
                Vi fant ikke et telefonnummer i kontakt- og reservasjonsregisteret.
                <LinkButton onClick={onEdit}>Klikk her for å oppgi et telefonnummer</LinkButton>
            </>
        );
    });
};
