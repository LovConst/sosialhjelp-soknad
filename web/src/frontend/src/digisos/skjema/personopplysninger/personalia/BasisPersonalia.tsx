import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import * as React from "react";
import SporsmalFaktum from "../../../../nav-soknad/faktum/SporsmalFaktum";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
type Props = SoknadsdataContainerProps & InjectedIntlProps;

class BasisPersonaliaView extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BASIS_PERSONALIA);
	}

	render() {
		const {soknadsdata} = this.props;
		const basisPersonalia = soknadsdata.personalia.basisPersonalia;
		const statsborgerskap = basisPersonalia && basisPersonalia.statsborgerskap;

		return (
			<div style={{border: "3px dotted red"}}>
				<SporsmalFaktum
					faktumKey="kontakt.system.personalia"
					style="system"
				>
					{basisPersonalia && (
						<Detaljeliste>
							<DetaljelisteElement
								tittel={<FormattedMessage id="kontakt.system.personalia.navn" />}
								verdi={basisPersonalia.navn.fulltNavn}
							/>
							<DetaljelisteElement
								skjulDersomTomVerdi={true}
								tittel={<FormattedMessage id="kontakt.system.personalia.fnr" />}
								verdi={basisPersonalia.fodselsnummer}
							/>
							{statsborgerskap && (
								<DetaljelisteElement
									tittel={
										<FormattedMessage id="kontakt.system.personalia.statsborgerskap" />
									}
									verdi={<span className="tekst-capitalize">{statsborgerskap}</span>}
								/>
							)}
						</Detaljeliste>
					)}
				</SporsmalFaktum>
			</div>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BasisPersonaliaView));
