/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type {VedleggMetadataListeDto} from "./vedleggMetadataListeDto";
import type {SoknadMetadataDtoType} from "./soknadMetadataDtoType";
import type {SoknadMetadataDtoStatus} from "./soknadMetadataDtoStatus";

export interface SoknadMetadataDto {
    id: number;
    behandlingsId: string;
    tilknyttetBehandlingsId?: string;
    fnr: string;
    skjema?: string;
    orgnr?: string;
    navEnhet?: string;
    fiksForsendelseId?: string;
    vedlegg?: VedleggMetadataListeDto;
    type?: SoknadMetadataDtoType;
    status?: SoknadMetadataDtoStatus;
    opprettetDato: Date;
    sistEndretDato: Date;
    innsendtDato?: Date;
    lest: boolean;
}