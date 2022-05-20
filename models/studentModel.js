// const students = require("../data/students");
const { json } = require("express/lib/response");
const fs = require("fs");
const path = require("path");
// const studentsDataFile = path.join(__dirname, "../data", "students.json");
const studentsDataFile = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "students.json"
);
// console.log(studentsDataFile);

module.exports = class Student {
  constructor({ _id, fn, ln, dept }) {
    this._id = _id;
    this.fn = fn;
    this.ln = ln;
    this.dept = dept;
    // this.id = students.length + 1;
  }

  saveStudent() {
    // students.push(this);
    // 1. read file
    fs.readFile(studentsDataFile, (err, data) => {
      let students = [];
      if (!err) {
        students = JSON.parse(data);
        // 2. update students data
        this.id = students.length + 1;
        students.push(this);
        // 3. save to file
        fs.writeFile(studentsDataFile, JSON.stringify(students), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchStudents() {
    // return students;
    let students = [];
    students = JSON.parse(fs.readFileSync(studentsDataFile));
    return students;
  }
};
