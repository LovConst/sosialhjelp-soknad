import * as React from "react";
import { findDOMNode } from "react-dom";
import * as classNames from "classnames";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SkjemaGruppe } from "nav-frontend-skjema";
import { HjelpetekstAuto } from "nav-frontend-hjelpetekst";
import { getFaktumSporsmalTekst, contains } from "../utils";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

export interface OwnProps {
	faktumKey: string;
	children: React.ReactNode;
	visible?: boolean;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
	}

	handleOnBlur(evt: any) {
		if (this.props.validerFunc) {
			setTimeout(() => {
				if (!contains(findDOMNode(this), document.activeElement)) {
					this.props.validerFaktum(this.props.getFaktumVerdi());
				}
			}, 0);
		}
	}

	render() {
		const { visible, feilkode, validerFunc, intl, children } = this.props;
		if (visible === false) {
			return null;
		}
		const tekster = getFaktumSporsmalTekst(intl, this.props.faktumKey);
		const cls = classNames("skjema-fieldset", {
			"skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined
		});
		return (
			<div className="skjema-sporsmal" onBlur={this.handleOnBlur}>
				<SkjemaGruppe feil={validerFunc ? this.props.getFeil(intl) : null}>
					<fieldset className={cls}>
						<legend>{tekster.sporsmal}</legend>
						{tekster.hjelpetekst ? (
							<div className="skjema-sporsmal__hjelpetekst">
								<HjelpetekstAuto tittel={tekster.hjelpetekst.tittel}>
									{tekster.hjelpetekst.tekst}
								</HjelpetekstAuto>
							</div>
						) : null}
						<div className="skjema-sporsmal__innhold">{children}</div>
					</fieldset>
				</SkjemaGruppe>
			</div>
		);
	}
}

export default injectIntl(faktumComponent()(SporsmalFaktum));
