const Student = require("../models/studentModelDB");
const validator = require("../utils/studentValidator");

exports.getAllStudents = async (req, res) => {
  let students = await Student.find()
    .select({ fn: 1, ln: 1, dept: 1, empId: 1 })
    .sort({ empId: -1 });
  if (students.length > 0) res.json({ result: students });
  else res.status(404).json({ result: " No Data Available" });
};

exports.getStudentById = async (req, res) => {
  // let student = await Student.findById(req.params.id);
  let student = await Student.findById(req.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json({ result: student });
};

// exports.getStudentByEmpId = async (req, res) => {
//   let student = await Student.find({ empId: req.params.empId });

//   if (!student) {
//     return res.status(404).json({ message: "Student not found" });
//   }
//   res.json({ result: student });
// };

exports.createStudent = (req, res) => {
  // let valid = validator(req.body);
  // console.log(req.body);
  // if (valid) {
  let { fn, ln, dept, empId } = req.body;
  let student = new Student({ fn, ln, dept, empId });

  student
    .save()
    .then(() => {
      console.log(student);
      res.json({ result: student });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ result: err.message });
    });
  // }
};

exports.updateStudent = async (req, res) => {
  let valid = validator(req.body);
  if (valid) {
    let student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      returnOriginal: false,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ result: student });
  } else {
    res.json({ result: validator.errors });
  }
};

exports.deleteStudent = async (req, res) => {
  let student = await Student.findByIdAndRemove(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json({ result: student });
};
