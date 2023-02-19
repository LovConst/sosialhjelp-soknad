import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {useTranslation} from "react-i18next";
import {ArbeidsforholdFrontend} from "../../../../generated/model";
import {useHentArbeid} from "../../../../generated/arbeid-ressurs/arbeid-ressurs";
import {useBehandlingsId} from "../../../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";

export const ArbeidsforholdListe = () => {
    const {t} = useTranslation("skjema");
    const {expectOK} = useAlgebraic(useHentArbeid(useBehandlingsId()));

    return expectOK(({arbeidsforhold}) => (
        <div className={"py-2"}>
            {arbeidsforhold?.map((arbeidsforhold, i) => (
                <ArbeidsforholdDetalj key={i} arbeidsforhold={arbeidsforhold} />
            )) ?? <p>{t("arbeidsforhold.ingen")}</p>}
        </div>
    ));
};
const ArbeidsforholdDetalj = ({arbeidsforhold}: {arbeidsforhold: ArbeidsforholdFrontend}) => {
    const {arbeidsgivernavn, stillingsprosent, fom, tom} = arbeidsforhold;
    const {t} = useTranslation("skjema", {keyPrefix: "arbeidsforhold"});

    return (
        <Systeminfo>
            <SysteminfoItem label={t("arbeidsgivernavn.label")}>{arbeidsgivernavn}</SysteminfoItem>
            <SysteminfoItem label={t("fom.label")}>{fom}</SysteminfoItem>
            {tom?.length && <SysteminfoItem label={t("tom.label")}>{tom}</SysteminfoItem>}
            <SysteminfoItem label={t("stillingsprosent.label")}>{stillingsprosent}%</SysteminfoItem>
        </Systeminfo>
    );
};
