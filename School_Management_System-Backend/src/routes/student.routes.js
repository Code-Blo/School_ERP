
// routes/student.routes.js
import express from "express";
import {
  createStudent,
  loginStudent,
  getStudentsByClassName,
  getAllStudentsGroupedByClass,
  deleteStudent,
  getLoggedInStudent
} from "../controllers/student.controller.js";
import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authMiddleware, authorizeRole("admin"), createStudent);
router.post("/login", loginStudent);
router.get("/me", authMiddleware, getLoggedInStudent);
// router.get("/by-class-name/:className", authMiddleware, authorizeRole("admin"), getStudentsByClassName);
router.get(
  "/by-class-name/:className",
  authMiddleware,
  authorizeRole("admin", "teacher"), // Changed from "admin" to ["admin", "teacher"]
  getStudentsByClassName
);
router.get("/all", authMiddleware, authorizeRole("admin", "teacher"), getAllStudentsGroupedByClass);
router.delete("/:id", authMiddleware, authorizeRole("admin"), deleteStudent);

export default router;
