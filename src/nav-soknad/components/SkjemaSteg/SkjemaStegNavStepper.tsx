import {Stepper} from "@navikt/ds-react";
import * as React from "react";
import {useIntl} from "react-intl";
import {DigisosSkjemaStegKey, SkjemaConfig, SkjemaSteg} from "./digisosSkjema";

export const SkjemaStegNavStepper = ({
    skjemaConfig,
    aktivtSteg,
    onStepChange,
}: {
    skjemaConfig: SkjemaConfig;
    aktivtSteg: DigisosSkjemaStegKey;
    onStepChange: (steg: number, aktivtSteg?: SkjemaSteg) => void;
}) => {
    const steg = skjemaConfig.steg[aktivtSteg];
    const intl = useIntl();

    return (
        <div className={"mt-2 py-4 lg:py-10 max-w-md mx-auto"}>
            <Stepper
                className={"top-stepper"}
                aria-label="Søknadssteg"
                activeStep={steg.id}
                orientation={"horizontal"}
                onStepChange={(s: number) => onStepChange(s, steg)}
            >
                {Object.entries(skjemaConfig.steg)
                    .filter(([_, s]) => s.type === "skjema")
                    .map(([key, _]) => (
                        <Stepper.Step as="button">{intl.formatMessage({id: `${key}.tittel`})}</Stepper.Step>
                    ))}
            </Stepper>
        </div>
    );
};