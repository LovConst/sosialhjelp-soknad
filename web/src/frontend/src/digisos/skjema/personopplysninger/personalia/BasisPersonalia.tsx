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
		let statsborgerskap = basisPersonalia && basisPersonalia.statsborgerskap;
		let statsborgerskapVisning = <span className="tekst-capitalize">{statsborgerskap}</span>;
		if (statsborgerskap === "XXX" || statsborgerskap === "xxx"){
			statsborgerskap = "Statsløs";
			statsborgerskapVisning = <span>{statsborgerskap}</span>;
		} else if (statsborgerskap === "???" || statsborgerskap === null){
			statsborgerskap = "Vi har ikke opplysninger om ditt statsborgerskap";
			statsborgerskapVisning = <span>{statsborgerskap}</span>;
		}

		return (
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
								verdi={statsborgerskapVisning}
							/>
						)}
					</Detaljeliste>
				)}
			</SporsmalFaktum>
		);
	}
}

export default connectSoknadsdataContainer(injectIntl(BasisPersonaliaView));
