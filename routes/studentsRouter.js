const router = require("express").Router();
// const {
//   getAllStudents,
//   getStudentById,
//   createStudent,
//   deleteStudent,
// } = require("../controllers/studentsController");

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsControllerDB");

const studentValidator = require("../middlewares/StudentValidatorMiddleware.js");
//
//
//
router.param("id", (req, res, next, val) => {
  // console.log(req.params.id);
  // console.log(val);
  // if (Number(val)) {
  if (/^[0-9a-fA-F]{24}$/.test(val)) {
    // req.params.id = parseInt(req.params.id);
    req.id = val;
    next();
  } else {
    res.status(400).json({ result: "Invalid id!" });
  }
});

router.get(
  "/",
  (req, res, next) => {
    console.log("Getting all students records...");
    next();
  },
  getAllStudents
);
router.get(
  "/:id",
  (req, res, next) => {
    console.log("Getting student record by id...");
    next();
  },
  getStudentById
);
router.post("/", studentValidator, createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
