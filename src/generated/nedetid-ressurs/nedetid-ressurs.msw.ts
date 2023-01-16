/**
 * Generated by orval v6.11.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import {rest} from "msw";
import {faker} from "@faker-js/faker";

export const getHentNedetidInformasjonMock = () => ({
    isNedetid: faker.datatype.boolean(),
    isPlanlagtNedetid: faker.datatype.boolean(),
    nedetidStart: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nedetidSlutt: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nedetidStartText: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nedetidSluttText: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nedetidStartTextEn: faker.helpers.arrayElement([faker.random.word(), undefined]),
    nedetidSluttTextEn: faker.helpers.arrayElement([faker.random.word(), undefined]),
});

export const getNedetidRessursMSW = () => [
    rest.get("*/nedetid", (_req, res, ctx) => {
        return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getHentNedetidInformasjonMock()));
    }),
];