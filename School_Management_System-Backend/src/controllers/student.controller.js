
// // controllers/student.controller.js
// import Student from "../models/student.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import { ApiError } from "../utils/ApiError.js";

// export const createStudent = async (req, res) => {
//   const { name, email, password, className, rollNo, profileImage } = req.body;

//   try {
//     const existing = await Student.findOne({ email });
//     if (existing) throw new ApiError(400, "Student already exists");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const student = await Student.create({
//       adminId: req.user._id,
//       name,
//       email,
//       password: hashedPassword,
//       className,
//       rollNo,
//       profileImage,
//       role: "student",
//       designation: "Student"
//     });

//     res.status(201).json({ message: "Student created", student });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

// export const loginStudent = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const student = await Student.findOne({ email });
//     if (!student) throw new ApiError(404, "Student not found");

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) throw new ApiError(401, "Invalid credentials");

//     const payload = { _id: student._id, role: "student" };

//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });

//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 24 * 60 * 60 * 1000,
//     }).cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     }).status(200).json({ message: "Login successful" });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

// export const getAllStudentsGroupedByClass = async (req, res) => {
//   try {
//     const students = await Student.find({ adminId: req.user._id });
//     const grouped = {};
//     students.forEach((student) => {
//       const cls = student.className || "Unknown";
//       if (!grouped[cls]) grouped[cls] = [];
//       grouped[cls].push(student);
//     });
//     res.status(200).json(grouped);
//   } catch (err) {
//     res.status(500).json({ message: "Error grouping students", error: err.message });
//   }
// };

// export const getStudentsByClassName = async (req, res) => {
//   try {
//     const { className } = req.params;
//     const students = await Student.find({ className, adminId: req.user._id });
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteStudent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const student = await Student.findOneAndDelete({ _id: id, adminId: req.user._id });
//     if (!student) return res.status(404).json({ message: "Student not found or unauthorized" });
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting student", error: err.message });
//   }
// };

// export const getLoggedInStudent = async (req, res) => {
//   try {
//     const student = await Student.findById(req.user._id).select("-password");
//     if (!student) return res.status(404).json({ message: "Student not found" });
//     res.status(200).json(student);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching student", error: error.message });
//   }
// };



// controllers/student.controller.js
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

// ... (keep createStudent and loginStudent functions as they are)

export const createStudent = async (req, res) => {
  const { name, email, password, className, rollNo, profileImage } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) throw new ApiError(400, "Student already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      adminId: req.user._id,
      name,
      email,
      password: hashedPassword,
      className,
      rollNo,
      profileImage,
      role: "student",
      designation: "Student"
    });

    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) throw new ApiError(404, "Student not found");

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const payload = { _id: student._id, role: "student" };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "10d" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    }).cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getAllStudentsGroupedByClass = async (req, res) => {
  try {
    // FIX: Handle both admin and teacher roles correctly
    const adminId = req.user.role === 'admin' ? req.user._id : req.user.adminId;
    const students = await Student.find({ adminId: adminId });

    const grouped = {};
    students.forEach((student) => {
      const cls = student.className || "Unknown";
      if (!grouped[cls]) grouped[cls] = [];
      grouped[cls].push(student);
    });
    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error grouping students", error: err.message });
  }
};

export const getStudentsByClassName = async (req, res) => {
  try {
    const { className } = req.params;
    // FIX: Handle both admin and teacher roles correctly
    const adminId = req.user.role === 'admin' ? req.user._id : req.user.adminId;

    const students = await Student.find({ className, adminId: adminId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndDelete({ _id: id, adminId: req.user._id });
    if (!student) return res.status(404).json({ message: "Student not found or unauthorized" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};

export const getLoggedInStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
};