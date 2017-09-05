import * as React from "react";
import Sporsmal from "../../../nav-soknad/components/sporsmal";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { getFaktumVerdi, radioCheckKeys } from "../../../nav-soknad/utils";

import RadioFaktum from "../../../nav-soknad/faktum/RadioFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Underskjema from "../../../nav-soknad/components/underskjema";
import Ektefelle from "./Ektefelle";

class Sivilstatus extends React.Component<FaktumComponentProps, {}> {
	render() {
		const { fakta } = this.props;
		const sivilstatus = radioCheckKeys("familie.sivilstatus");
		return (
			<Sporsmal sporsmalId={sivilstatus.sporsmal}>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="gift" />
				<Underskjema visible={getFaktumVerdi(fakta, sivilstatus.faktum) === "gift"}>
					<SkjemagruppeFaktum tittelId="familie.sivilstatus.gift.tittel">
						<Ektefelle fakta={fakta} />
					</SkjemagruppeFaktum>
				</Underskjema>
				<RadioFaktum faktumKey={sivilstatus.faktum} option="ugift" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="samboer" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="enke" />
				<RadioFaktum faktumKey={sivilstatus.faktum} option="skilt" />
			</Sporsmal>
		);
	}
}

export default Sivilstatus;
