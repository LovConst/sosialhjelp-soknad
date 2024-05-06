import {useNavigate} from "react-router";
import {logAmplitudeEvent} from "../../utils/amplitude";
import {ValideringsContext} from "../../../index";
import {useContext} from "react";

export const useSkjemaNavigation = (steg: number) => {
    const {
        state: {feil},
        dispatch,
    } = useContext(ValideringsContext);
    const navigate = useNavigate();

    const gotoPage = (newPage: number) => {
        if (newPage < steg) {
            dispatch({type: "clearAllValideringsfeil"});
        } else {
            if (feil.length) {
                dispatch({type: "visValideringsfeilPanel"});
            } else {
                dispatch({type: "clearAllValideringsfeil"});
                logAmplitudeEvent("skjemasteg fullført", {steg});
            }
        }

        navigate(`../${newPage}`);
    };

    return {
        gotoPage,
    };
};
