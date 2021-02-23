import * as React from "react";
import {useEffect} from "react";
import Panel from "nav-frontend-paneler";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import Knapp from "nav-frontend-knapper";
import {FormattedMessage, useIntl} from "react-intl";
import AppBanner from "../../../nav-soknad/components/appHeader/AppHeader";
import {Checkbox} from "nav-frontend-skjema";
import {useDispatch, useSelector} from "react-redux";
import {getErSystemdataEndret, hentSamtykker, oppdaterSamtykke} from "../../redux/soknad/soknadActions";
import {State} from "../../redux/reducers";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {ErSystemdataEndret, Samtykke} from "../../redux/soknad/soknadActionTypes";
import {tilSteg} from "../../redux/navigasjon/navigasjonActions";
import Veilederpanel from "nav-frontend-veilederpanel";
import EllaKompakt from "../../../nav-soknad/components/svg/EllaKompakt";
import NavFrontendSpinner from "nav-frontend-spinner";

const SamtykkeView: React.FC = () => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const behandlingsId: string | undefined = useSelector((state: State) => state.soknad.behandlingsId);
    const erSystemdataEndret: ErSystemdataEndret = useSelector((state: State) => state.soknad.erSystemdataEndret);
    const samtykker: Samtykke[] | undefined = useSelector((state: State) => state.soknad.samtykker);
    const samtykkeRestStatus: REST_STATUS = useSelector((state: State) => state.soknad.samtykkeRestStatus);
    let samtykkerTekst: string = "";

    useEffect(() => {
        if (behandlingsId) {
            dispatch(getErSystemdataEndret(behandlingsId));
            dispatch(hentSamtykker(behandlingsId));
        }
    }, [behandlingsId, dispatch]);

    const harLastetinnSamtykker = samtykkeRestStatus === REST_STATUS.OK;
    let harAvsjekketSamtykkeBoksen: boolean = false;
    let harSamtykker: boolean = false;

    if (harLastetinnSamtykker && samtykker) {
        const faktiskeSamtykker = samtykker.filter((samtykke) => (samtykke.verdi ? samtykke.verdi : false));
        harSamtykker = faktiskeSamtykker.length > 0;
        faktiskeSamtykker.forEach(function (item) {
            const text = getIntlTextOrKey(intl, "informasjon.samtykke." + item.type);
            samtykkerTekst += samtykkerTekst === "" ? text : " og " + text;
        });
    }

    if (harLastetinnSamtykker && behandlingsId && !harSamtykker) {
        dispatch(tilSteg(1, behandlingsId));
    }

    function knappOppdaterSamtykkeOgGaTilSteg1() {
        if (behandlingsId && samtykker) {
            dispatch(oppdaterSamtykke(behandlingsId, harAvsjekketSamtykkeBoksen, samtykker));
        }
    }

    return (
        <div className="app-digisos informasjon-side">
            <AppBanner />
            {!harSamtykker && (
                <div className="application-spinner">
                    <NavFrontendSpinner type="XXL" />
                </div>
            )}
            {harSamtykker && (
                <Panel className={"skjema-content"}>
                    <Veilederpanel svg={<EllaKompakt />} fargetema="advarsel" kompakt={true} type="plakat">
                        {erSystemdataEndret === ErSystemdataEndret.YES && (
                            <div className="skjemaelement--horisontal">
                                <FormattedMessage id="oppsummering.systemdataendret.true" />
                            </div>
                        )}
                        <>
                            <div className="skjemaelement--horisontal">
                                <FormattedMessage id="informasjon.samtykke.info_del1" />
                                {" " + samtykkerTekst + ". "}
                                <FormattedMessage id="informasjon.samtykke.info_del2" />
                            </div>
                            <Checkbox
                                label={
                                    getIntlTextOrKey(intl, "informasjon.samtykke.sporsmal") + " " + samtykkerTekst + "."
                                }
                                onChange={(event: any) => (harAvsjekketSamtykkeBoksen = event.target.checked)}
                            />
                        </>
                    </Veilederpanel>
                    <Knapp
                        id="gi_bostotte_samtykke"
                        type="hoved"
                        onClick={() => {
                            knappOppdaterSamtykkeOgGaTilSteg1();
                        }}
                        className="samtykke_knapp_padding"
                    >
                        {getIntlTextOrKey(intl, "informasjon.samtykke.knapp")}
                    </Knapp>
                </Panel>
            )}
        </div>
    );
};

export default SamtykkeView;
