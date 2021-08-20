import Ajv from "ajv";
import { addValidatorKeywords } from "./index";

describe("addValidatorKeywords", () => {

  it("should add validator for isAfter", () => {
    const ajv = new Ajv();
    addValidatorKeywords(ajv);
    const validator = ajv.compile({
      type: "object",
      properties: { startDate: { type: "string", isAfter: "2021-08-20T13:41:21.008Z" } },
    });
    expect(validator({ startDate: (new Date(0)).toISOString() })).toBeFalsy();
    expect(validator.errors).toMatchInlineSnapshot(`
      Array [
        Object {
          "instancePath": "/startDate",
          "keyword": "isAfter",
          "message": "must pass \\"isAfter\\" keyword validation",
          "params": Object {},
          "schemaPath": "#/properties/startDate/isAfter",
        },
      ]
    `);
  });

  it("should add validator for isAlpha", () => {
    const ajv = new Ajv();
    addValidatorKeywords(ajv);
    const validator = ajv.compile({
      type: "object",
      properties: { name: { type: "string", isAlpha: "en-US" } },
    });
    expect(validator({ name: "John Doe 123" })).toBeFalsy();
    expect(validator.errors).toMatchInlineSnapshot(`
      Array [
        Object {
          "instancePath": "/name",
          "keyword": "isAlpha",
          "message": "must pass \\"isAlpha\\" keyword validation",
          "params": Object {},
          "schemaPath": "#/properties/name/isAlpha",
        },
      ]
    `);
  });

  it("should add validator for isAlphanumeric", () => {
    const ajv = new Ajv();
    addValidatorKeywords(ajv);
    const validator = ajv.compile({
      type: "object",
      properties: { name: { type: "string", isAlphanumeric: "en-US" } },
    });
    expect(validator({ name: "John Doe 123" })).toBeFalsy();
    expect(validator.errors).toMatchInlineSnapshot(`
      Array [
        Object {
          "instancePath": "/name",
          "keyword": "isAlphanumeric",
          "message": "must pass \\"isAlphanumeric\\" keyword validation",
          "params": Object {},
          "schemaPath": "#/properties/name/isAlphanumeric",
        },
      ]
    `);
  });

  it("should add validator for isPort", () => {
    const ajv = new Ajv();
    addValidatorKeywords(ajv);
    const validator = ajv.compile({
      "type": "object",
      properties: { port: { type: "integer", isPort: 1 } },
    });
    expect(validator({ port: 1234567 })).toBeFalsy();
    expect(validator.errors).toMatchInlineSnapshot(`
      Array [
        Object {
          "instancePath": "/port",
          "keyword": "isPort",
          "message": "must pass \\"isPort\\" keyword validation",
          "params": Object {},
          "schemaPath": "#/properties/port/isPort",
        },
      ]
    `);
  });
});
