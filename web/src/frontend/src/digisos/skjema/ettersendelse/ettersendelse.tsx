import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { State } from "../../redux/reducers";
import * as React from "react";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { SynligeFaktaProps } from "../../redux/synligefakta/synligeFaktaTypes";
import { Faktum } from "../../../nav-soknad/types";
import Icon from "nav-frontend-ikoner-assets";
import SVG from "react-inlinesvg";
import NavFrontendChevron from "nav-frontend-chevron";
import { Collapse } from "react-collapse";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import Knapp from "nav-frontend-knapper";

interface OwnProps {
	fakta: Faktum[];
}

type Props = OwnProps & SynligeFaktaProps & DispatchProps & InjectedIntlProps;

interface OwnState {
	vedleggEkspandert: boolean;
}

const ManglendeVedlegg: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="avsnitt_med_marger">
			<div className="venstemarg"/>
			<div className="avsnitt">
				{children}
			</div>
			<div className="hoyremarg hoyremarg__ikon">
				<DigisosIkon navn="lastOpp" className="ettersendelse__ikon"/>
			</div>
		</div>
	);
};

class Ettersendelse extends React.Component<Props, OwnState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggEkspandert: false
		};
	}

	toggleVedlegg() {
		this.setState({ vedleggEkspandert: !this.state.vedleggEkspandert});
	}

	render() {
		return (
			<div className="ettersendelse maincontent">

				<div className="banner banner__forside">
					<div className="blokk-center">
						<div className="banner__forside-wrapper">
							<div className="banner__tittel-tekst">
								<h1 className="typo-sidetittel">
									<span>Søknad om økonomisk sosialhjelp</span>
								</h1>
							</div>
							<div className="banner__illustrasjon">
								<SVG
									className="banner__illustrasjon__william"
									src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_william.svg"}
								/>
								<SVG
									className="banner__illustrasjon__laptop"
									src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_laptop.svg"}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="blokk-center">
					<p className="ettersendelse ingress">
						Du må gi beskjed hvis den økonomiske situasjonen din endrer seg etter at du har sendt søknaden.
					</p>

					<div className="avsnitt_med_marger">
						<div className="venstemarg">
							<Icon kind="stegindikator__hake" className="ettersendelse__ikon"/>
						</div>
						<div className="avsnitt">
							<h3>Søknaden er sendt til Horten kommune</h3>
							<p>07.02.2018</p>
						</div>

						<div className="hoyremarg hoyremarg__ikon">
							<DigisosIkon navn="printer" className="ettersendelse__ikon"/>
						</div>
					</div>

					<div className="avsnitt_med_marger">
						<div className="venstemarg">
							<DigisosIkon navn="advarselSirkel" className="ettersendelse__ikon"/>
						</div>
						<div className="avsnitt">
							<h3 onClick={() => this.toggleVedlegg()} style={{cursor: "pointer"}}>3 vedlegg mangler</h3>
						</div>
						<div
							className="hoyremarg hoyremarg__ikon"
							onClick={() => this.toggleVedlegg()}
						>
							<NavFrontendChevron
								className="ettersendelse__chevron"
								type={this.state.vedleggEkspandert ? "opp" : "ned"}
							/>
						</div>
					</div>

					<Collapse isOpened={this.state.vedleggEkspandert}>
						<ManglendeVedlegg>
							<h3>Kontooversikt med saldo for brukskonto (siste måned)</h3>
						</ManglendeVedlegg>

						<ManglendeVedlegg>
							<h3>Skattemelding og skatteoppgjør</h3>
						</ManglendeVedlegg>

						<ManglendeVedlegg>
							<h3>Lønnslipp (siste måned)</h3>
						</ManglendeVedlegg>

						<ManglendeVedlegg>
							<h3>Annen dokumentasjon</h3>
							<p>Hvis du har andre vedlegg du ønsker å gi oss, kan de lastes opp her.</p>
						</ManglendeVedlegg>

						<div className="avsnitt_med_marger">
							<div className="venstemarg"/>
							<div className="avsnitt">
								<Knapp
									type="hoved"
									htmlType="submit"
								>
									Send vedlegg
								</Knapp>
							</div>
							<div className="hoyremarg"/>
						</div>
					</Collapse>

					<div className="avsnitt_med_marger">
						<div className="venstemarg">
							<DigisosIkon navn="snakkebobler" className="ettersendelse__ikon"/>
						</div>
						<div className="avsnitt">
							<h3>Du blir innkalt til en samtale</h3>
							<p>
								Hvis du søker om økonomisk sosialhjelp, blir du vanligvis innkalt til en
								samtale med en veileder. Du kan også kontakte NAV-kontoret ditt og avtale et møte.
								Les mer om hvordan et møte foregår.
							</p>
						</div>
						<div className="hoyremarg"/>
					</div>

					<div className="avsnitt_med_marger">
						<div className="venstemarg">
							<SVG
								className="ettersendelse__ikon"
								src={"/soknadsosialhjelp/statisk/bilder/ikon_konvolutt.svg"}
							/>
						</div>
						<div className="avsnitt">
							<h3>Du får beskjed om vedtak</h3>
							<p>
								Saksbehandlingstiden varierer fra kommune til kommune.
								Når vi har behandlet søknaden din, får du et vedtak. Hvis det går mer enn én måned,
								skal du få et foreløpig svar. Hvis vi mangler opplysninger eller du ikke har levert
								all nødvendig dokumentasjon, kan det ta lengre tid før du får svar på søknaden din.
							</p>
						</div>
						<div className="hoyremarg"/>
					</div>

				</div>
			</div>
		);
	}
}

export default connect((state: State) => {
	return {
		fakta: state.fakta.data,
		synligefakta: state.synligefakta
	};
})(injectIntl(Ettersendelse));
