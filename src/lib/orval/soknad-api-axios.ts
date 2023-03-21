import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, isCancel} from "axios";
import {getApiBaseUrl, getRedirectPath} from "../../nav-soknad/utils/rest-utils";
import {isLocalhost, isMockAlt} from "../../nav-soknad/utils";
import {UnauthorizedMelding} from "../../generated/model";
import {logError} from "../../nav-soknad/utils/loggerUtils";

const navigateToLoginOn401 = async (data: UnauthorizedMelding | undefined) => {
    if (!data) {
        await logError(`401-feil uten data`);
        throw new Error(`401-feil uten data`);
    }

    const {id, loginUrl} = data;

    if (new URLSearchParams(window.location.search).get("login_id") === id) {
        await logError("login_id == id fra 401, kan indikere en redirect loop?");
        return;
    }

    const loginURLObj = new URL(loginUrl);
    loginURLObj.searchParams.set("login_id", id);
    loginURLObj.searchParams.set("redirect", getRedirectPath());
    window.location.href = loginURLObj.toString();
};

export const AXIOS_INSTANCE = Axios.create({
    baseURL: getApiBaseUrl(true),
    xsrfCookieName: "XSRF-TOKEN-SOKNAD-API",
    withCredentials: isLocalhost(window.location.origin) || isMockAlt(window.location.origin),
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json, text/plain, */*",
    },
});

interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}

export const axiosInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = Axios.CancelToken.source();
    const promise: CancellablePromise<AxiosResponse> = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    })
        .then(({data}) => data)
        .catch(async (e) => {
            if (e instanceof AxiosError<T>)
                if (e.response) {
                    const {status, data} = e.response;
                    if (status === 401) await navigateToLoginOn401(data as UnauthorizedMelding);
                    else if (status === 410) window.location.href = "/sosialhjelp/soknad/informasjon";
                    else {
                        await logError(`Nettverksfeil i axiosInstance: ${status} ${data}`);
                        throw e;
                    }
                    return new Promise<T>(() => {});
                } else {
                    if (isCancel(e)) return new Promise<T>(() => {});

                    await logError(`Nettverksfeil i axiosInstance: ${e}`);
                    throw e;
                    // window.location.href = "/sosialhjelp/soknad/feil";
                }
        });

    promise.cancel = () => {
        source.cancel("Query was cancelled");
    };

    return promise as Promise<T>;
};

export type ErrorType<Error> = AxiosError<Error>;
