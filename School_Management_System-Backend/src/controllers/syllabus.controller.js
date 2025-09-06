

// // controllers/syllabus.controller.js
// import Syllabus from '../models/syllabus.model.js';
// import { ApiError } from '../utils/ApiError.js';

// // ✅ Upload or Update Syllabus (Admin only)
// // syllabusUpload.controller.js

// // export const uploadSyllabus = async (req, res) => {
// //   try {
// //     const className = req.body.class;
// //     const adminId = req.user._id;

// //     if (!req.file) {
// //       return res.status(400).json({ message: "No file uploaded" });
// //     }

// //     const filePath = `/uploads/resources/${req.file.filename}`;

// //     const existing = await Syllabus.findOne({ className, subject, adminId });

// //     if (existing) {
// //       existing.file = filePath;
// //       await existing.save();
// //       return res.status(200).json({ message: "Syllabus updated", syllabus: existing });
// //     }

// //     const newSyllabus = await Syllabus.create({
// //       className,
// //       subject,
// //       file: filePath,
// //       adminId,
// //     });

// //     res.status(201).json({ message: "Syllabus uploaded", syllabus: newSyllabus });
// //   } catch (err) {
// //     console.error("Upload error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // };
// export const uploadSyllabus = async (req, res) => {
//   try {
//     const className = req.body.class; // expect comes without "Class " prefix
//     const adminId = req.user._id;

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const filePath = `/uploads/${req.file.filename}`;  // or `/uploads/resources/${filename}` if you prefer

//     // Find existing syllabus for the class and admin
//     let syllabus = await Syllabus.findOne({ class: className, adminId });

//     if (syllabus) {
//       syllabus.syllabusURL = filePath;
//       await syllabus.save();
//       return res.status(200).json({ message: "Syllabus updated", syllabus });
//     }

//     // Create new
//     syllabus = await Syllabus.create({
//       class: className,
//       syllabusURL: filePath,
//       adminId,
//     });

//     res.status(201).json({ message: "Syllabus uploaded", syllabus });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// // ✅ Delete syllabus by classId (Admin only)
// export const deleteSyllabus = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can delete syllabus');
//     }

//     const classId = req.params.classId.replace(/^Class\s*/, '');

//     await Syllabus.findOneAndDelete({ class: classId, adminId: req.user._id });
//     res.json({ message: "Syllabus deleted" });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({ error: err.message || "Delete failed" });
//   }
// };

// // // Add this new function
// // export const getAllSyllabusForAdmin = async (req, res) => {
// //   try {
// //     const syllabi = await Syllabus.find({ adminId: req.user._id });
// //     res.status(200).json(syllabi);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// // Get all syllabus for admin
// export const getAllSyllabusForAdmin = async (req, res) => {
//   try {
//     const syllabi = await Syllabus.find({ adminId: req.user._id });

//     // Add "Class " prefix to class names
//     const formattedSyllabi = syllabi.map(s => ({
//       ...s._doc,
//       class: `Class ${s.class}`
//     }));

//     res.status(200).json(formattedSyllabi);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get syllabus by class
// export const getSyllabusByClass = async (req, res) => {
//   try {
//     const classId = req.params.classId.replace(/^Class\s*/i, '');
//     const syllabus = await Syllabus.findOne({ class: classId });

//     if (!syllabus) {
//       return res.status(404).json({ message: "Syllabus not found" });
//     }

//     res.status(200).json({
//       ...syllabus._doc,
//       class: `Class ${syllabus.class}` // Add prefix for frontend
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// import Syllabus from '../models/syllabus.model.js';
// import { ApiError } from '../utils/ApiError.js';

// // Upload or update syllabus (Admin only)
// export const uploadSyllabus = async (req, res) => {
//   try {
//     const className = req.body.class; // normalized class name, no "Class " prefix
//     const adminId = req.user._id;

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // URL path to serve the file (matches express static)
//     const filePath = `/uploads/syllabus/${req.file.filename}`;

