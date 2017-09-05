import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import Steg from "../../../nav-soknad/components/steg";
import { connect } from "react-redux";
import {
	FaktumStoreState,
	FaktumComponentProps
} from "../../../nav-soknad/redux/reducer";
import {
	radioCheckKeys,
	inputKeys,
	faktumIsSelected
} from "../../../nav-soknad/utils";

import CheckboxFaktum from "../../../nav-soknad/faktum/CheckboxFaktum";
import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";

class Bosituasjon extends React.Component<FaktumComponentProps, any> {
	render() {
		const { fakta } = this.props;
		const bosituasjon = radioCheckKeys("bosituasjon");
		const annen = radioCheckKeys("bosituasjon.annet.true.botype");
		const barnUnder18 = radioCheckKeys("bosituasjon.barnunder18");
		const barnUnder18True = inputKeys("bosituasjon.barnunder18.true");
		const over18 = radioCheckKeys("bosituasjon.personerover18");
		const over18True = inputKeys("bosituasjon.personerover18.true");
		return (
			<Steg tittelId="bosituasjonbolk.tittel">
				<Sporsmal sporsmalId={bosituasjon.sporsmal}>
					<RadioFaktum faktumKey={bosituasjon.faktum} option="eier" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierprivat" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="leierkommunalt" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="ingen" />
					<RadioFaktum faktumKey={bosituasjon.faktum} option="annet" />
					<Underskjema visible={fakta.get(bosituasjon.faktum) === "annet"}>
						<SkjemagruppeFaktum tittelId={annen.sporsmal}>
							{/*TODO opprette checkboxgruppefaktumet*/}
							<CheckboxFaktum faktumKey={annen.faktum} option="institusjon" />
							<CheckboxFaktum faktumKey={annen.faktum} option="krisesenter" />
							<CheckboxFaktum faktumKey={annen.faktum} option="fengsel" />
							<CheckboxFaktum faktumKey={annen.faktum} option="venner" />
							<CheckboxFaktum faktumKey={annen.faktum} option="foreldre" />
							<CheckboxFaktum faktumKey={annen.faktum} option="familie" />
						</SkjemagruppeFaktum>
					</Underskjema>
				</Sporsmal>
				<Sporsmal
					sporsmalId={barnUnder18.sporsmal}
					hjelpetekstId={barnUnder18.hjelpetekst}
				>
					<RadioFaktum faktumKey={barnUnder18.faktum} option="true" />
					<Underskjema
						visible={faktumIsSelected(fakta.get(barnUnder18.faktum))}
					>
						<InputFaktum
							faktumKey={barnUnder18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={barnUnder18.faktum} option="false" />
				</Sporsmal>
				<Sporsmal
					sporsmalId={over18.sporsmal}
					hjelpetekstId={over18.hjelpetekst}
				>
					<RadioFaktum faktumKey={over18.faktum} option="true" />
					<Underskjema visible={faktumIsSelected(fakta.get(over18.faktum))}>
						<InputFaktum
							faktumKey={over18True.faktum}
							maxLength={3}
							bredde="xs"
						/>
					</Underskjema>
					<RadioFaktum faktumKey={over18.faktum} option="false" />
				</Sporsmal>{" "}
			</Steg>
		);
	}
}

export default connect((state: FaktumStoreState, props: any) => {
	return {
		fakta: state.faktumStore.fakta
	};
})(Bosituasjon);
