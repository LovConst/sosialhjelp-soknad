import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe, Feil } from "nav-frontend-skjema";
import HjelpetekstFaktum from "./HjelpetekstFaktum";
import { getIntlTextOrKey } from "../utils";

interface Props {
	tittelId: string;
	hjelpetekstId?: string;
	feil?: Feil;
	visible?: boolean;
	children: React.ReactNode;
}

const SkjemagruppeFaktum: React.StatelessComponent<Props> = (
	props: Props & InjectedIntlProps
) => {
	const { visible, tittelId, hjelpetekstId, intl, feil, children } = props;
	if (visible === false) {
		return null;
	}
	const tittel = getIntlTextOrKey(intl, tittelId);
	return (
		<SkjemaGruppe feil={feil}>
			<fieldset className="skjema-fieldset">
				<legend>{tittel}</legend>
				{hjelpetekstId ? (
					<div className="skjema-sporsmal__hjelpetekst">
						<HjelpetekstFaktum hjelpetekstId={hjelpetekstId} />
					</div>
				) : null}
				{children}
			</fieldset>
		</SkjemaGruppe>
	);
};

export default injectIntl(SkjemagruppeFaktum);
