/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentSystemregistrerteInntekterMock = () => ({
    systeminntekter: faker.helpers.arrayElement([
        Array.from({length: faker.datatype.number({min: 1, max: 10})}, (_, i) => i + 1).map(() => ({
            inntektType: faker.helpers.arrayElement([faker.random.word(), undefined]),
            utbetalingsdato: faker.helpers.arrayElement([faker.random.word(), undefined]),
            belop: faker.helpers.arrayElement([faker.datatype.number({min: undefined, max: undefined}), undefined]),
        })),
        undefined,
    ]),
    utbetalingerFraNavFeilet: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
});

export const getSystemregistrertInntektRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/inntekt/systemdata", (_req, res, ctx) => {
        return res(
            ctx.delay(1000),
            ctx.status(200, "Mocked status"),
            ctx.json(getHentSystemregistrerteInntekterMock())
        );
    }),
];