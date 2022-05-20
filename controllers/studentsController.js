const Student = require("../models/studentModel");
const validator = require("../utils/studentValidator");

exports.getAllStudents = (req, res) => {
  // if (students.length > 0) res.json({ result: students });
  const students = Student.fetchStudents();
  console.log(students.length);
  if (students.length > 0) res.render("students.ejs", { students });
  else res.status(404).json({ error: "No Data Available!" });
};

exports.getStudentById = (req, res) => {
  const students = Student.fetchStudents();
  const result = students.find((student) => student.id === req.params.id);
  if (result) res.json({ result });
  else res.status(404).json({ error: "Record Not Found!" });
};

exports.createStudent = (req, res) => {
  let valid = validator(req.body);
  if (valid) {
    // req.body.id = students.length + 1;
    // students.push(req.body);
    let student = new Student(req.body);
    student.saveStudent();
    res.json({ result: req.body });
  } else {
    res.json({ error: "Forbidden Request!" });
  }
};

exports.deleteStudent = (req, res) => {
  let index = students.findIndex((student) => student.id === req.params.id);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ result: "Record has been deleted!" });
  } else {
    res.json({ error: "Record Not Found!" });
  }
};
