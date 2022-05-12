const router = require("express").Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
} = require("../controllers/studentsController");

router.get(
  "/",
  (req, res, next) => {
    console.log(req.url);
    console.log("Getting all students records...");
    next();
  },
  getAllStudents
);
router.get("/:id", getStudentById);
router.post("/", createStudent);

module.exports = router;
