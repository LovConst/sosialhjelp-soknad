import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import {isLocalhost} from "./nav-soknad/utils";

import skjemaNn from "./locales/nn/skjema.json";
import skjemaNb from "./locales/nb/skjema.json";
import skjemaEn from "./locales/en/skjema.json";

const storedLanguage = localStorage.getItem("language");

i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        // Added January 2023 by Tore Sinding Bekkedal
        // For compatibility with legacy design components, we make t() return string,
        // and not string | null. Might be irrelevant at some future point.
        // See also src/@types/i18next.d.ts
        returnNull: false,
        lng: storedLanguage || "nb",
        fallbackLng: "nb",
        ns: ["skjema"],
        defaultNS: "skjema",
        debug: isLocalhost(window.location.href),

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            nn: {skjema: skjemaNn},
            nb: {skjema: skjemaNb},
            en: {skjema: skjemaEn},
        },
    });

export default i18n;
