import {OppsummeringActionTypeKeys, OppsummeringActionTypes, NyOppsummeringResponse} from "./oppsummeringTypes";

export function bekreftOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.BEKREFT_OPPSUMMERING,
    };
}

export function setVisBekreftMangler(visBekreftMangler: boolean): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_VIS_BEKREFT_MANGLER,
        visBekreftMangler,
    };
}

export function hentOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.HENT_OPPSUMMERING,
    };
}

export function setOppsumering(oppsummering: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_OPPSUMMERING,
        oppsummering,
    };
}

export function hentOppsumeringFeilet(feilmelding: string): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.FEILET,
        feilmelding,
    };
}

export function hentNyOppsummering(): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.HENT_NY_OPPSUMMERING,
    };
}

export function setNyOppsummering(response: NyOppsummeringResponse): OppsummeringActionTypes {
    return {
        type: OppsummeringActionTypeKeys.SET_NY_OPPSUMMERING,
        response,
    };
}
