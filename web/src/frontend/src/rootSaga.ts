import { all } from "redux-saga/effects";
import ledeteksterSaga from "./nav-soknad/redux/ledetekster/ledeteksterSaga";
import faktaSaga from "./nav-soknad/redux/fakta/faktaSaga";
import navigasjonSaga from "./nav-soknad/redux/navigasjon/navigasjonSaga";

export default function* rootSaga() {
	yield all([
		ledeteksterSaga(),
		faktaSaga(),
		navigasjonSaga()
	]);
}
