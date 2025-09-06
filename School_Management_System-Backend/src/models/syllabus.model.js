// // import mongoose from "mongoose";

// // const syllabusSchema = new mongoose.Schema({
// //   class: { type: String, required: true, unique: true },
// //   syllabusURL: { type: String, required: true }
// // });

// // const Syllabus = mongoose.model("Syllabus", syllabusSchema);
// // export default Syllabus;


// models/syllabus.model.js
// import mongoose from "mongoose";

// const syllabusSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: true
//   },
//   class: { type: String, required: true, trim: true },
//   syllabusURL: { type: String, required: true }
// }, {
//   timestamps: true
// });

// syllabusSchema.index({ adminId: 1, class: 1 }, { unique: true });

// const Syllabus = mongoose.model("Syllabus", syllabusSchema);
// export default Syllabus;


// models/Syllabus.js
import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  class: { type: String, required: true, unique: true }, // normalized class, e.g. "10", "12A"
  syllabusURL: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);
export default Syllabus;