//     let syllabus = await Syllabus.findOne({ class: className, adminId });

//     if (syllabus) {
//       syllabus.syllabusURL = filePath;
//       await syllabus.save();
//       return res.status(200).json({ message: 'Syllabus updated', data: syllabus });
//     }

//     syllabus = await Syllabus.create({
//       class: className,
//       syllabusURL: filePath,
//       adminId,
//     });

//     return res.status(201).json({ message: 'Syllabus uploaded', data: syllabus });
//   } catch (err) {
//     console.error('Upload error:', err);
//     return res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// // Delete syllabus (Admin only)
// export const deleteSyllabus = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can delete syllabus');
//     }

//     const classId = req.params.classId.replace(/^Class\s*/i, '');

//     await Syllabus.findOneAndDelete({ class: classId, adminId: req.user._id });

//     return res.json({ message: 'Syllabus deleted' });
//   } catch (err) {
//     return res.status(err.statusCode || 500).json({ error: err.message || 'Delete failed' });
//   }
// };

// // Get all syllabus for admin
// export const getAllSyllabusForAdmin = async (req, res) => {
//   try {
//     const syllabi = await Syllabus.find({ adminId: req.user._id });

//     // Add "Class " prefix for frontend UI
//     const formattedSyllabi = syllabi.map(s => ({
//       ...s._doc,
//       class: `Class ${s.class}`
//     }));

//     return res.status(200).json(formattedSyllabi);
//   } catch (err) {
//     return res.status(500).json({ error: 'Server error' });
//   }
// };

// // Get syllabus by class (for students/admin/etc)
// export const getSyllabusByClass = async (req, res) => {
//   try {
//     const classId = req.params.classId.replace(/^Class\s*/i, '');

//     const syllabus = await Syllabus.findOne({ class: classId });

//     if (!syllabus) {
//       return res.status(404).json({ message: 'Syllabus not found' });
//     }

//     return res.status(200).json({
//       ...syllabus._doc,
//       class: `Class ${syllabus.class}`
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Server error' });
//   }
// };




import Syllabus from '../models/syllabus.model.js';
import { ApiError } from '../utils/ApiError.js'; // If used elsewhere

export const uploadSyllabus = async (req, res) => {
  try {
    const className = req.body.class;
    const adminId = req.user._id;

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Save the URL as /uploads/syllabus/FILENAME
    const filePath = `/uploads/syllabus/${req.file.filename}`;

    let syllabus = await Syllabus.findOne({ class: className, adminId });
    if (syllabus) {
      syllabus.syllabusURL = filePath;
      await syllabus.save();
      return res.status(200).json({ message: "Syllabus updated", data: syllabus });
    }

    syllabus = await Syllabus.create({
      class: className,
      syllabusURL: filePath,
      adminId
    });
    return res.status(201).json({ message: "Syllabus uploaded", data: syllabus });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteSyllabus = async (req, res) => {
  try {
    if (req.role !== 'admin') throw new ApiError(403, 'Only admins can delete syllabus');
    const classId = req.params.classId.replace(/^Class\s*/i, '');
    await Syllabus.findOneAndDelete({ class: classId, adminId: req.user._id });
    return res.json({ message: "Syllabus deleted" });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ error: err.message || "Delete failed" });
  }
};

export const getAllSyllabusForAdmin = async (req, res) => {
  try {
    const syllabi = await Syllabus.find({ adminId: req.user._id });
    const formatted = syllabi.map(s => ({ ...s._doc, class: `Class ${s.class}` }));
    return res.status(200).json(formatted);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const getSyllabusByClass = async (req, res) => {
  try {
    const classId = req.params.classId.replace(/^Class\s*/i, '');
    const syllabus = await Syllabus.findOne({ class: classId });
    if (!syllabus) return res.status(404).json({ message: "Syllabus not found" });
    return res.status(200).json({ ...syllabus._doc, class: `Class ${syllabus.class}` });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
