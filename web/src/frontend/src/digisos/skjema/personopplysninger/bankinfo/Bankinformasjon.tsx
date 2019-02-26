import * as React from "react";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import { Checkbox } from "nav-frontend-skjema";
import { ValideringActionKey } from "../../../../nav-soknad/validering/types";
import { erKontonummer } from "../../../../nav-soknad/validering/valideringer";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { SoknadsSti } from "../../../../nav-soknad/redux/soknadsdata/soknadsdataReducer";
import Detaljeliste, { DetaljelisteElement } from "../../../../nav-soknad/components/detaljeliste";
import SysteminfoMedSkjema from "../../../../nav-soknad/components/systeminfoMedSkjema";
import { initialKontonummerState, Kontonummer } from "./KontonummerType";
import {
	connectSoknadsdataContainer, onEndretValideringsfeil,
	SoknadsdataContainerProps
} from "../../../../nav-soknad/redux/soknadsdata/soknadsdataContainerUtils";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";

type Props = SoknadsdataContainerProps & InjectedIntlProps;

const FAKTUM_KEY_KONTONUMMER = "kontakt.kontonummer";

class Bankinformasjon extends React.Component<Props, {}> {

	componentDidMount(): void {
		this.props.setValideringsfeil(null, FAKTUM_KEY_KONTONUMMER);
		this.props.hentSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON)
	}

	onBlur() {
		const { soknadsdata } = this.props;
		let kontonummer = {...soknadsdata.personalia.kontonummer};
		let feilkode: ValideringActionKey = null;
		if (kontonummer.verdi !== null && kontonummer.verdi !== "") {
			feilkode = this.validerKontonummer(kontonummer.verdi);
			if (!feilkode) {
				kontonummer = this.vaskKontonummerStrenger(kontonummer);
				this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
			}
		} else {
			onEndretValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER, this.props.feil, () => {
				this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
			});
		}
	}

	validerKontonummer(verdi: string): ValideringActionKey {
		verdi = verdi.replace(/[ \.]/g,"");
		const feilkode: ValideringActionKey = erKontonummer(verdi);
		onEndretValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER, this.props.feil, () => {
			this.props.setValideringsfeil(feilkode, FAKTUM_KEY_KONTONUMMER);
		});
		return feilkode;
	}

	endreKontoBrukerdefinert(brukerdefinert: boolean) {
		const { soknadsdata } = this.props;
		let kontonummer: Kontonummer = {...soknadsdata.personalia.kontonummer};
		kontonummer.brukerdefinert = brukerdefinert;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
		const feilkode: ValideringActionKey = this.validerKontonummer(kontonummer.verdi);
		if (!feilkode) {
			kontonummer = this.vaskKontonummerStrenger(kontonummer);
			if(kontonummer.brukerdefinert === false) {
				kontonummer.verdi = null;
			}
			this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
		}
	}

	onChangeInput(verdi: string) {
		const { soknadsdata } = this.props;
		let kontonummer: Kontonummer = initialKontonummerState;
		if (soknadsdata && soknadsdata.personalia && soknadsdata.personalia.kontonummer) {
			kontonummer = soknadsdata.personalia.kontonummer;
		}
		kontonummer.verdi = verdi;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
	}

	onChangeCheckboks(event: any): void {
		const { soknadsdata } = this.props;
		let kontonummer: Kontonummer = {...soknadsdata.personalia.kontonummer};
		const harIkkeKonto = kontonummer.harIkkeKonto ? true : false;
		kontonummer.harIkkeKonto = !harIkkeKonto;
		this.props.oppdaterSoknadsdataSti(SoknadsSti.BANKINFORMASJON, kontonummer);
		kontonummer = this.vaskKontonummerStrenger(kontonummer);
		this.props.lagreSoknadsdata(this.props.brukerBehandlingId, SoknadsSti.BANKINFORMASJON, kontonummer);
		event.preventDefault();
	}

	vaskKontonummerStrenger(kontonummer: Kontonummer) {
		const kontonummerClone = {...kontonummer};
		kontonummerClone.verdi = kontonummerClone.verdi.replace(/[ \.]/g, "");
		kontonummerClone.systemverdi = kontonummerClone.systemverdi.replace(/[ \.]/g, "");
		return kontonummerClone;
	}

	render() {
		const { intl, soknadsdata } = this.props;
		const kontonummer: Kontonummer = soknadsdata.personalia.kontonummer;
		if (!kontonummer) {
			return (<span/>);
		}
		const skjemaErSynlig: boolean = (
			kontonummer.systemverdi === null ||
			kontonummer.brukerdefinert === true
		);

		const infotekst = intl.formatMessage({ id: "kontakt.kontonummer.infotekst.tekst" });
		let endreLabel = intl.formatMessage({id: "kontakt.system.kontonummer.endreknapp.label"});
		let avbrytLabel: string = intl.formatMessage({id: "systeminfo.avbrytendringknapp.label"});
		if(kontonummer.systemverdi === null && skjemaErSynlig) {
			endreLabel = null;
			avbrytLabel = null;
		}

		const harIkkeKonto: boolean = (kontonummer && kontonummer.harIkkeKonto) ? true : false;
		let kontonummerVerdi: string = "";
		if (kontonummer && kontonummer.verdi && harIkkeKonto === false) {
			kontonummerVerdi = kontonummer.verdi;
		}
		return (
			<Sporsmal tekster={{ sporsmal: "Kontonummer", infotekst: { tittel: null, tekst: infotekst } }}>
				<SysteminfoMedSkjema
					skjemaErSynlig={skjemaErSynlig}
					onVisSkjema={() => this.endreKontoBrukerdefinert(true)}
					onSkjulSkjema={() => this.endreKontoBrukerdefinert(false)}
					endreLabel={endreLabel}
					avbrytLabel={avbrytLabel}
					skjema={(
						<div>
							<InputEnhanced
								faktumKey="kontakt.kontonummer"
								id="bankinfo_konto"
								className={"input--xxl faktumInput "}
								disabled={harIkkeKonto}
								verdi={kontonummerVerdi}
								required={false}
								onChange={(input: string) => this.onChangeInput(input)}
								onBlur={() => this.onBlur()}
								maxLength={13}
								bredde={"S"}
							/>
							<div
								className={"inputPanel " + (harIkkeKonto ? " inputPanel__checked" : " ")}
								onClick={(event: any) => this.onChangeCheckboks(event)}
							>
								<Checkbox
									id="kontakt_kontonummer_har_ikke_checkbox"
									name="kontakt_kontonummer_har_ikke_checkbox"
									checked={harIkkeKonto}
									onChange={(event: any) => this.onChangeCheckboks(event)}
									label={
										<div>
											{intl.formatHTMLMessage({ id: "kontakt.kontonummer.harikke" })}
										</div>
									}
								/>
							</div>
						</div>
					)}
				>
					<Detaljeliste>
						<DetaljelisteElement
							tittel={
								intl.formatHTMLMessage({ id: "kontakt.system.kontonummer.label" })
							}
							verdi={kontonummer.systemverdi}
						/>
					</Detaljeliste>
				</SysteminfoMedSkjema>
			</Sporsmal>
		);
	}

}

export {Bankinformasjon as BankinformasjonView};

export default connectSoknadsdataContainer(injectIntl(Bankinformasjon));
