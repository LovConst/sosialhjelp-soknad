/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {AdresseFrontendType} from "./adresseFrontendType";
import type {GateadresseFrontend} from "./gateadresseFrontend";
import type {MatrikkeladresseFrontend} from "./matrikkeladresseFrontend";
import type {UstrukturertAdresseFrontend} from "./ustrukturertAdresseFrontend";

export interface AdresseFrontend {
    type?: AdresseFrontendType;
    gateadresse?: GateadresseFrontend;
    matrikkeladresse?: MatrikkeladresseFrontend;
    ustrukturert?: UstrukturertAdresseFrontend;
}