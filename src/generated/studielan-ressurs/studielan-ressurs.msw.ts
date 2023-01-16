/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentStudielanBekreftelseMock = () => ({
    skalVises: faker.datatype.boolean(),
    bekreftelse: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
});

export const getStudielanRessursMSW = () => [
    rest.get("*/soknader/:behandlingsId/inntekt/studielan", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentStudielanBekreftelseMock()));
    }),
    rest.put("*/soknader/:behandlingsId/inntekt/studielan", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
    }),
];