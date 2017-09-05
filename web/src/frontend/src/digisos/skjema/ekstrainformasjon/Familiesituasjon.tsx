import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";

const Familiesituasjon: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	if (!faktumIsSelected(getFaktumVerdi(fakta, "familie.barn"))) {
		return null;
	}

	return (
		<Progresjonsblokk
			tittel="Familiesituasjonen"
			content={[
				<SkjemagruppeFaktum
					tittelId="ekstrainfo.familie.barnebidrag.tittel"
					key="barnebidrag">
					<Container fluid={true} className="container--noPadding">
						<Row>
							<Column sm="6" xs="3">
								<InputFaktum faktumKey="ekstrainfo.familie.barnebidrag.betaler" />
							</Column>
							<Column sm="6" xs="3">
								<InputFaktum faktumKey="ekstrainfo.familie.barnebidrag.mottar" />
							</Column>
						</Row>
					</Container>
				</SkjemagruppeFaktum>
			]}
		/>
	);
};

export default Familiesituasjon;
