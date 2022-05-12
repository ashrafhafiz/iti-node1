const { stringify } = require("ajv");
const { get } = require("express/lib/response");
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb://admin:secret@localhost:27017/iti?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
  );
  console.log("DB connected...");
}

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
    },
    dept: {
      type: String,
      required: true,
      enum: ["SA", "SB", "SC"],
    },
    id: {
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

// Student.find()
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//
// Student.find({ fn: "Ashraf" })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//
// Student.findById("627cdc80d7331e1d22d5ccc8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//
// const getAllStudents = () =>
//   Student.find()
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
//
const getAllStudents = async () => {
  //   const results = await Student.find();
  //   const results = await Student.find().where("fn").equals("Ashraf");
  //   const results = await Student.find().limit(3).sort({ fn: 1 });
  //   const results = await Student.find().limit(3).sort({ fn: -1 });
  //   const results = await Student.find()
  //     .limit(3)
  //     .sort({ fn: -1 })
  //     .select({ fn: 1, ln: 1 });
  //   const results = await Student.find()
  //     .limit(3)
  //     .sort({ fn: -1 })
  //     .select({ fn: 1, ln: 1 });
  //   const results = await Student.find({ fn: /^As/ }).select({ fn: 1, ln: 1 });
  const results = await Student.find()
    .sort({ id: -1 })
    .select({ id: 1, fn: 1, ln: 1 });
  console.log(results);
};
getAllStudents();

const addStudent = (fn, ln, dept, id) => {
  let newStudent = new Student({ fn, ln, dept, id });
  newStudent
    .save()
    .then(() => console.log("saved..."))
    .catch((err) => {
      //   for (let i in err.errors) {
      //     console.log(err.errors[i].message);
      //   }
      console.log(err.message);
    });
};

// addStudent("menna", "Ayman", "SB", 10);
