const students = require("../data/students");

const Ajv = require("ajv");
const { request } = require("express");
const schema = {
  type: "object",
  properties: {
    _id: { type: "string" },
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
    id: {
      type: "number",
    },
  },
  required: ["fn", "ln", "dept"],
  maxProperties: 4,
  minProperties: 4,
};

const ajv = new Ajv();
let validator = ajv.compile(schema);

exports.getAllStudents = (req, res) => {
  if (students.length > 0) res.json({ result: students });
  else res.status(404).json({ error: "Not data!" });
};

exports.getStudentById = (req, res) => {
  console.log(req.params.id);
  const result = students.find(
    (student) => student.id === parseInt(req.params.id)
  );
  if (result) res.json({ result });
  else res.status(404).json({ error: "Not fount!" });
};

exports.createStudent = (req, res) => {
  console.log(req.body);
  let valid = validator(req.body);
  console.log(valid);
  if (valid) {
    req.body.id = students.length + 1;
    students.push(req.body);
    res.json({ result: req.body });
  } else {
    res.json({ error: "Forbidden Request!" });
  }
};
