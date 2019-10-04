import { IntlShape } from "react-intl";
import {
	CheckboxFaktumTekst,
	SporsmalFaktumTekst,
	InputFaktumTekst,
	Faktum,
	FaktumValueType
} from "../types";

import { getIntlTextOrKey, getIntlInfoTekst, getIntlHjelpeTekst, getIntlText } from "./intlUtils";

export function getFaktumSporsmalTekst(
	intl: IntlShape,
	key: string
): SporsmalFaktumTekst {
	return {
		sporsmal: getIntlTextOrKey(intl, `${key}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}.hjelpetekst`)
	};
}
export function getFaktumCheckboksTekst(
	intl: IntlShape,
	key: string
): CheckboxFaktumTekst {
	return {
		label: getIntlTextOrKey(intl, key),
		infotekst: getIntlInfoTekst(intl, `${key}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}.hjelpetekst`)
	};
}

export function getRadioFaktumTekst(
	intl: IntlShape,
	key: string,
	value: string,
	property?: string
): CheckboxFaktumTekst {
	return getFaktumCheckboksTekst(
		intl,
		`${key}${getPropertyKey(property)}.${value}`
	);
}

export function getInputFaktumTekst(
	intl: IntlShape,
	key: string,
	property?: string
): InputFaktumTekst {
	const propertyKey = getPropertyKey(property);
	return {
		label: getIntlTextOrKey(intl, `${key}${propertyKey}.label`),
		sporsmal: getIntlTextOrKey(intl, `${key}${propertyKey}.sporsmal`),
		infotekst: getIntlInfoTekst(intl, `${key}${propertyKey}.infotekst`),
		hjelpetekst: getIntlHjelpeTekst(intl, `${key}${propertyKey}.hjelpetekst`),
		pattern: getIntlText(intl, `${key}${propertyKey}.pattern`)
	};
}

function getPropertyKey(property?: string) {
	return property === undefined ? "" : `.${property}`;
}

export function oppdaterFaktumMedVerdier(
	faktum: Faktum,
	verdi: FaktumValueType,
	property?: string
): Faktum {
	let nyttFaktum = { ...faktum };
	if (property) {
		nyttFaktum = {
			...faktum,
			properties: { ...faktum.properties, [property]: verdi }
		};
	} else {
		nyttFaktum.value = verdi;
	}
	return nyttFaktum;
}
