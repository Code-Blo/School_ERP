// import mongoose from 'mongoose';
// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// // route imports
// import adminRoutes from './routes/admin.routes.js';
// import teacherRoutes from './routes/teacher.routes.js';
// import studentRoutes from './routes/student.routes.js';
// import userRoutes from './routes/user.routes.js';
// import timetableRoutes from "./routes/timetable.routes.js";
// import syllabusRoutes from './routes/syllabus.routes.js';
// import assignmentRoutes from './routes/assignment.routes.js';
// import eventRoutes from './routes/event.routes.js';
// import noticeRoutes from './routes/notice.routes.js';
// import classRoutes from './routes/class.routes.js';
// import complaintRoutes from './routes/complaint.routes.js';
// import leaveRoutes from './routes/leave.routes.js';
// import meetingRoutes from './routes/meeting.routes.js';
// import resourceRoutes from './routes/resource.routes.js';
// import attendanceRoutes from './routes/attendance.routes.js'
// import cookieParser from 'cookie-parser';
// import feeRoutes from './routes/fee.routes.js';
// import resultRoutes from './routes/result.routes.js';
// import paymentRoutes from './routes/payment.routes.js';
// import marksRoutes from './routes/marks.routes.js';
// import PaymentTransaction from './models/paymentTransaction.model.js'; // Import model



// const app = express();  
// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 
// app.use(cookieParser());
// // app.use(cors({
// //   origin: process.env.CORS_ORIGIN || 'http://localhost:5000',

// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));
// // app.use('/uploads', express.static('uploads'));



// // routes
// app.use('/api/admins', adminRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/user', userRoutes);
// app.use("/api/timetable", timetableRoutes);
// app.use("/api/syllabus", syllabusRoutes);
// app.use("/api/assignments", assignmentRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use('/api/events', eventRoutes);
// app.use('/api/notices', noticeRoutes);
// app.use('/api/classes', classRoutes);
// app.use('/api/complaints', complaintRoutes);
// app.use('/api/leaves', leaveRoutes);
// app.use("/api/meetings", meetingRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.get('/', (req, res) => {
//   res.send('School Management System API running...');
// });
// app.use('/api/fees', feeRoutes);
// app.use('/api/results', resultRoutes); // ✅ This mounts /api/results
// app.use('/api/payment', paymentRoutes); // ✅ Mounting route
// app.use('/api/marks', marksRoutes);



// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: "Endpoint not found"
// //   });
// // });
// const allowedOrigins = [
//   'https://erp-iota-brown.vercel.app'
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // allow non-browser clients
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, origin); // allow this origin
//     }
//     return callback(new Error('Not allowed by CORS'), false);
//   },
//   credentials: true
// }));

// // server.js (or app.js)
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
//   if (Object.keys(req.body).length > 0) {
//     console.log("Request Body:", JSON.stringify(req.body, null, 2));
//   }
//   next();
// });

// app.use((err, req, res, next) => {
//   console.error("Global error handler:", err);

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

//   res.status(statusCode).json({
//     success: false,
//     message,
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });


// export { app }



import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import path from 'path';
// route imports
import adminRoutes from './routes/admin.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import studentRoutes from './routes/student.routes.js';
import userRoutes from './routes/user.routes.js';
import timetableRoutes from "./routes/timetable.routes.js";
import syllabusRoutes from './routes/syllabus.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import eventRoutes from './routes/event.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import classRoutes from './routes/class.routes.js';
import complaintRoutes from './routes/complaint.routes.js';
import leaveRoutes from './routes/leave.routes.js';
import meetingRoutes from './routes/meeting.routes.js';
import resourceRoutes from './routes/resource.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import cookieParser from 'cookie-parser';
import feeRoutes from './routes/fee.routes.js';
import resultRoutes from './routes/result.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import marksRoutes from './routes/marks.routes.js';
import PaymentTransaction from './models/paymentTransaction.model.js'; // Import model
import dashboardRoutes from './routes/dashboard.routes.js'; 

const app = express();

const allowedOrigins = [
  'https://erp-iota-brown.vercel.app',
  'https://erp.iitiancraft.com',
  'http://localhost:5173'           // fixed this line
];

// // --- CORS middleware: PLACE THIS BEFORE ALL ROUTES ---
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow non-browser clients like Postman or server-side requests
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true); // <-- IMPORTANT: pass true, NOT origin string
//     }
//     return callback(null, false); // reject other origins gracefully
//   },
//   credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser and server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.error('Blocked CORS request from origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static uploads folder
// app.use("/uploads", express.static("uploads"));
app.use('/uploads', express.static('uploads'));


// --- Routes ---
app.use('/api/admins', adminRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/leaves', leaveRoutes);
app.use("/api/meetings", meetingRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/marks', marksRoutes);

app.use('/api/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('School Management System API running...');
});

// --- Logger middleware ---
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  // if (Object.keys(req.body).length > 0) {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {

    console.log("Request Body:", JSON.stringify(req.body, null, 2));
  }
  next();
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export { app };
