/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery} from "@tanstack/react-query";
import type {UseQueryOptions, QueryFunction, UseQueryResult, QueryKey} from "@tanstack/react-query";
import type {SysteminntekterFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentSystemregistrerteInntekter = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<SysteminntekterFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/systemdata`, method: "get", signal},
        options
    );
};

export const getHentSystemregistrerteInntekterQueryKey = (behandlingsId: string) => [
    `/soknader/${behandlingsId}/inntekt/systemdata`,
];

export type HentSystemregistrerteInntekterQueryResult = NonNullable<
    Awaited<ReturnType<typeof hentSystemregistrerteInntekter>>
>;
export type HentSystemregistrerteInntekterQueryError = unknown;

export const useHentSystemregistrerteInntekter = <
    TData = Awaited<ReturnType<typeof hentSystemregistrerteInntekter>>,
    TError = unknown
>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentSystemregistrerteInntekter>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentSystemregistrerteInntekterQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentSystemregistrerteInntekter>>> = ({signal}) =>
        hentSystemregistrerteInntekter(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentSystemregistrerteInntekter>>, TError, TData>(
        queryKey,
        queryFn,
        {enabled: !!behandlingsId, ...queryOptions}
    ) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};