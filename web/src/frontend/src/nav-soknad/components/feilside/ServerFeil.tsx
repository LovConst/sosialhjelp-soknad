import * as React from "react";
import Feilside from "./Feilside";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Undertittel } from "nav-frontend-typografi";
import { getIntlTextOrKey } from "../../utils/intlUtils";
import { connect } from "react-redux";
import { navigerTilFinnDittNavKontor } from "../../redux/navigasjon/navigasjonActions";
import { NavigasjonActions } from "../../redux/navigasjon/navigasjonTypes";

interface OwnProps {
	onClick: () => NavigasjonActions;
}

const ServerFeil: React.StatelessComponent<InjectedIntlProps & OwnProps> = ({ intl, onClick}) => {
	return (
		<Feilside
			visKnapp={true}
			onClick={ onClick }
			knappTekst={ intl.formatMessage({id: "feilside.serverfeil.knapp"})}
		>
			<div>
				{ intl.formatMessage({ id: "feilside.serverfeil.feilmelding" })}
				<Undertittel key="feilside.serverfeil.nodsituasjon.tittel">
					{getIntlTextOrKey(intl, "feilside.serverfeil.nodsituasjon.tittel")}
				</Undertittel>
				<p className="blokk-s">
					<FormattedMessage id="feilside.serverfeil.nodsituasjon.tekst"/>
				</p>
			</div>
		</Feilside>
	);
};

export default connect(() => ({}), dispatch => {
	return {
		onClick: () => dispatch(navigerTilFinnDittNavKontor())
	};
})(injectIntl(ServerFeil));
