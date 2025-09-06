import express from 'express';
import authMiddleware, { authorizeRole } from '../middlewares/auth.middleware.js';
import { getDashboardStats } from '../controllers/dashboard.controller.js';

const router = express.Router();

// Route for admins to get dashboard stats
router.get('/stats', authMiddleware, authorizeRole('admin'), getDashboardStats);

export default router;