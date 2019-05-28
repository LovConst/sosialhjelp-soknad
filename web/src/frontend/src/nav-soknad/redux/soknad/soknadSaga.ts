import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	fetchDelete,
	fetchKvittering,
	fetchPost,
	fetchToJson, lastNedForsendelseSomZipFilHvisMockMiljoEllerDev
} from "../../utils/rest-utils";
import { finnFaktum, oppdaterFaktumMedVerdier} from "../../utils";
import { updateFaktaMedLagretVerdi } from "../fakta/faktaUtils";
import {
	HentKvitteringAction,
	HentSoknadAction,
	SendSoknadAction,
	SlettSoknadAction,
	SoknadActionTypeKeys, StartSoknadAction
} from "./soknadActionTypes";
import {
	navigerTilDittNav,
	navigerTilKvittering,
	navigerTilServerfeil,
	tilStart,
	tilSteg
} from "../navigasjon/navigasjonActions";
import { opprettFaktumSaga } from "../fakta/faktaSaga";
import { lagreFaktum, resetFakta, setFakta, opprettFaktum } from "../fakta/faktaActions";
import { OpprettFaktum, OpprettFaktumType } from "../fakta/faktaTypes";
import { Soknad } from "../../types";

import {
	hentKvitteringOk,
	hentSoknadOk,
	opprettSoknadOk,
	resetSoknad,
	sendSoknadOk,
	slettSoknadOk,
	startSoknadOk
} from "./soknadActions";
import {loggFeil} from "../navlogger/navloggerActions";

export const SKJEMAID = "NAV 35-18.01";

export interface OpprettSoknadResponse {
	brukerBehandlingId: string;
}

function* opprettSoknadSaga(): SagaIterator {
	try {
		yield put(resetSoknad());
		yield put(resetFakta());
		const response: OpprettSoknadResponse = yield call(
			fetchPost,
			"soknader",
			JSON.stringify({ soknadType: SKJEMAID })
		);
		yield put(opprettSoknadOk(response.brukerBehandlingId));
		const hentAction = { brukerBehandlingId: response.brukerBehandlingId } as HentSoknadAction;
		yield call(hentSoknadSaga, hentAction);
		yield put(startSoknadOk()); // TODO Rename metode navn
		yield put(tilSteg(1));
	} catch (reason) {
		yield put(loggFeil("opprett soknad saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* hentSoknadSaga(action: HentSoknadAction): SagaIterator {
	try {
		const soknad: Soknad = yield call(
			fetchToJson,
			`soknader/${action.brukerBehandlingId}`,
			null
		);
		yield call(oppdaterSoknadSaga, soknad);
		return soknad;
	} catch (reason) {
		yield put(loggFeil("hent soknad saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* opprettFaktumUtenParentHvisDetMangler(fakta: any, key: string): any {
	const faktum = finnFaktum(key, fakta);
	if (faktum == null) {
		yield* opprettFaktumSaga(opprettFaktum({key} as OpprettFaktumType) as OpprettFaktum) as any;
	}
}

function* oppdaterSoknadSaga(soknad: Soknad): SagaIterator {
	const fakta = updateFaktaMedLagretVerdi(soknad.fakta);
	yield put(setFakta(fakta));
	yield put(hentSoknadOk(soknad));

	// Kompatibilitetskode (for pre-adressesøksdata, 24.10.2018):
	yield* opprettFaktumUtenParentHvisDetMangler(fakta, "kontakt.system.oppholdsadresse.valg");
	yield* opprettFaktumUtenParentHvisDetMangler(fakta, "soknadsmottaker");
}

function* startSoknadSaga(action: StartSoknadAction): SagaIterator {
	try {
		const id = yield call(opprettSoknadSaga);
		const hentAction = { brukerBehandlingId: id } as HentSoknadAction;
		const soknad = yield call(hentSoknadSaga, hentAction);
		yield put(
			lagreFaktum(
				oppdaterFaktumMedVerdier(
					finnFaktum("personalia.kommune", soknad.fakta),
					action.kommune
				)
			)
		);
		if (action.bydel) {
			yield put(
				lagreFaktum(
					oppdaterFaktumMedVerdier(
						finnFaktum("personalia.bydel", soknad.fakta),
						action.bydel
					)
				)
			);
		}
		yield put(startSoknadOk());
		yield put(tilSteg(1));
	} catch (reason) {
		yield put(loggFeil("start soknad saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* slettSoknadSaga(action: SlettSoknadAction): SagaIterator {
	try {
		yield call(fetchDelete, "soknader/" + action.brukerBehandlingId);
		yield put(slettSoknadOk());
		if (action.destinasjon === "START") {
			yield put(tilStart());
		} else {
			yield put(navigerTilDittNav());
		}
	} catch (reason) {
		yield put(loggFeil("slett soknad saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* sendSoknadSaga(action: SendSoknadAction): SagaIterator {
	try {
		yield call(
			fetchPost,
			`soknader/${action.brukerBehandlingId}/actions/send`,
			JSON.stringify({ behandlingsId: action.brukerBehandlingId })
		);
		lastNedForsendelseSomZipFilHvisMockMiljoEllerDev(action.brukerBehandlingId);
		yield put(sendSoknadOk(action.brukerBehandlingId));
		yield put(navigerTilKvittering(action.brukerBehandlingId));
	} catch (reason) {
		yield put(loggFeil("send soknad saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

function* hentKvitteringSaga(action: HentKvitteringAction): SagaIterator {
	try {
		const kvittering = yield call(
			fetchKvittering,
			"soknader/" + action.brukerBehandlingId + "?sprak=nb_NO"
		);
		yield put(hentKvitteringOk(kvittering));
	} catch (reason) {
		yield put(loggFeil("hent kvittering saga feilet: " + reason));
		yield put(navigerTilServerfeil());
	}
}

export {
	opprettSoknadSaga,
	hentSoknadSaga,
	oppdaterSoknadSaga,
	startSoknadSaga,
	sendSoknadSaga,
	hentKvitteringSaga,
	slettSoknadSaga
};

function* soknadSaga(): SagaIterator {
	yield takeEvery(SoknadActionTypeKeys.START_SOKNAD, startSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.OPPRETT_SOKNAD, opprettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_SOKNAD, hentSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SLETT_SOKNAD, slettSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.SEND_SOKNAD, sendSoknadSaga);
	yield takeEvery(SoknadActionTypeKeys.HENT_KVITTERING, hentKvitteringSaga);
}

export default soknadSaga;
