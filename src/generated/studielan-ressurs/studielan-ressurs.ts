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
import type {StudielanFrontend} from ".././model";
import {axiosInstance} from "../../lib/orval/axios-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const hentStudielanBekreftelse = (
    behandlingsId: string,
    options?: SecondParameter<typeof axiosInstance>,
    signal?: AbortSignal
) => {
    return axiosInstance<StudielanFrontend>(
        {url: `/soknader/${behandlingsId}/inntekt/studielan`, method: "get", signal},
        options
    );
};

export const getHentStudielanBekreftelseQueryKey = (behandlingsId: string) => [
    `/soknader/${behandlingsId}/inntekt/studielan`,
];

export type HentStudielanBekreftelseQueryResult = NonNullable<Awaited<ReturnType<typeof hentStudielanBekreftelse>>>;
export type HentStudielanBekreftelseQueryError = unknown;

export const useHentStudielanBekreftelse = <
    TData = Awaited<ReturnType<typeof hentStudielanBekreftelse>>,
    TError = unknown
>(
    behandlingsId: string,
    options?: {
        query?: UseQueryOptions<Awaited<ReturnType<typeof hentStudielanBekreftelse>>, TError, TData>;
        request?: SecondParameter<typeof axiosInstance>;
    }
): UseQueryResult<TData, TError> & {queryKey: QueryKey} => {
    const {query: queryOptions, request: requestOptions} = options ?? {};

    const queryKey = queryOptions?.queryKey ?? getHentStudielanBekreftelseQueryKey(behandlingsId);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof hentStudielanBekreftelse>>> = ({signal}) =>
        hentStudielanBekreftelse(behandlingsId, requestOptions, signal);

    const query = useQuery<Awaited<ReturnType<typeof hentStudielanBekreftelse>>, TError, TData>(queryKey, queryFn, {
        enabled: !!behandlingsId,
        ...queryOptions,
    }) as UseQueryResult<TData, TError> & {queryKey: QueryKey};

    query.queryKey = queryKey;

    return query;
};

export const updateStudielan = (
    behandlingsId: string,
    studielanFrontend: StudielanFrontend,
    options?: SecondParameter<typeof axiosInstance>
) => {
    return axiosInstance<void>(
        {
            url: `/soknader/${behandlingsId}/inntekt/studielan`,
            method: "put",
            headers: {"Content-Type": "application/json"},
            data: studielanFrontend,
        },
        options
    );
};

export type UpdateStudielanMutationResult = NonNullable<Awaited<ReturnType<typeof updateStudielan>>>;
export type UpdateStudielanMutationBody = StudielanFrontend;
export type UpdateStudielanMutationError = unknown;

export const useUpdateStudielan = <TError = unknown, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
        Awaited<ReturnType<typeof updateStudielan>>,
        TError,
        {behandlingsId: string; data: StudielanFrontend},
        TContext
    >;
    request?: SecondParameter<typeof axiosInstance>;
}) => {
    const {mutation: mutationOptions, request: requestOptions} = options ?? {};

    const mutationFn: MutationFunction<
        Awaited<ReturnType<typeof updateStudielan>>,
        {behandlingsId: string; data: StudielanFrontend}
    > = (props) => {
        const {behandlingsId, data} = props ?? {};

        return updateStudielan(behandlingsId, data, requestOptions);
    };

    return useMutation<
        Awaited<ReturnType<typeof updateStudielan>>,
        TError,
        {behandlingsId: string; data: StudielanFrontend},
        TContext
    >(mutationFn, mutationOptions);
};