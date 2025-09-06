import multer from 'multer';
import path from 'path';
import fs from 'fs';

// --- Configuration specifically for SYLLABUS PDF uploads ---

// Define the directory path
const uploadDir = path.join(process.cwd(), 'uploads', 'syllabus');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files to 'uploads/syllabus/'
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `syllabus-${uniqueSuffix}${ext}`);
  },
});

// Filter to accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    // Reject the file if it's not a PDF
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Create the Multer instance for syllabus uploads
const syllabusUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export default syllabusUpload;