/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {JsonArbeidsforhold} from "./jsonArbeidsforhold";
import type {JsonArbeidssituasjon} from "./jsonArbeidssituasjon";
import type {JsonKommentarTilArbeidsforhold} from "./jsonKommentarTilArbeidsforhold";

export interface JsonArbeid {
    forhold?: JsonArbeidsforhold[];
    situasjon?: JsonArbeidssituasjon;
    kommentarTilArbeidsforhold?: JsonKommentarTilArbeidsforhold;
}