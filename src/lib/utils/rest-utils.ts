import {redirectToLogin} from "../orval/soknad-api-axios";
import {logWarning} from "./loggerUtils";
import {baseURL} from "../config";
import {REST_FEIL} from "../redux/restTypes";

export const determineCredentialsParameter = () =>
    import.meta.env.REACT_APP_DIGISOS_ENV === "localhost" ? "include" : "same-origin";

export function parseGotoValueFromSearchParameters(searchParameters: string): string {
    const afterGoto = searchParameters.split("goto=")[1];
    return afterGoto ? afterGoto.split("&login_id")[0] : afterGoto; // Fjerne login_id dersom strengen bak goto= er definert.
}

export const downloadAttachedFile = (urlPath: string) => window.open(baseURL + urlPath);

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

const getHeaders = () =>
    new Headers({
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    });

export enum HttpStatus {
    UNAUTHORIZED = "unauthorized",
}

export const serverRequest = <T>(
    method: HTTPMethod,
    urlPath: string,
    body: string,
    withAccessToken?: boolean,
    retries = 6
): Promise<T> => {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method,
        credentials: determineCredentialsParameter(),
        body: body ? body : undefined,
    };
    console.log("baseurl", baseURL);
    console.log("urlpath", urlPath);
    console.log("baseURL + urlPath", baseURL + urlPath);

    return new Promise<T>((resolve, reject) => {
        fetch(baseURL + urlPath, OPTIONS)
            .then((response: Response) => response.json())
            .then((data) => {
                //console.log("response", response);
                if (data.ok) {
                    resolve(toJson<T>(data));
                    console.log("all ok");
                }

                const {status, statusText} = data;
                console.log("status", status);
                console.log("statusText", statusText);

                if (status === 400) {
                    console.log("---------------------------------------");
                    console.log("response.status", data.status);
                    console.log("response.statusText", data.statusText);
                    console.log("response.headers", data.headers);
                    console.log("response.redirected", data.redirected);
                    console.log("response.type", data.type);
                    console.log("response.url", data.url);
                    console.log("response.body", data.body);
                    console.log("response.bodyUsed", data.bodyUsed);
                    console.log("---------------------------------------");
                    //console.log("400 error");
                    return;
                }

                if (status === 401) {
                    console.log("401 error");
                    data.json().then((hey: any) => redirectToLogin(hey));
                    return;
                }

                if (status === 409) {
                    console.log("409 error");
                    if (!retries) throw new DigisosLegacyRESTError(status, `Ran out of 409 retries: ${statusText}`);

                    setTimeout(
                        () => {
                            serverRequest(method, urlPath, body, withAccessToken, retries - 1)
                                .then((data: unknown) => resolve(data as T))
                                .catch(reject);
                        },
                        100 * (7 - retries)
                    );

                    return;
                }

                if ([403, 410].includes(status)) {
                    console.log("403 eller 410 error");
                    logWarning(`Redirecter til /informasjon i rest-utils fordi HTTP ${status}`);
                    window.location.href = `/sosialhjelp/soknad/informasjon?reason=legacy${status}`;

                    return;
                }

                throw new DigisosLegacyRESTError(data.status, data.statusText);
            })
            .catch(reject);
    });
};

export const fetchToJson = <T>(urlPath: string, withAccessToken?: boolean) => {
    console.log("fetchToJson urlPath", urlPath);
    return serverRequest<T>("GET", urlPath, "", withAccessToken);
};

export const fetchPut = (urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest("PUT", urlPath, body, withAccessToken);

export const fetchPost = <T>(urlPath: string, body: string, withAccessToken?: boolean) =>
    serverRequest<T>("POST", urlPath, body, withAccessToken);

export function fetchDelete(urlPath: string) {
    const OPTIONS: RequestInit = {
        headers: getHeaders(),
        method: "DELETE",
        credentials: determineCredentialsParameter(),
    };
    return fetch(baseURL + urlPath, OPTIONS).then((response: Response) => {
        if (response.status === 401) response.json().then((data) => redirectToLogin(data));
        if (!response.ok) throw new DigisosLegacyRESTError(response.status, response.statusText);
        return response.text();
    });
}

const generateUploadOptions = (formData: FormData, method: string): RequestInit => ({
    headers: new Headers({
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN-SOKNAD-API"),
        accept: "application/json, text/plain, */*",
    }),
    method: method,
    credentials: determineCredentialsParameter(),
    body: formData,
});

export function fetchUpload<T>(urlPath: string, formData: FormData) {
    return fetch(baseURL + urlPath, generateUploadOptions(formData, "POST")).then((response) => {
        if (response.status === 401) response.json().then((data) => redirectToLogin(data));
        if (!response.ok) throw new DigisosLegacyRESTError(response.status, response.statusText);
        return toJson<T>(response);
    });
}

export function fetchUploadIgnoreErrors(urlPath: string, formData: FormData, method: string) {
    return fetch(baseURL + urlPath, generateUploadOptions(formData, method)).then(toJson);
}

export function toJson<T>(response: Response): Promise<T> {
    console.log("is response ok?");
    //console.log("response", response)
    if (response.status === 204) return response.text() as Promise<any>;

    return response.json();
}

// REST error encountered using the old (rest-utils.ts) network code
export class DigisosLegacyRESTError extends Error {
    public readonly status: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;
    }
}

export function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        const partsPopped: string | undefined = parts.pop();
        if (partsPopped) {
            const partsPoppedSplitAndShift = partsPopped.split(";").shift();
            return partsPoppedSplitAndShift ? partsPoppedSplitAndShift : "null";
        } else {
            return "null";
        }
    } else {
        return "null";
    }
}

export function detekterInternFeilKode(feilKode: string): string {
    let internFeilKode = feilKode;
    if (feilKode.match(/Request Entity Too Large/i)) {
        if (feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR) {
            internFeilKode = REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR;
        } else if (feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE) {
            internFeilKode = REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE;
        } else {
            internFeilKode = REST_FEIL.FOR_STOR_FIL;
        }
    }

    if (feilKode.match(/Unsupp?orted Media Type/i)) internFeilKode = REST_FEIL.FEIL_FILTYPE;

    return internFeilKode;
}
