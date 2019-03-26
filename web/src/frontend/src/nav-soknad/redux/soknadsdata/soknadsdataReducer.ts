import { Reducer } from "../reduxTypes";
import {
	initialKontonummerState, Kontonummer
} from "../../../digisos/skjema/personopplysninger/bankinfo/KontonummerType";
import { Begrunnelse, initialBegrunnelseState } from "../../../digisos/skjema/begrunnelse_ny/begrunnelseTypes";
import {
	initialTelefonnummerState,
	Telefonnummer
} from "../../../digisos/skjema/personopplysninger/telefon/telefonTypes";
import { Bosituasjon, initialBosituasjonState } from "../../../digisos/skjema/bosituasjon_ny/bosituasjonTypes";
import {
	Familie, initialFamilieStatus, Sivilstatus,
} from "../../../digisos/skjema/familie/sivilstatus/FamilieTypes";
import { initialUtdanningState, Utdanning } from "../../../digisos/skjema/arbeidUtdanning/utdanning/utdanningTypes";
import { Arbeid, initialArbeidState } from "../../../digisos/skjema/arbeidUtdanning/arbeid/arbeidTypes";
import { setPath } from "./soknadsdataActions";

export enum SoknadsdataActionTypeKeys {
	OPPDATER_SOKNADSDATA = "soknadsdata/OPPDATER",
	OPPDATER_SOKNADSDATA_STI = "soknadsdata/OPPDATER_STI"
}

/*
 * Sti for REST endepunkter og redux state datastruktur:
 * Eksempel: Kontonummer hentes fra REST endepunktet "http://..../123/personalia/kontonummer"
 * og legges på redux state state.soknadsdata.personalia.kontonummer
 */
export enum SoknadsSti {
	ARBEID = "arbeid",
	BANKINFORMASJON = "personalia/kontonummer",
	BEGRUNNELSE = "begrunnelse",
	BOSITUASJON = "bosituasjon",
	UTDANNING = "utdanning",
	TELEFONNUMMER = "personalia/telefonnummer",
	SIVILSTATUS = "familie/sivilstatus"
}

export interface Personalia {
	kontonummer?: Kontonummer;
	telefonnummer?: Telefonnummer;
}

export const initialPersonaliaState: Personalia = {
	kontonummer: initialKontonummerState,
	telefonnummer: initialTelefonnummerState
};

export interface Soknadsdata {
	arbeid: Arbeid;
	begrunnelse: Begrunnelse;
	bosituasjon: Bosituasjon;
	familie: Familie;
	utdanning: Utdanning;
	personalia: Personalia;
}

export interface SoknadsdataActionVerdi {
	arbeid?: Arbeid,
	bosituasjon?: Bosituasjon,
	begrunnelse?: Begrunnelse,
	familie?: Familie
	utdanning?: Utdanning,
	personalia: Personalia;
}

export type SoknadsdataType =
	Arbeid
	| Begrunnelse
	| Bosituasjon
	| Familie
	| Utdanning
	| Kontonummer
	| Telefonnummer
	| Personalia
	| Sivilstatus;

interface SoknadsdataActionType {
	type: SoknadsdataActionTypeKeys,
	verdi: SoknadsdataActionVerdi | SoknadsdataType,
	sti?: string
}

export const initialSoknadsdataState: Soknadsdata = {
	arbeid: initialArbeidState,
	begrunnelse: initialBegrunnelseState,
	bosituasjon: initialBosituasjonState,
	familie: initialFamilieStatus,
	utdanning: initialUtdanningState,
	personalia: initialPersonaliaState
};

const SoknadsdataReducer: Reducer<Soknadsdata, SoknadsdataActionType> = (
	state = initialSoknadsdataState,
	action
): any => {
	switch (action.type) {
		case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA: {
			return {
				...state,
				...action.verdi
			};
		}
		case SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI: {
			return {
				...setPath(state, action.sti, action.verdi)
			};
		}
		default:
			return state;
	}
};

export const oppdaterSoknadsdataState = (verdi: SoknadsdataActionVerdi): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA,
		verdi
	}
};

export const oppdaterSoknadsdataSti = (sti: string, verdi: SoknadsdataType): SoknadsdataActionType => {
	return {
		type: SoknadsdataActionTypeKeys.OPPDATER_SOKNADSDATA_STI,
		sti,
		verdi
	}
};

export default SoknadsdataReducer;
