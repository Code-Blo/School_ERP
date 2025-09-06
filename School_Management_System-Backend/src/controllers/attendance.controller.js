

// import Attendance from '../models/attendance.model.js';
// import { ApiError } from '../utils/ApiError.js';
// import mongoose from 'mongoose';

// // ✅ Student fetches own attendance
// export const getStudentAttendance = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     let { year } = req.query;

//     if (req.user._id.toString() !== studentId && req.role === 'student') {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }

//     if (!year) {
//       const today = new Date();
//       year = today.getMonth() < 3
//         ? `${today.getFullYear() - 1}-${today.getFullYear()}`
//         : `${today.getFullYear()}-${today.getFullYear() + 1}`;
//     }

//     const doc = await Attendance.findOne({
//       studentId,
//       academicYear: year,
//       adminId: req.user.adminId || req.user._id,
//     }).sort({ 'records.date': -1 });

//     res.status(200).json({ records: doc?.records || [] });
//   } catch (err) {
//     console.error('Error fetching student attendance:', err);
//     res.status(500).json({ message: err.message || 'Internal server error' });
//   }
// };

// // ✅ Single attendance mark (admin or teacher)
// // export const markAttendance = async (req, res) => {
// //   try {
// //     if (req.role !== 'teacher' && req.role !== 'admin') {
// //       throw new ApiError(403, 'Only teachers or admins can mark attendance');
// //     }

// //     const { studentId, classId, subject, date, status, academicYear } = req.body;
// //     const adminId = req.user.adminId || req.user._id;

// //     if (!mongoose.Types.ObjectId.isValid(studentId)) {
// //       throw new ApiError(400, 'Invalid student ID');
// //     }

// //     if (!subject || typeof subject !== 'string') {
// //       throw new ApiError(400, 'Valid subject is required');
// //     }

// //     if (!['present', 'absent', 'leave'].includes(status)) {
// //       throw new ApiError(400, 'Invalid attendance status');
// //     }

// //     let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

// //     if (attendanceDoc) {
// //       const recordIndex = attendanceDoc.records.findIndex(
// //         r => r.date === date && r.subject === subject
// //       );

// //       if (recordIndex !== -1) {
// //         attendanceDoc.records[recordIndex].status = status;
// //       } else {
// //         attendanceDoc.records.push({ date, status, subject, classId });
// //       }
// //     } else {
// //       attendanceDoc = new Attendance({
// //         adminId,
// //         studentId,
// //         academicYear,
// //         records: [{ date, status, subject, classId }],
// //       });
// //     }

// //     const savedDoc = await attendanceDoc.save();
// //     res.status(200).json({
// //       message: 'Attendance saved successfully',
// //       data: savedDoc,
// //     });
// //   } catch (err) {
// //     if (err.code === 11000) {
// //       return res.status(409).json({
// //         message: 'Attendance already recorded for this date and subject',
// //       });
// //     }

// //     if (err.name === 'ValidationError') {
// //       const messages = Object.values(err.errors).map(val => val.message);
// //       return res.status(400).json({
// //         message: `Validation error: ${messages.join(', ')}`,
// //       });
// //     }

// //     res.status(err.statusCode || 500).json({
// //       message: err.message || 'Internal server error',
// //     });
// //   }
// // };


// export const markAttendance = async (req, res) => {
//   try {
//     if (req.role !== 'teacher' && req.role !== 'admin') {
//       throw new ApiError(403, 'Only teachers or admins can mark attendance');
//     }

//     const { studentId, classId, subject, date, status, academicYear } = req.body;
//     const adminId = req.user.adminId || req.user._id;

//     if (!mongoose.Types.ObjectId.isValid(studentId)) {
//       throw new ApiError(400, 'Invalid student ID');
//     }

//     if (!subject || typeof subject !== 'string') {
//       throw new ApiError(400, 'Valid subject is required');
//     }

//     if (!['present', 'absent', 'leave'].includes(status)) {
//       throw new ApiError(400, 'Invalid attendance status');
//     }

//     let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

//     if (attendanceDoc) {
//       const recordIndex = attendanceDoc.records.findIndex(
//         r => r.date === date && r.subject === subject
//       );

//       if (recordIndex !== -1) {
//         attendanceDoc.records[recordIndex].status = status;
//       } else {
//         attendanceDoc.records.push({ date, status, subject, classId });
//       }
//     } else {
//       attendanceDoc = new Attendance({
//         adminId,
//         studentId,
//         academicYear,
//         records: [{ date, status, subject, classId }],
//       });
//     }

//     const savedDoc = await attendanceDoc.save();
//     res.status(200).json({
//       message: 'Attendance saved successfully',
//       data: savedDoc,
//     });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(409).json({
//         message: 'Attendance already recorded for this date and subject',
//       });
//     }

