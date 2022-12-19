import {Redirect, Route, Switch} from "react-router";
import SideIkkeFunnet from "../nav-soknad/feilsider/SideIkkeFunnet";
import Informasjon from "./hovedmeny";
import SkjemaRouter from "./skjema";
import Ettersendelse from "./skjema/ettersendelse";
import Link from "./link";
import {erDev, erMockAlt} from "../nav-soknad/utils";
import * as Sentry from "@sentry/react";

const SentryRoute = Sentry.withSentryRouting(Route);

const App = () => (
    <Switch>
        <SentryRoute exact path="/">
            <Redirect to="/informasjon" />
        </SentryRoute>
        <SentryRoute path={`/skjema/:brukerBehandlingId/ettersendelse`} component={Ettersendelse} />
        <SentryRoute path={`/informasjon`} exact={true} component={Informasjon} />
        <SentryRoute path={`/link`} exact={true} component={Link} />
        {!(erMockAlt() || erDev()) && (
            <SentryRoute path={`/mock-login`} exact={true}>
                <Redirect to="/informasjon" />
            </SentryRoute>
        )}
        <SentryRoute path={`/skjema/:brukerBehandlingId/:steg`} component={SkjemaRouter} exact={true} />
        <SentryRoute component={SideIkkeFunnet} />
    </Switch>
);

export default App;
