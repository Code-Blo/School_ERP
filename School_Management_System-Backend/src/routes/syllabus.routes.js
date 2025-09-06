

import express from 'express';
import upload from '../middlewares/upload.middleware.js';
import {
  uploadSyllabus, getSyllabusByClass, deleteSyllabus, getAllSyllabusForAdmin
} from '../controllers/syllabus.controller.js';
import authMiddleware, { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/upload', authMiddleware, authorizeRole('admin'), upload.single('syllabus'), uploadSyllabus);
router.get('/:classId', authMiddleware, getSyllabusByClass);
router.delete('/:classId', authMiddleware, authorizeRole('admin'), deleteSyllabus);
router.get('/admin/all', authMiddleware, authorizeRole('admin'), getAllSyllabusForAdmin);

export default router;
