const SoknadMiljoTypes = ["localhost", "dev-sbs", "mock", "prod-sbs"] as const;

type SoknadMiljo = (typeof SoknadMiljoTypes)[number];

type SoknadConfig = {
    baseURL: string;
    innsynURL: string;
    minSideURL: string;
    logoutURL: string;
};

const isValidDigisosEnvironment = (miljo: unknown): miljo is SoknadMiljo =>
    SoknadMiljoTypes.includes(miljo as SoknadMiljo);

const getConfig = (miljo: unknown): SoknadConfig => {
    if (!isValidDigisosEnvironment(miljo)) throw new Error(`Unknown SoknadMiljo ${miljo}`);

    switch (miljo) {
        case "localhost":
            return {
                baseURL: "http://localhost:8181/sosialhjelp/soknad-api/",
                innsynURL: "http://localhost:3000/sosialhjelp/innsyn/",
                minSideURL: "https://www.nav.no/minside/",
                logoutURL: "http://localhost:3008/",
            };
        case "mock":
            return {
                baseURL: "https://digisos.ekstern.dev.nav.no/sosialhjelp/soknad-api/",
                innsynURL: "https://sosialhjelp-innsyn-mock.dev.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://sosialhjelp-mock-alt-mock.dev.nav.no/sosialhjelp/mock-alt/",
                logoutURL: "https://sosialhjelp-mock-alt-mock.dev.nav.no/sosialhjelp/mock-alt/",
            };
        case "dev-sbs":
            return {
                baseURL: "https://www-q0.dev.nav.no/sosialhjelp/login-api/soknad-api/",
                innsynURL: "https://www-q0.dev.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://www.dev.nav.no/minside/",
                logoutURL: "https://loginservice.dev.nav.no/slo",
            };
        case "prod-sbs":
            return {
                baseURL: "https://www.nav.no/sosialhjelp/login-api/soknad-api/",
                innsynURL: "https://www.nav.no/sosialhjelp/innsyn/",
                minSideURL: "https://www.nav.no/minside/",
                logoutURL: "https://loginservice.nav.no/slo",
            };
    }
};

const config = getConfig(process.env.REACT_APP_DIGISOS_ENV);

export const baseURL = config.baseURL;
export const innsynURL = config.innsynURL;
export const minSideURL = config.minSideURL;
export const logoutURL = config.logoutURL;

export default config;