//     if (err.name === 'ValidationError') {
//       const messages = Object.values(err.errors).map(val => val.message);
//       return res.status(400).json({
//         message: `Validation error: ${messages.join(', ')}`,
//       });
//     }

//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Internal server error',
//     });
//   }
// };


// // ✅ Bulk save attendance (admin or teacher)
// export const saveAttendance = async (req, res) => {
//   try {
//     if (req.role !== 'teacher' && req.role !== 'admin') {
//       throw new ApiError(403, 'Only teachers or admins can save attendance');
//     }

//     const { records } = req.body;
//     const adminId = req.user.adminId || req.user._id;

//     for (const entry of records) {
//       const { studentId, academicYear, record } = entry;

//       let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

//       if (!attendanceDoc) {
//         await Attendance.create({
//           adminId,
//           studentId,
//           academicYear,
//           records: [record],
//         });
//       } else {
//         const existingIndex = attendanceDoc.records.findIndex(
//           (r) => r.date === record.date && r.subject === record.subject
//         );

//         if (existingIndex !== -1) {
//           attendanceDoc.records[existingIndex] = record;
//         } else {
//           attendanceDoc.records.push(record);
//         }

//         await attendanceDoc.save();
//       }
//     }

//     res.status(200).json({ message: 'Attendance saved successfully.' });
//   } catch (err) {
//     console.error('Error saving attendance:', err);
//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Internal server error',
//     });
//   }
// };










// // ✅ UPDATED: Single attendance mark (admin or teacher) - No subject required
// export const markAttendance = async (req, res) => {
//   try {
//     if (req.role !== 'teacher' && req.role !== 'admin') {
//       throw new ApiError(403, 'Only teachers or admins can mark attendance');
//     }

//     // REMOVED 'subject' from request body
//     const { studentId, classId, date, status, academicYear } = req.body;
//     const adminId = req.user.adminId || req.user._id;

//     if (!mongoose.Types.ObjectId.isValid(studentId)) {
//       throw new ApiError(400, 'Invalid student ID');
//     }

//     if (!['present', 'absent', 'leave'].includes(status)) {
//       throw new ApiError(400, 'Invalid attendance status');
//     }

//     let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

//     if (attendanceDoc) {
//       // Find record based on DATE only
//       const recordIndex = attendanceDoc.records.findIndex(r => r.date === date);

//       if (recordIndex !== -1) {
//         // Update existing record for that date
//         attendanceDoc.records[recordIndex].status = status;
//       } else {
//         // Add a new record for that date
//         attendanceDoc.records.push({ date, status, classId });
//       }
//     } else {
//       // Create a new document if none exists
//       attendanceDoc = new Attendance({
//         adminId,
//         studentId,
//         academicYear,
//         records: [{ date, status, classId }],
//       });
//     }

//     const savedDoc = await attendanceDoc.save();
//     res.status(200).json({
//       message: 'Attendance saved successfully',
//       data: savedDoc,
//     });
//   } catch (err) {
//     // ... (error handling remains the same)
//     if (err.name === 'ValidationError') {
//       const messages = Object.values(err.errors).map(val => val.message);
//       return res.status(400).json({
//         message: `Validation error: ${messages.join(', ')}`,
//       });
//     }

//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Internal server error',
//     });
//   }
// };

// // ... (Your other controller functions: getStudentAttendance, saveAttendance)
// export const getStudentAttendance = async (req, res) => {
//     // This function should already work as intended
//     try {
//         const { studentId } = req.params;
//         let { year } = req.query;

//         if (req.user._id.toString() !== studentId && req.role === 'student') {
//             return res.status(403).json({ message: 'Unauthorized access' });
//         }

//         if (!year) {
//             const today = new Date();
//             year = today.getMonth() < 3
//                 ? `${today.getFullYear() - 1}-${today.getFullYear()}`
//                 : `${today.getFullYear()}-${today.getFullYear() + 1}`;
//         }

//         const doc = await Attendance.findOne({
//             studentId,
//             academicYear: year,
//             adminId: req.user.adminId || req.user._id,
//         }).sort({ 'records.date': -1 });

//         res.status(200).json({ records: doc?.records || [] });
//     } catch (err) {
//         console.error('Error fetching student attendance:', err);
//         res.status(500).json({ message: err.message || 'Internal server error' });
//     }
// };

// export const saveAttendance = async (req, res) => {
//     // This function should also work, but ensure the 'record' object sent from the frontend does not contain a subject.
//     try {
//         if (req.role !== 'teacher' && req.role !== 'admin') {
//             throw new ApiError(403, 'Only teachers or admins can save attendance');
//         }

