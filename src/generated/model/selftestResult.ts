/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {SelftestResultResult} from "./selftestResultResult";
import type {DependencyCheckResult} from "./dependencyCheckResult";

export interface SelftestResult {
    appName: string;
    version: string;
    result: SelftestResultResult;
    dependencyCheckResults: DependencyCheckResult[];
}