/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {JsonAdresseKilde} from "./jsonAdresseKilde";
import type {JsonAdresseType} from "./jsonAdresseType";
import type {JsonAdresseAdresseValg} from "./jsonAdresseAdresseValg";

export interface JsonAdresse {
    kilde?: JsonAdresseKilde;
    type?: JsonAdresseType;
    adresseValg?: JsonAdresseAdresseValg;
}