import "./index.css";
import "@navikt/ds-css";
import React, {Suspense, useEffect} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import Modal from "react-modal";
import {logWindowError} from "./nav-soknad/utils/loggerUtils";
import {
    injectDecoratorClientSide,
    Locale,
    onLanguageSelect,
    setAvailableLanguages,
    setParams,
} from "@navikt/nav-dekoratoren-moduler";
import {RouterProvider} from "react-router-dom";
import {router} from "./digisos";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import "./i18n";
import {Loader} from "@navikt/ds-react";
import {configureStore} from "./configureStore";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {basePath} from "./configuration";
import i18n from "./i18n";

Modal.setAppElement("#root");

const store = configureStore();

window.onerror = logWindowError;
const queryClient = new QueryClient();

const App = () => {
    useEffect(() => {
        setAvailableLanguages([
            {locale: "nb", url: basePath, handleInApp: true},
            {locale: "en", url: basePath, handleInApp: true},
        ]);

        const handleLanguageSelect = (language: {locale: Locale}) => {
            i18n.changeLanguage(language.locale);
            setParams({language: language.locale});
            localStorage.setItem("language", language.locale);
        };

        onLanguageSelect(handleLanguageSelect);
        setParams({language: i18n.language as Locale});
    }, []);

    return (
        <Provider store={store}>
            <Suspense fallback={<Loader />}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Suspense>
        </Provider>
    );
};

// Dersom appen bygges og deployes med docker-image vil dekoratøren bli lagt på serverside med express i Docker (eks ved deploy til miljø)
if (process.env.NODE_ENV !== "production") {
    injectDecoratorClientSide({
        env: "dev",
        simple: true,
        feedback: false,
        chatbot: false,
        shareScreen: false,
    });
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
