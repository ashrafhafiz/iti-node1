const Ajv = require("ajv");

const schema = {
  type: "object",
  properties: {
    fn: {
      type: "string",
      pattern: "^[A-Z][a-z]*$",
    },
    ln: {
      type: "string",
      pattern: "^[A-Z][a-z]*$",
    },
    dept: {
      type: "string",
      enum: ["SA", "SB", "SC"],
      maxLength: 2,
      minLength: 2,
    },
    empId: {
      type: "number",
    },
  },
  required: ["fn", "ln", "dept", "empId"],
  maxProperties: 4,
  minProperties: 4,
};

const ajv = new Ajv();
module.exports = ajv.compile(schema);
