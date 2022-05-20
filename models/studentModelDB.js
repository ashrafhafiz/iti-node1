const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fn: {
      type: String,
      required: true,
      trim: true,
      // the following is to convert the name to proper case.
      set: (str) =>
        str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }),
      get: (str) => str.toUpperCase(),
    },
    ln: {
      type: String,
      required: true,
      trim: true,
      // the following is to convert the name to proper case.
      set: (str) =>
        str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }),
      get: (str) => str.toUpperCase(),
    },
    dept: {
      type: String,
      required: true,
      enum: ["SA", "SB", "SC"],
    },
    empId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Student = mongoose.model("Students", studentSchema);

module.exports = Student;
