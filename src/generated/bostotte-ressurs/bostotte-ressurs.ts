/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {useQuery, useMutation} from "@tanstack/react-query";
import type {
    UseQueryOptions,
    UseMutationOptions,
    QueryFunction,
    MutationFunction,
    UseQueryResult,
    QueryKey,
} from "@tanstack/react-query";
import type {BostotteFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentBostotte = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<BostotteFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/bostotte`, method: "get", signal},
        options
    );
};

export const getHentBostotteQueryKey = (behandlingsId: string) => [`/soknader/${behandlingsId}/inntekt/bostotte`];

export type HentBostotteQueryResult = NonNullable<Awaited<ReturnType<typeof hentBostotte>>>;
export type HentBostotteQueryError = unknown;

export const useHentBostotte = <TData = Awaited<ReturnType<typeof hentBostotte>>, TError = unknown>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentBostotte>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentBostotteQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentBostotte>>> = ({signal}) =>
        hentBostotte(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentBostotte>>, TError, TData>(queryKey, queryFn, {
        enabled: !!behandlingsId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const updateBostotte = (
    behandlingsId: string,
    bostotteFrontend: BostotteFrontend,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/bostotte`,
            method: "put",
            headers: {"Content-Type": "application/json"},
            data: bostotteFrontend,
        },
        options
    );
};

export type UpdateBostotteMutationResult = NonNullable<Awaited<ReturnType<typeof updateBostotte>>>;
export type UpdateBostotteMutationBody = BostotteFrontend;
export type UpdateBostotteMutationError = unknown;

export const useUpdateBostotte = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateBostotte>>,
        TError,
        {behandlingsId: string; data: BostotteFrontend},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateBostotte>>,
        {behandlingsId: string; data: BostotteFrontend}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateBostotte(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateBostotte>>,
        TError,
        {behandlingsId: string; data: BostotteFrontend},
        TContext
    >(mutationFn, mutationOptions);
};
export const updateSamtykke1 = (
    behandlingsId: string,
    boolean: boolean,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/bostotte/samtykke`,
            method: "post",
            headers: {"Content-Type": "application/json"},
            data: boolean,
        },
        options
    );
};

export type UpdateSamtykke1MutationResult = NonNullable<Awaited<ReturnType<typeof updateSamtykke1>>>;
export type UpdateSamtykke1MutationBody = boolean;
export type UpdateSamtykke1MutationError = unknown;

export const useUpdateSamtykke1 = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateSamtykke1>>,
        TError,
        {behandlingsId: string; data: boolean},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateSamtykke1>>,
        {behandlingsId: string; data: boolean}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateSamtykke1(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateSamtykke1>>,
        TError,
        {behandlingsId: string; data: boolean},
        TContext
    >(mutationFn, mutationOptions);
};