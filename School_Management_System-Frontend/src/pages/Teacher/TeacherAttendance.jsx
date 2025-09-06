// import React, { useEffect, useState } from "react";
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// const TeacherAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [academicYear, setAcademicYear] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedAttendance, setSelectedAttendance] = useState({});
//   const [currentMonth, setCurrentMonth] = useState("July");
//   const [currentYear, setCurrentYear] = useState(2025);
//   const [saving, setSaving] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [error, setError] = useState(null);

//   // REMOVED state for subjects

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/classes`,
//           { withCredentials: true }
//         );
//         setClasses(res.data);
//       } catch (err) {
//         console.error('Error fetching classes:', err.response?.data || err.message);
//         setError('Failed to load classes');
//       }
//     };
//     fetchClasses();
//   }, []);

//   useEffect(() => {
//     if (selectedDate) {
//       const dateObj = new Date(selectedDate);
//       const year = dateObj.getFullYear();
//       const month = dateObj.getMonth();
//       const day = dateObj.getDate();
//       const academicYear = month < 3 || (month === 3 && day < 1)
//         ? `${year - 1}-${year}`
//         : `${year}-${year + 1}`;
//       setAcademicYear(academicYear);
//     }
//   }, [selectedDate]);

//   // REMOVED useEffect hook for fetching subjects

//   useEffect(() => {
//     // UPDATED: Fetch students when class, date, and year are selected
//     if (selectedClass && selectedDate && academicYear) {
//       fetchStudentsByClass();
//     } else {
//       setStudents([]);
//       setSelectedAttendance({});
//     }
//   }, [selectedClass, selectedDate, academicYear]);

//   const fetchStudentsByClass = async () => {
//     try {
//       setLoadingStudents(true);
//       setError(null);
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${selectedClass.name}`,
//         { withCredentials: true }
//       );
//       setStudents(Array.isArray(res.data) ? res.data : []);
//       setSelectedAttendance({});
//     } catch (err) {
//       console.error('Error fetching students:', err.response?.data?.message || err.message);
//       setError('Error fetching students. Please try again.');
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   const handleAttendanceChange = async (studentId, status) => {
//     if (!['present', 'absent', 'leave'].includes(status)) {
//       console.error("Invalid attendance status:", status);
//       return;
//     }
//     const updated = { ...selectedAttendance, [studentId]: status };
//     setSelectedAttendance(updated);

//     try {
//       setSaving(true);
//       setError(null);
//       // UPDATED: Payload does not include subject
//       const payload = {
//         studentId,
//         classId: selectedClass._id,
//         date: selectedDate,
//         status: status,
//         academicYear,
//       };
//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/attendance/mark`,
//         payload,
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.error("Failed to mark attendance:", error.response?.data || error.message);
//       const msg = error.response?.data?.message?.toLowerCase() || '';
//       if (msg.includes('validation')) {
//         setError('Invalid attendance data. Please check your inputs.');
//       } else if (msg.includes('unauthorized')) {
//         setError('You are not authorized to mark attendance.');
//       } else {
//         setError('Failed to save attendance. Please try again.');
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ... (generateCalendarDates, getTodayDate, useEffect for today, and TickIcon remain the same)
//   const generateCalendarDates = () => {
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     const monthIndex = months.indexOf(currentMonth);
//     const date = new Date(currentYear, monthIndex, 1);
//     const firstDayOfWeek = date.getDay();
//     const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
//     const dates = [];

//     for (let i = 0; i < firstDayOfWeek; i++) dates.push({ day: "", disabled: true });
//     for (let day = 1; day <= daysInMonth; day++) {
//       const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       dates.push({ day: day.toString(), fullDate, disabled: false });
//     }
//     while (dates.length < 42) dates.push({ day: "", disabled: true });

//     return dates;
//   };

//   const getTodayDate = () => {
//     const today = new Date();
//     return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
//   };

//   useEffect(() => {
//     const today = getTodayDate();
//     setSelectedDate(today);
//     setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
//     setCurrentYear(new Date().getFullYear());
//   }, []);

//   const TickIcon = ({ status }) => {
//     let iconColor = "text-white";

//     if (status === 'present') iconColor = "text-blue-500";
//     else if (status === 'absent') iconColor = "text-red-500";
//     else if (status === 'leave') iconColor = "text-yellow-500";

//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`h-5 w-5 ${iconColor}`}
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//       </svg>
//     );
//   };


//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <Header />

//         {/* UPDATED: Simplified header with only Class and Academic Year */}
//         <div className="mb-6 bg-white/10 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 backdrop-blur">
//           <div>
//             <label className="block text-sm mb-1 text-blue-300">Select Class</label>
//             <select
//               onChange={e => {
//                 const selected = classes.find(cls => cls._id === e.target.value);
//                 setSelectedClass(selected || null);
//               }}
//               value={selectedClass?._id || ""}
//               className="w-full p-2 bg-gray-800 rounded border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             >
//               <option value="">Select Class</option>
//               {classes.map(cls => (
//                 <option key={cls._id} value={cls._id}>{cls.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm mb-1 text-blue-300">Academic Year</label>
//             <input
//               value={academicYear}
//               type="text"
//               placeholder="2024-2025"
//               className="w-full p-2 bg-gray-800 rounded border border-white/10"
//               readOnly
//             />
//           </div>
//         </div>

//         {error && (
//             <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg flex items-center border border-red-500/30">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 {error}
//             </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Calendar section remains the same */}
//           <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-purple-300">{currentMonth} {currentYear}</h3>
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => {
//                     const months = [
//                       "January", "February", "March", "April", "May", "June",
//                       "July", "August", "September", "October", "November", "December"
//                     ];
//                     const index = months.indexOf(currentMonth);
//                     if (index === 0) {
//                       setCurrentYear(y => y - 1);
//                       setCurrentMonth("December");
//                     } else {
//                       setCurrentMonth(months[index - 1]);
//                     }
//                   }}
//                   className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>

//                 <button
//                   onClick={() => {
//                     const today = new Date();
//                     setCurrentMonth(today.toLocaleString('default', { month: 'long' }));
//                     setCurrentYear(today.getFullYear());
//                     setSelectedDate(getTodayDate());
//                   }}
//                   className="text-sm bg-purple-700 px-3 py-1 rounded hover:bg-purple-600 transition"
//                 >
//                   Today
//                 </button>

//                 <button
//                   onClick={() => {
//                     const months = [
//                       "January", "February", "March", "April", "May", "June",
//                       "July", "August", "September", "October", "November", "December"
//                     ];
//                     const index = months.indexOf(currentMonth);
//                     if (index === 11) {
//                       setCurrentYear(y => y + 1);
//                       setCurrentMonth("January");
//                     } else {
//                       setCurrentMonth(months[index + 1]);
//                     }
//                   }}
//                   className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-7 gap-1 text-sm text-center text-white/70 mb-2">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
//                 <div key={d} className="p-1 text-xs">{d}</div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1 text-center">
//               {generateCalendarDates().map((date, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => {
//                     if (!date.disabled) {
//                       setSelectedDate(date.fullDate);
//                     }
//                   }}
//                   className={`py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${date.disabled
//                     ? "text-gray-600"
//                     : selectedDate === date.fullDate
//                       ? "bg-purple-600 text-white"
//                       : "hover:bg-purple-700"
//                     }`}
//                 >
//                   {date.day}
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4 flex justify-between items-center">
//               <div className="text-sm text-gray-400">
//                 Selected: {selectedDate ? new Date(selectedDate).toLocaleDateString() : "No date selected"}
//               </div>
//             </div>
//           </div>
          
//           {loadingStudents && (
//             <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 flex flex-col items-center justify-center">
//               <span className="animate-spin text-2xl mb-2">🌀</span>
//               <p>Loading students...</p>
//             </div>
//           )}

//           {!loadingStudents && students.length > 0 && (
//             <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2">
//               {/* UPDATED: Simplified attendance list header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-lg font-semibold text-white">
//                   👥 Attendance for {selectedDate && new Date(selectedDate).toLocaleDateString()}
//                 </h3>
//                 <span className="text-sm text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
//                   {selectedClass?.name}
//                 </span>
//               </div>
              
//               {/* Student table remains the same */}
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="bg-purple-700 text-white">
//                     <tr>
//                       <th className="p-3 text-left">Student</th>
//                       <th className="p-3 text-center">Present</th>
//                       <th className="p-3 text-center">Absent</th>
//                       <th className="p-3 text-center">Leave</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {students.map(student => (
//                       <tr key={student._id} className="border-t border-white/10 hover:bg-white/10">
//                         <td className="p-3">{student.name}</td>
//                         {["present", "absent", "leave"].map(status => (
//                           <td key={status} className="p-3 text-center">
//                             <button
//                               onClick={() => handleAttendanceChange(student._id, status)}
//                               disabled={saving}
//                               className={`
//                                 w-8 h-8 rounded-full transition flex items-center justify-center 
//                                 ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
//                                 ${selectedAttendance[student._id] === status
//                                   ? status === 'present'
//                                     ? 'bg-blue-500/20 hover:bg-blue-500/30'
//                                     : status === 'absent'
//                                       ? 'bg-red-500/20 hover:bg-red-500/30'
//                                       : 'bg-yellow-500/20 hover:bg-yellow-500/30'
//                                   : 'bg-gray-700 hover:bg-gray-600'
//                                 }`
//                               }
//                             >
//                               {saving ? (
//                                 <span className="animate-spin">🌀</span>
//                               ) : selectedAttendance[student._id] === status && (
//                                 <TickIcon status={status} />
//                               )}
//                             </button>
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* ... (Rest of the conditional rendering remains the same) ... */}
//           {!loadingStudents && selectedClass && students.length === 0 && (
//             <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 flex flex-col items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//               </svg>
//               <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
//               <p className="text-gray-400 text-center">
//                 No students registered in {selectedClass?.name} class.
//               </p>
//             </div>
//           )}
//         </div>

//         {!selectedClass && (
//           <div className="bg-blue-900/30 p-6 rounded-xl text-center border border-blue-500/30">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//             </svg>
//             <h3 className="text-xl font-semibold mb-2">Welcome to Attendance Portal</h3>
//             <p className="text-gray-300">
//               Please select a class to begin marking attendance.
//               Choose a date on the calendar and select students' attendance status.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherAttendance;













import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import axios from 'axios';

axios.defaults.withCredentials = true;

const TeacherAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [academicYear, setAcademicYear] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAttendance, setSelectedAttendance] = useState({});
  const [currentMonth, setCurrentMonth] = useState("July");
  const [currentYear, setCurrentYear] = useState(2025);
  const [saving, setSaving] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState(null);
  // Subject state is no longer needed

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/classes`,
          { withCredentials: true }
        );
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching classes:', err.response?.data || err.message);
        setError('Failed to load classes');
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const academicYear = month < 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
      setAcademicYear(academicYear);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedClass && selectedDate && academicYear) {
      fetchStudentsByClass();
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedDate, academicYear]);

  const fetchStudentsByClass = async () => {
    try {
      setLoadingStudents(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${selectedClass.name}`,
        { withCredentials: true }
      );
      setStudents(Array.isArray(res.data) ? res.data : []);
      setSelectedAttendance({});
    } catch (err) {
      console.error('Error fetching students:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Error fetching students.');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleAttendanceChange = async (studentId, status) => {
    const updated = { ...selectedAttendance, [studentId]: status };
    setSelectedAttendance(updated);

    try {
      setSaving(true);
      setError(null);
      const payload = {
        studentId,
        classId: selectedClass._id,
        date: selectedDate,
        status: status,
        academicYear,
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/attendance/mark`,
        payload,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to mark attendance:", error.response?.data || error.message);
      setError('Failed to save attendance. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    setSelectedDate(getTodayDate());
    setCurrentMonth(new Date().toLocaleString('default', { month: 'long' }));
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  // (generateCalendarDates and TickIcon functions remain the same)
  const generateCalendarDates = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = months.indexOf(currentMonth);
    const date = new Date(currentYear, monthIndex, 1);
    const firstDayOfWeek = date.getDay();
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
    const dates = [];

    for (let i = 0; i < firstDayOfWeek; i++) dates.push({ day: "", disabled: true });
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      dates.push({ day: day.toString(), fullDate, disabled: false });
    }
    while (dates.length < 42) dates.push({ day: "", disabled: true });

    return dates;
  };
  const TickIcon = ({ status }) => {
    let iconColor = "text-white";

    if (status === 'present') iconColor = "text-blue-500";
    else if (status === 'absent') iconColor = "text-red-500";
    else if (status === 'leave') iconColor = "text-yellow-500";

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${iconColor}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />
      <div className="flex-1 p-6">
        <Header />

        <div className="mb-6 bg-white/10 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 backdrop-blur">
          <div>
            <label className="block text-sm mb-1 text-blue-300">Select Class</label>
            <select
              onChange={e => {
                const selected = classes.find(cls => cls._id === e.target.value);
                setSelectedClass(selected || null);
              }}
              value={selectedClass?._id || ""}
              className="w-full p-2 bg-gray-800 rounded border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Class</option>
              {classes.map(cls => (
                <option key={cls._id} value={cls._id}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 text-blue-300">Academic Year</label>
            <input
              value={academicYear}
              type="text"
              className="w-full p-2 bg-gray-800 rounded border border-white/10"
              readOnly
            />
          </div>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg flex items-center border border-red-500/30">
                <p>{error}</p>
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md w-full lg:w-1/2 mb-6">
             {/* Calendar JSX is unchanged */}
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-300">{currentMonth} {currentYear}</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    const index = months.indexOf(currentMonth);
                    if (index === 0) {
                      setCurrentYear(y => y - 1);
                      setCurrentMonth("December");
                    } else {
                      setCurrentMonth(months[index - 1]);
                    }
                  }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={() => {
                    const today = new Date();
                    setCurrentMonth(today.toLocaleString('default', { month: 'long' }));
                    setCurrentYear(today.getFullYear());
                    setSelectedDate(getTodayDate());
                  }}
                  className="text-sm bg-purple-700 px-3 py-1 rounded hover:bg-purple-600 transition"
                >
                  Today
                </button>

                <button
                  onClick={() => {
                    const months = [
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ];
                    const index = months.indexOf(currentMonth);
                    if (index === 11) {
                      setCurrentYear(y => y + 1);
                      setCurrentMonth("January");
                    } else {
                      setCurrentMonth(months[index + 1]);
                    }
                  }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-purple-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-sm text-center text-white/70 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="p-1 text-xs">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {generateCalendarDates().map((date, idx) => (
                <div
                  key={idx}
                  onClick={() => !date.disabled && setSelectedDate(date.fullDate)}
                  className={`py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${date.disabled ? "text-gray-600" : selectedDate === date.fullDate ? "bg-purple-600 text-white" : "hover:bg-purple-700"}`}
                >
                  {date.day}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-400">
                Selected: {selectedDate ? new Date(selectedDate).toLocaleDateString() : "No date selected"}
            </div>
          </div>
          
          {loadingStudents ? (
            <div className="bg-white/5 p-6 rounded-xl w-full lg:w-1/2 flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : students.length > 0 ? (
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-full lg:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Attendance for {selectedDate && new Date(selectedDate).toLocaleDateString()}</h3>
                <span className="text-sm text-blue-300 bg-blue-900/30 px-2 py-1 rounded">{selectedClass?.name}</span>
              </div>
              <div className="overflow-x-auto">
                 {/* Student table JSX is unchanged */}
                 <table className="w-full text-sm">
                  <thead className="bg-purple-700 text-white">
                    <tr>
                      <th className="p-3 text-left">Student</th>
                      <th className="p-3 text-center">Present</th>
                      <th className="p-3 text-center">Absent</th>
                      <th className="p-3 text-center">Leave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student._id} className="border-t border-white/10 hover:bg-white/10">
                        <td className="p-3">{student.name}</td>
                        {["present", "absent", "leave"].map(status => (
                          <td key={status} className="p-3 text-center">
                            <button
                              onClick={() => handleAttendanceChange(student._id, status)}
                              disabled={saving}
                              className={`w-8 h-8 rounded-full transition flex items-center justify-center ${saving ? "opacity-50" : ""} ${selectedAttendance[student._id] === status ? (status === 'present' ? 'bg-blue-500/20' : status === 'absent' ? 'bg-red-500/20' : 'bg-yellow-500/20') : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                              {selectedAttendance[student._id] === status && <TickIcon status={status} />}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : selectedClass && (
            <div className="bg-white/5 p-6 rounded-xl w-full lg:w-1/2 flex flex-col items-center justify-center">
               <h3 className="text-lg font-semibold">No Students Found</h3>
               <p className="text-gray-400">No students are registered in {selectedClass?.name}.</p>
            </div>
          )}
        </div>

        {!selectedClass && (
          <div className="bg-blue-900/30 p-6 rounded-xl text-center border border-blue-500/30 mt-6">
            <h3 className="text-xl font-semibold mb-2">Welcome to the Attendance Portal</h3>
            <p className="text-gray-300">Please select a class to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendance;