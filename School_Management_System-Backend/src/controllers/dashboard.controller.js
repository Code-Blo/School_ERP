import Student from '../models/student.model.js';
import Teacher from '../models/teacher.model.js';
import Class from '../models/class.model.js';
import PaymentTransaction from '../models/paymentTransaction.model.js';
import { ApiError } from '../utils/ApiError.js';

export const getDashboardStats = async (req, res) => {
  try {
    // Ensure the user is an admin
    if (req.user.role !== 'admin') {
      throw new ApiError(403, 'You are not authorized to view dashboard stats');
    }

    const adminId = req.user._id;

    // 1. Get Total Students
    const studentCount = await Student.countDocuments({ adminId });

    // 2. Get Total Teachers
    const teacherCount = await Teacher.countDocuments({ adminId });

    // 3. Get Total Classes
    const classCount = await Class.countDocuments({ adminId });

    // 4. Get Total Fee Collection
    const feeResult = await PaymentTransaction.aggregate([
      { $match: { adminId: adminId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalFees = feeResult.length > 0 ? feeResult[0].total : 0;

    // Send all stats in one response
    res.status(200).json({
      success: true,
      data: {
        totalStudents: studentCount,
        totalTeachers: teacherCount,
        totalClasses: classCount,
        totalFeeCollection: totalFees,
      },
    });

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Server error while fetching stats',
    });
  }
};