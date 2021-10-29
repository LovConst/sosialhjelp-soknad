import {combineReducers} from "redux";
import {valideringsReducer, ValideringState} from "./validering/valideringReducer";
import SoknadReducer from "./soknad/soknadReducer";
import OppsummeringReducer, {OppsummeringState} from "./oppsummering/oppsummeringReducer";
import LedeteksterReducer from "./ledetekster/ledeteksterReducer";
import MiljovariablerReducer from "./miljovariabler/miljovariablerReducer";
import EttersendelseReducer from "./ettersendelse/ettersendelseReducer";
import SoknadsdataReducer, {Soknadsdata} from "./soknadsdata/soknadsdataReducer";
import {opplysningerReducer} from "./okonomiskeOpplysninger/opplysningerReducer";
import {EttersendelseState} from "./ettersendelse/ettersendelseTypes";
import {OpplysningerModel} from "./okonomiskeOpplysninger/opplysningerTypes";
import {SoknadState} from "./soknad/soknadTypes";
import {MiljovariablerState} from "./miljovariabler/miljovariablerTypes";
import {LedeteksterState} from "./ledetekster/ledeteksterTypes";

export interface State {
    soknad: SoknadState;

    ledetekster: LedeteksterState;
    miljovariabler: MiljovariablerState;

    soknadsdata: Soknadsdata;
    okonomiskeOpplysninger: OpplysningerModel;
    oppsummering: OppsummeringState;
    ettersendelse: EttersendelseState;

    validering: ValideringState;
}

const reducers = () =>
    combineReducers({
        soknad: SoknadReducer,

        ledetekster: LedeteksterReducer,
        miljovariabler: MiljovariablerReducer,

        soknadsdata: SoknadsdataReducer,
        okonomiskeOpplysninger: opplysningerReducer,
        oppsummering: OppsummeringReducer,
        ettersendelse: EttersendelseReducer,

        validering: valideringsReducer,
    });

export default reducers;
