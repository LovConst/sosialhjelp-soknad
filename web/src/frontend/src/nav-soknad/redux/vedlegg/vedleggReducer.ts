import { Vedlegg, VedleggActionTypeKeys, VedleggActionTypes, VedleggApiType } from "./vedleggTypes";
import { REST_STATUS } from "../../types/restTypes";
import { Faktum } from "../../types/navSoknadTypes";
import { finnFaktumMedId } from "../../utils/faktumUtils";

const initialState: VedleggApiType = {
	restStatus: REST_STATUS.INITIALISERT,
	opplastingStatus: REST_STATUS.OK,
	sistEndredeFaktumId: 0,
	feil: false,
	data: []
};

export default (state: VedleggApiType = initialState, action: VedleggActionTypes) => {
	switch (action.type) {
		case VedleggActionTypeKeys.LAST_OPP: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING,
				sistEndredeFaktumId: action.belopFaktumId,
				feil: false
			};
		}
		case VedleggActionTypeKeys.LAST_OPP_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK,
				feil: false
			};
		}
		case VedleggActionTypeKeys.LAST_OPP_FEILET: {
			return {
				...state,
				opplastingStatus: REST_STATUS.FEILET,
				feil: true
			};
		}
		case VedleggActionTypeKeys.OPPDATERT_VEDLEGG: {
			const index = state.data.findIndex(v => v.vedleggId === action.vedlegg.vedleggId);
			const data = [
				...state.data.slice(0, index),
				leggFaktumPaVedleggStruktur(action.vedlegg, action.fakta),
				...state.data.slice(index + 1)
			];
			return {
				...state,
				data
			};
		}
		case VedleggActionTypeKeys.NYTT_VEDLEGG: {
			return {
				...state,
				data: [ ...state.data, leggFaktumPaVedleggStruktur(action.vedlegg, action.fakta) ]
			};
		}
		case VedleggActionTypeKeys.START_SLETT_VEDLEGG: {
			return {
				...state,
				opplastingStatus: REST_STATUS.PENDING,
				sistEndredeFaktumId: action.belopFaktumId
			};
		}
		case VedleggActionTypeKeys.SLETT_VEDLEGG: {
			return {
				...state,
				data: state.data.filter(v => v.vedleggId !== action.vedleggId)
			};
		}

		case VedleggActionTypeKeys.SLETT_VEDLEGG_OK: {
			return {
				...state,
				opplastingStatus: REST_STATUS.OK
			};
		}
		case VedleggActionTypeKeys.HENT_VEDLEGGSFORVENTNING_OK: {
			const vedleggsForventninger = action.vedleggsforventninger;
			if (vedleggsForventninger && Array.isArray(vedleggsForventninger)) {
				vedleggsForventninger.forEach(vedlegg => leggFaktumPaVedleggStruktur(vedlegg, action.fakta));
			}
			return {
				...state,
				restStatus: REST_STATUS.OK,
				data: vedleggsForventninger
			};
		}

		case VedleggActionTypeKeys.VEDLEGG_ALLEREDE_SENDT: {
			let data = Object.assign(state.data);
			const VedleggKreves = "VedleggKreves";
			const VedleggAlleredeSendt = "VedleggAlleredeSendt";

			data = data.map((v: Vedlegg) => {
				if (v.vedleggId === action.vedlegg[ 0 ].vedleggId) {
					if (v.innsendingsvalg === VedleggKreves) {
						v.innsendingsvalg = VedleggAlleredeSendt;
					} else if (v.innsendingsvalg === VedleggAlleredeSendt) {
						v.innsendingsvalg = VedleggKreves;
					}
				}
				return v;
			});

			return {
				...state, data
			};
		}

		default:
			return state;
	}
};

function leggFaktumPaVedleggStruktur(vedlegg: Vedlegg, fakta: Faktum[]) {
	const vedleggFaktum = finnFaktumMedId("", fakta, vedlegg.faktumId);
	vedlegg.belopFaktumId = vedleggFaktum.parrentFaktum;
	return vedlegg;
}
