/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getGetOppsummeringMock = () => ({
    steg: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
        stegNr: faker.datatype.number({min: undefined, max: undefined}),
        tittel: faker.random.word(),
        avsnitt: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            tittel: faker.random.word(),
            sporsmal: Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
                tittel: faker.helpers.arrayElement([faker.random.word(), undefined]),
                felt: faker.helpers.arrayElement([
                    Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
                        label: faker.helpers.arrayElement([faker.random.word(), undefined]),
                        svar: faker.helpers.arrayElement([
                            {
                                value: faker.helpers.arrayElement([faker.random.word(), undefined]),
                                type: faker.helpers.arrayElement(["LOCALE_TEKST", "TEKST", "DATO", "TIDSPUNKT"]),
                            },
                            undefined,
                        ]),
                        labelSvarMap: faker.helpers.arrayElement([
                            {
                                clcxqoceo0001cis9htl53ku1: {
                                    value: faker.helpers.arrayElement([faker.random.word(), undefined]),
                                    type: faker.helpers.arrayElement(["LOCALE_TEKST", "TEKST", "DATO", "TIDSPUNKT"]),
                                },
                            },
                            undefined,
                        ]),
                        type: faker.helpers.arrayElement([
                            "TEKST",
                            "CHECKBOX",
                            "SYSTEMDATA",
                            "SYSTEMDATA_MAP",
                            "VEDLEGG",
                        ]),
                        vedlegg: faker.helpers.arrayElement([
                            Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
                                filnavn: faker.random.word(),
                                uuid: faker.helpers.arrayElement([faker.random.word(), undefined]),
                            })),
                            undefined,
                        ]),
                    })),
                    undefined,
                ]),
                erUtfylt: faker.datatype.boolean(),
            })),
        })),
    })),
});

export const getOppsummeringRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/oppsummering", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetOppsummeringMock()));
    }),
];