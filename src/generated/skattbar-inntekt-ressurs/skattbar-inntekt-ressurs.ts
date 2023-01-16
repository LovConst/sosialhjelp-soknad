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
import type {SkattbarInntektFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const updateSamtykke = (
    behandlingsId: string,
    boolean: boolean,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/skattbarinntektogforskuddstrekk/samtykke`,
            method: "post",
            headers: {"Content-Type": "application/json"},
            data: boolean,
        },
        options
    );
};

export type UpdateSamtykkeMutationResult = NonNullable<Awaited<ReturnType<typeof updateSamtykke>>>;
export type UpdateSamtykkeMutationBody = boolean;
export type UpdateSamtykkeMutationError = unknown;

export const useUpdateSamtykke = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateSamtykke>>,
        TError,
        {behandlingsId: string; data: boolean},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateSamtykke>>,
        {behandlingsId: string; data: boolean}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateSamtykke(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateSamtykke>>,
        TError,
        {behandlingsId: string; data: boolean},
        TContext
    >(mutationFn, mutationOptions);
};
export const hentSkattbareInntekter = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<SkattbarInntektFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/skattbarinntektogforskuddstrekk`, method: "get", signal},
        options
    );
};

export const getHentSkattbareInntekterQueryKey = (behandlingsId: string) => [
    `/soknader/${behandlingsId}/inntekt/skattbarinntektogforskuddstrekk`,
];

export type HentSkattbareInntekterQueryResult = NonNullable<Awaited<ReturnType<typeof hentSkattbareInntekter>>>;
export type HentSkattbareInntekterQueryError = unknown;

export const useHentSkattbareInntekter = <TData = Awaited<ReturnType<typeof hentSkattbareInntekter>>, TError = unknown>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentSkattbareInntekter>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentSkattbareInntekterQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentSkattbareInntekter>>> = ({signal}) =>
        hentSkattbareInntekter(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentSkattbareInntekter>>, TError, TData>(queryKey, queryFn, {
        enabled: !!behandlingsId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};