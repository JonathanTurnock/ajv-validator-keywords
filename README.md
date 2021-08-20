# ajv-validator-keywords

Demonstration repository on how to add Keywords to AJV which map to validator functions.

```typescript
import Ajv from "ajv";
import validator from "validator"

export const addValidatorKeywords = (ajv: Ajv) => {
    ajv.addKeyword({
        keyword: "isPort",
        validate: ((schema, data) => validator.isPort(data + ''))
    })
}
```

## Usage

Example usage using a YAML schema to validate an application configuration on startup

```yaml
# config-schema.yml

$schema: http://json-schema.org/draft-07/schema
title: Root Application Schema
type: object
properties:
  server:
    type: object
    required: []
    properties:
      port: { type: integer, isPort }
required: [ server ]
```

```typescript
// validate-something.ts

import { addValidatorKeywords } from "ajv-validator-keywords"

const schema = // Import/load using yaml library

const config = { server: { port: 123455678 }}

const ajv = new Ajv();
addValidatorKeywords(ajv);
const validator = ajv.compile(schema);

validator(config); // Will Return False and contain validator.errors
```