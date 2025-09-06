import multer from 'multer';
import path from 'path';
import fs from 'fs';

// --- Configuration for ASSIGNMENT file uploads ---

// Create the directory if it doesn't exist
const uploadDir = path.join(process.cwd(), 'uploads', 'submissions');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save to 'uploads/submissions/'
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name;
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // Sanitize original name to prevent issues
    const safeOriginalName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${safeOriginalName}-${uniqueSuffix}${ext}`);
  },
});

// Create the Multer instance for assignment submissions
const submissionUpload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default submissionUpload;