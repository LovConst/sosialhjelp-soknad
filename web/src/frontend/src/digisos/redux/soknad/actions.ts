import { Action, Dispatch } from "redux";
import {
	ActionTypeKeys,
	OpprettSoknadAction,
	SetBrukerBehandlingIdAction,
	SetServerFeilAction,
	ResetSoknadAction,
	SetOppsummering,
	SettRestStatusPending,
	SettRestStatusOk
} from "./types";
import { fetchPost, fetchToJson, fetchHtml } from "../rest-utils";
import { setFaktumVerdi, setFakta } from "../../../nav-soknad/redux/actions";

export type ActionTypes =
	| OpprettSoknadAction
	| SetBrukerBehandlingIdAction
	| SetServerFeilAction
	| ResetSoknadAction
	| SetOppsummering
	| SettRestStatusPending
	| SettRestStatusOk;

export function opprettSoknad(kommuneId: string, bydelId: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.PENDING });
		const payload = JSON.stringify({ soknadType: "NAV DIGISOS" });
		fetchPost("soknader", payload)
			.then(response => {
				const key = "brukerBehandlingId";
				const brukerBehandlingId = response[key];
				dispatch({
					type: ActionTypeKeys.SET_BRUKERBEHANDLING_ID,
					brukerBehandlingId
				});
				hentFakta(brukerBehandlingId, dispatch).then(fakta => {
					dispatch(setFakta(fakta));
					dispatch(setFaktumVerdi("personalia.kommune", kommuneId));
					if (bydelId !== "") {
						dispatch(setFaktumVerdi("personalia.bydel", bydelId));
					}
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

export function lesSoknad(brukerBehandlingId: string) {
	return (dispatch: Dispatch<Action>) => {
		// dispatch({ type: ActionTypeKeys.PENDING});
		hentFakta(brukerBehandlingId, dispatch).then(fakta => {
			dispatch(setFakta(fakta));
			dispatch({ type: ActionTypeKeys.OK});
		});
	};
}

function hentFakta(brukerBehandlingId: string, dispatch: Dispatch<Action>) {
	dispatch({ type: ActionTypeKeys.PENDING });
	return fetchToJson(
		"soknader/" + brukerBehandlingId
	).catch(reason => {
		dispatch({ type: ActionTypeKeys.FEILET});
		dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
	});
}

export function hentOppsummering(id: string) {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.PENDING });
		fetchHtml("soknader/" + id + "/oppsummering")
			.then(response => {
				dispatch({
					type: ActionTypeKeys.SET_OPPSUMMERING,
					oppsummering: response
				});
			})
			.catch(reason => {
				dispatch({ type: ActionTypeKeys.SET_SERVER_FEIL, feilmelding: reason });
			});
	};
}

export function resetSoknad() {
	return (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypeKeys.RESET_SOKNAD });
	};
}