//         const { records } = req.body;
//         const adminId = req.user.adminId || req.user._id;

//         for (const entry of records) {
//             const { studentId, academicYear, record } = entry;
//             // Ensure `record` does not contain a `subject` field when calling this
//             let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

//             if (!attendanceDoc) {
//                 await Attendance.create({
//                     adminId,
//                     studentId,
//                     academicYear,
//                     records: [record],
//                 });
//             } else {
//                 const existingIndex = attendanceDoc.records.findIndex((r) => r.date === record.date);

//                 if (existingIndex !== -1) {
//                     attendanceDoc.records[existingIndex] = record;
//                 } else {
//                     attendanceDoc.records.push(record);
//                 }

//                 await attendanceDoc.save();
//             }
//         }

//         res.status(200).json({ message: 'Attendance saved successfully.' });
//     } catch (err) {
//         console.error('Error saving attendance:', err);
//         res.status(err.statusCode || 500).json({
//             message: err.message || 'Internal server error',
//         });
//     }
// };




// controllers/attendance.controller.js
import Attendance from '../models/attendance.model.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';

// ... (getStudentAttendance and saveAttendance functions can remain if needed)

export const markAttendance = async (req, res) => {
  try {
    if (req.role !== 'teacher' && req.role !== 'admin') {
      throw new ApiError(403, 'Only teachers or admins can mark attendance');
    }

    // REMOVED 'subject' from the destructured body
    const { studentId, classId, date, status, academicYear } = req.body;
    const adminId = req.user.adminId || req.user._id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new ApiError(400, 'Invalid student ID');
    }

    if (!['present', 'absent', 'leave'].includes(status)) {
      throw new ApiError(400, 'Invalid attendance status');
    }

    let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

    if (attendanceDoc) {
      // Find record by DATE only
      const recordIndex = attendanceDoc.records.findIndex(r => r.date === date);

      if (recordIndex !== -1) {
        // Update existing record for the day
        attendanceDoc.records[recordIndex].status = status;
      } else {
        // Add new record for the day
        attendanceDoc.records.push({ date, status, classId });
      }
    } else {
      // Create new document
      attendanceDoc = new Attendance({
        adminId,
        studentId,
        academicYear,
        records: [{ date, status, classId }],
      });
    }

    const savedDoc = await attendanceDoc.save();
    res.status(200).json({
      message: 'Attendance saved successfully',
      data: savedDoc,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        message: `Validation error: ${messages.join(', ')}`,
      });
    }

    res.status(err.statusCode || 500).json({
      message: err.message || 'Internal server error',
    });
  }
};

// ... other functions like getStudentAttendance and saveAttendance
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    let { year } = req.query;

    if (req.user._id.toString() !== studentId && req.role === 'student') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    if (!year) {
      const today = new Date();
      year = today.getMonth() < 3
        ? `${today.getFullYear() - 1}-${today.getFullYear()}`
        : `${today.getFullYear()}-${today.getFullYear() + 1}`;
    }

    const doc = await Attendance.findOne({
      studentId,
      academicYear: year,
      adminId: req.user.adminId || req.user._id,
    }).sort({ 'records.date': -1 });

    res.status(200).json({ records: doc?.records || [] });
  } catch (err) {
    console.error('Error fetching student attendance:', err);
    res.status(500).json({ message: err.message || 'Internal server error' });
  }
};


export const saveAttendance = async (req, res) => {
    // This function should also work, but ensure the 'record' object sent from the frontend does not contain a subject.
    try {
        if (req.role !== 'teacher' && req.role !== 'admin') {
            throw new ApiError(403, 'Only teachers or admins can save attendance');
        }

        const { records } = req.body;
        const adminId = req.user.adminId || req.user._id;

        for (const entry of records) {
            const { studentId, academicYear, record } = entry;
            // Ensure `record` does not contain a `subject` field when calling this
            let attendanceDoc = await Attendance.findOne({ studentId, academicYear, adminId });

            if (!attendanceDoc) {
                await Attendance.create({
                    adminId,
                    studentId,
                    academicYear,
                    records: [record],
                });
            } else {
                const existingIndex = attendanceDoc.records.findIndex((r) => r.date === record.date);

                if (existingIndex !== -1) {
                    attendanceDoc.records[existingIndex] = record;
                } else {
                    attendanceDoc.records.push(record);
                }

                await attendanceDoc.save();
            }
        }

        res.status(200).json({ message: 'Attendance saved successfully.' });
    } catch (err) {
        console.error('Error saving attendance:', err);
        res.status(err.statusCode || 500).json({
            message: err.message || 'Internal server error',
        });
    }
};