// // // middlewares/multerConfig.middleware.js
// // import multer from "multer";
// // import path from "path";
// // import fs from "fs";

// // // Create uploads folder if not exists
// // const uploadDir = "uploads";
// // if (!fs.existsSync(uploadDir)) {
// //   fs.mkdirSync(uploadDir);
// // }

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, uploadDir);
// //   },
// //   filename: function (req, file, cb) {
// //     const ext = path.extname(file.originalname);
// //     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
// //     cb(null, uniqueName);
// //   },
// // });

// // const upload = multer({ storage });

// // export default upload;


// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Directory to save syllabus files
// const uploadDir = path.join(process.cwd(), 'uploads', 'syllabus');

// // Ensure upload directory exists
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname); // get original extension
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
//     cb(null, uniqueName);
//   },
// });

// // Only accept PDF files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed!'), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   },
// });

// export default upload;



import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Directory for PDFs: uploads/syllabus
const uploadDir = path.join(process.cwd(), 'uploads', 'syllabus');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, unique);
  }
});

const fileFilter = (_, file, cb) =>
  file.mimetype === 'application/pdf'
    ? cb(null, true)
    : cb(new Error('Only PDF files allowed!'), false);

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

export default upload;
