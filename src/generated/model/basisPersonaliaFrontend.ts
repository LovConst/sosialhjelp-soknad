/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {NavnFrontend} from "./navnFrontend";

export interface BasisPersonaliaFrontend {
    navn: NavnFrontend;
    fornavn: string;
    fulltNavn: string;
    fodselsnummer?: string;
    statsborgerskap?: string;
    nordiskBorger?: boolean;
}