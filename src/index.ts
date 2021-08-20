import Ajv from "ajv";
import validator from "validator"

export const addValidatorKeywords = (ajv: Ajv) => {
    ajv.addKeyword({
        keyword: "isAfter",
        validate: ((schema, data) => validator.isAfter(data, schema))
    })

    ajv.addKeyword({
        keyword: "isAlpha",
        validate: (schema, data) => validator.isAlpha(data, schema || "en-US")
    })

    ajv.addKeyword({
        keyword: "isAlphanumeric",
        validate: (schema, data) => validator.isAlpha(data, schema || "en-US")
    })

    ajv.addKeyword({
        keyword: "isPort",
        validate: ((schema, data) => validator.isPort(data + ''))
    })
}