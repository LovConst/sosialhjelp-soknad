import * as React from "react";
import { Container, Row, Column } from "nav-frontend-grid";
import InputFaktum from "../../../nav-soknad/faktum/InputFaktum";
import SkjemagruppeFaktum from "../../../nav-soknad/faktum/SkjemagruppeFaktum";
import Progresjonsblokk from "../../../nav-soknad/components/progresjonsblokk";
import { faktumIsSelected, getFaktumVerdi } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/reducer";

const StromSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum tittelId="ekstrainfo.utgifter.strom.tittel" key="strom">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.strom" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const HusleieSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum
		tittelId="ekstrainfo.utgifter.husleie.tittel"
		key="husleie">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.husleie" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const BarneSkjema: React.StatelessComponent<{}> = () => (
	<SkjemagruppeFaktum tittelId="ekstrainfo.utgifter.barn.tittel" key="barn">
		<Container fluid={true} className="container--noPadding">
			<Row>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.barn.hva" />
				</Column>
				<Column sm="6" xs="3">
					<InputFaktum faktumKey="ekstrainfo.utgifter.barn.sum" />
				</Column>
			</Row>
		</Container>
	</SkjemagruppeFaktum>
);

const UtgifterOgGjeld: React.StatelessComponent<
	FaktumComponentProps
> = props => {
	const { fakta } = props;
	const visHusleie = faktumIsSelected(getFaktumVerdi(fakta, "dinsituasjon.jobb"));
	const visStrom = faktumIsSelected(getFaktumVerdi(fakta, "dinsituasjon.jobb"));
	const visBarn = faktumIsSelected(getFaktumVerdi(fakta, "dinsituasjon.studerer"));

	if (!visHusleie && !visStrom && !visBarn) {
		return null;
	}
	const content = [
		...(visHusleie ? [<HusleieSkjema key="husleie" />] : []),
		...(visStrom ? [<StromSkjema key="strom" />] : []),
		...(visBarn ? [<BarneSkjema key="barn" />] : [])
	];

	return <Progresjonsblokk tittel="Utgifter og gjeld" content={content} />;
};

export default UtgifterOgGjeld;
