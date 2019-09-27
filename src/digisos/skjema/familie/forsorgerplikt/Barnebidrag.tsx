import Sporsmal, { LegendTittleStyle } from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import * as React from "react";
import {
	connectSoknadsdataContainer,
	SoknadsdataContainerProps
} from "../../../redux/soknadsdata/soknadsdataContainerUtils";
import { InjectedIntlProps, injectIntl } from "react-intl";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import { SoknadsSti } from "../../../redux/soknadsdata/soknadsdataReducer";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

class Barnebidrag extends React.Component<Props, {}> {

	FAKTUM_KEY = "familie.barn.true.barnebidrag";

	handleClickRadio(verdi: string) {
		const {soknadsdata, oppdaterSoknadsdataSti, behandlingsId, lagreSoknadsdata} = this.props;
		if (behandlingsId){
			const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
			forsorgerplikt.barnebidrag = verdi;
			oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt);
			const payload  = {
				"barnebidrag": verdi
			};
			lagreSoknadsdata(behandlingsId, SoknadsSti.FORSORGERPLIKT, payload);
		}
	}

	renderRadio(verdi: string) {
		const {soknadsdata} = this.props;
		const barnebidrag = soknadsdata.familie.forsorgerplikt.barnebidrag;
		return <RadioEnhanced
			getName={() => "familie_barnebidrag_radio_" + verdi}
			id={"familie_barnebidrag_radio_" + verdi}
			faktumKey={this.FAKTUM_KEY}
			value={verdi}
			checked={verdi === barnebidrag}
			onChange={() => this.handleClickRadio(verdi)}
		/>;
	}

	render() {

		return (
			<div className="blokk barnebidrag">
				<Sporsmal
					sprakNokkel="familie.barn.true.barnebidrag"
					legendTittelStyle={LegendTittleStyle.FET_NORMAL}
				>
					{this.renderRadio("betaler")}
					{this.renderRadio("mottar")}
					{this.renderRadio("begge")}
					{this.renderRadio("ingen")}
				</Sporsmal>
			</div>
		)
	}
}

export default connectSoknadsdataContainer(injectIntl(Barnebidrag));