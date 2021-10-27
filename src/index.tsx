import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import "./index.less";
import "@navikt/ds-css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import * as Sentry from "@sentry/react";

import reducers from "./digisos/redux/reducers";
import sagas from "./rootSaga";
import IntlProvider from "./intlProvider";
import App from "./digisos";
import {erLocalhost, erProd} from "./nav-soknad/utils/rest-utils";
import {avbrytSoknad} from "./digisos/redux/soknad/soknadActions";
import {NAVIGASJONSPROMT} from "./nav-soknad/utils";
import {visSoknadAlleredeSendtPrompt} from "./digisos/redux/ettersendelse/ettersendelseActions";
import {getContextPathBasename} from "./configuration";
import {SoknadState} from "./digisos/redux/soknad/soknadTypes";
import LoadContainer from "./LoadContainer";
import Modal from "react-modal";
import {initAmplitude} from "./nav-soknad/utils/amplitude";
import {logException, NavLogEntry, NavLogLevel} from "./nav-soknad/utils/loggerUtils";
import {injectDecoratorClientSide} from "@navikt/nav-dekoratoren-moduler";
import {Integrations} from "@sentry/tracing";

Modal.setAppElement("#root");

const history = require("history").createBrowserHistory({
    getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
        if (msg === NAVIGASJONSPROMT.SKJEMA) {
            const soknad: SoknadState = store.getState().soknad;
            if (soknad.behandlingsId && soknad.avbrytSoknadSjekkAktiv) {
                store.dispatch(avbrytSoknad());
                callback(false);
            } else {
                callback(true);
            }
        } else if (msg === NAVIGASJONSPROMT.ETTERSENDELSE) {
            store.dispatch(visSoknadAlleredeSendtPrompt(true));
            callback(false);
        } else {
            callback(true);
        }
    },
    basename: getContextPathBasename(),
});

Sentry.init({
    dsn: "https://e81d69cb0fb645068f8b9329fd3a138a@sentry.gc.nav.no/99",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        }),
    ],
    environment: erProd() ? "prod-sbs" : "development",
    tracesSampleRate: 1.0,
});

function configureStore() {
    const w: any = window as any;

    const composeEnhancers = erLocalhost() ? w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

    const saga = createSagaMiddleware();

    const middleware = applyMiddleware(saga, routerMiddleware(history));
    const createdStore = createStore(reducers(history), composeEnhancers(middleware));
    saga.run(sagas);
    return createdStore;
}

const store = configureStore();

window.onerror = (errorMessage, url, line, column, error) => {
    const stacktrace = error?.hasOwnProperty("stack") ? "\nStacktrace" + error.stack : "";
    const logEntry: NavLogEntry = {
        level: NavLogLevel.ERROR,
        userAgent: window.navigator.userAgent,
        url: document.location.href,
        message: errorMessage.toString(),
        jsFileUrl: url,
        lineNumber: line,
        error: stacktrace,
    };
    if (column) {
        logEntry.columnNumber = column;
    }
    logException(logEntry);
};

initAmplitude();

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

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider>
            <LoadContainer>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </LoadContainer>
        </IntlProvider>
    </Provider>,
    document.getElementById("root") as HTMLElement
);
