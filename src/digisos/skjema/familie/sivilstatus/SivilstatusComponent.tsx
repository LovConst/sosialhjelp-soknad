import {Familie, lagBlankPerson, Status} from "./FamilieTypes";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";

import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import PersonSkjema from "./PersonSkjema";
import {oppdaterSoknadsdataSti, SoknadsSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../../lib/hooks/useBehandlingsId";

interface RadioProps {
    id?: string;
    verdi: Status;
    checked: boolean;
    onClick: (verdi: Status) => void;
}

const SivilstatusRadioknapp: React.FunctionComponent<RadioProps> = ({verdi, id, checked, onClick}) => {
    const componentId = id ? id : "sivilstatus_" + verdi + "_radio";
    return (
        <RadioEnhanced
            name="sivilstatus"
            id={componentId}
            faktumKey="familie.sivilstatus"
            value={verdi}
            checked={checked}
            onChange={() => onClick(verdi)}
        />
    );
};

const SivilstatusComponent = () => {
    const behandlingsId = useBehandlingsId();
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    const onClickSivilstatus = (verdi: Status) => {
        if (behandlingsId) {
            let sivilstatus = soknadsdata.familie.sivilstatus;
            const oldStatus = sivilstatus.sivilstatus;
            if (oldStatus !== verdi) {
                if (verdi === Status.GIFT) {
                    sivilstatus = {
                        kildeErSystem: false,
                        sivilstatus: Status.GIFT,
                        ektefelle: lagBlankPerson(),
                    };
                } else {
                    sivilstatus = {
                        kildeErSystem: false,
                        sivilstatus: verdi,
                    };
                }
                dispatch(oppdaterSoknadsdataSti(SoknadsSti.SIVILSTATUS, sivilstatus));
                lagreSoknadsdata(behandlingsId, SoknadsSti.SIVILSTATUS, sivilstatus, dispatch);
            }
        }
    };

    const familie: Familie = soknadsdata.familie;
    const sivilstatus = familie && familie.sivilstatus ? familie.sivilstatus.sivilstatus : null;

    return (
        <div className="skjema-sporsmal">
            <Sporsmal tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus")}>
                <SivilstatusRadioknapp
                    verdi={Status.GIFT}
                    checked={sivilstatus === Status.GIFT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                {sivilstatus === Status.GIFT && (
                    <div className="skjema-sporsmal--jaNeiSporsmal">
                        <Underskjema visible={sivilstatus === Status.GIFT} arrow={true}>
                            <Sporsmal
                                tekster={getFaktumSporsmalTekst(t, "familie.sivilstatus.gift.ektefelle")}
                                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                            >
                                <div className="blokk-s">
                                    <PersonSkjema />
                                </div>
                            </Sporsmal>
                        </Underskjema>
                    </div>
                )}
                <SivilstatusRadioknapp
                    verdi={Status.UGIFT}
                    checked={sivilstatus === Status.UGIFT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SAMBOER}
                    checked={sivilstatus === Status.SAMBOER}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.ENKE}
                    checked={sivilstatus === Status.ENKE}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SKILT}
                    checked={sivilstatus === Status.SKILT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
                <SivilstatusRadioknapp
                    verdi={Status.SEPARERT}
                    checked={sivilstatus === Status.SEPARERT}
                    onClick={(verdi) => onClickSivilstatus(verdi)}
                />
            </Sporsmal>
            {sivilstatus === Status.GIFT && (
                <Informasjonspanel farge="viktig" ikon={"ella"}>
                    <h4 className="skjema-sporsmal__infotekst__tittel">
                        {t("system.familie.sivilstatus.informasjonspanel.tittel")}
                    </h4>
                    {t("system.familie.sivilstatus.informasjonspanel.tekst")}
                </Informasjonspanel>
            )}
        </div>
    );
};

export default SivilstatusComponent;
