// // import React, { useState, useEffect } from "react";
// // import Sidebar from '../../components/Sidebar';
// // import Header from '../../components/Header';
// // import axios from "axios";

// // const TeacherAddMarks = () => {
// //   const [teams] = useState(["1st Team", "2nd Team", "3rd Team"]);
// //   const [selectedTeam, setSelectedTeam] = useState("");
// //   const [classes, setClasses] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState("");
// //   const [subjects, setSubjects] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [marks, setMarks] = useState({});
// //   const [totalMarks, setTotalMarks] = useState(100);
// //   const [message, setMessage] = useState("");

// //   useEffect(() => {
// //     axios.get("/api/classes").then((res) => setClasses(res.data));
// //   }, []);

// //   useEffect(() => {
// //     if (selectedClass) {
// //       axios.get(`/api/classes/subjects/${selectedClass}`)
// //         .then((res) => setSubjects(res.data))
// //         .catch(() => setSubjects([]));

// //       axios.get(`/api/students/by-class-name/${selectedClass}`)
// //         .then((res) => setStudents(res.data))
// //         .catch(() => setStudents([]));
// //     }
// //   }, [selectedClass]);

// //   const handleChange = (studentId, subject, value) => {
// //     setMarks((prev) => ({
// //       ...prev,
// //       [studentId]: {
// //         ...(prev[studentId] || {}),
// //         [subject]: value,
// //       },
// //     }));
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       const studentMarks = students.map((student) => {
// //         const studentMarkObj = marks[student._id] || {};
// //         const obtainedTotal = subjects.reduce(
// //           (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
// //           0
// //         );
// //         return {
// //           studentId: student._id,
// //           marksPerSubject: studentMarkObj,
// //           totalObtained: obtainedTotal,
// //           percentage: ((obtainedTotal / (totalMarks * subjects.length)) * 100).toFixed(2),
// //         };
// //       });

// //       const payload = {
// //         className: selectedClass,
// //         team: selectedTeam,
// //         totalMarksPerSubject: totalMarks,
// //         subjects,
// //         studentMarks,
// //       };

// //       await axios.post("/api/marks/multiple-subjects", payload, { withCredentials: true });
// //       setMessage("✅ Marks submitted successfully!");
// //     } catch (err) {
// //       setMessage("❌ Error submitting marks.");
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
// //       <Sidebar role="teacher" />
// //       <div className="flex-1 p-6">
// //         <Header />

// //         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-lg max-w-6xl mx-auto">
// //           <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
// //             📊 Add Marks for All Subjects
// //           </h2>

// //           <div className="grid md:grid-cols-4 gap-4 mb-8">
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-300">Team</label>
// //               <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}
// //                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600">
// //                 <option value="">Select Team</option>
// //                 {teams.map((team) => <option key={team} value={team}>{team}</option>)}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm mb-1 text-gray-300">Class</label>
// //               <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
// //                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600">
// //                 <option value="">Select Class</option>
// //                 {classes.map((cls) => (
// //                   <option key={cls._id} value={cls.name}>{cls.name}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm mb-1 text-gray-300">Total Marks (Per Subject)</label>
// //               <input type="number" value={totalMarks}
// //                 onChange={(e) => setTotalMarks(e.target.value)}
// //                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600" />
// //             </div>
// //           </div>

// //           {students.length > 0 && subjects.length > 0 && (
// //             <div className="overflow-auto rounded-lg border border-white/10">
// //               <table className="w-full text-sm text-left text-gray-300">
// //                 <thead className="bg-gray-800 text-white text-sm">
// //                   <tr>
// //                     <th className="p-3">Roll No</th>
// //                     <th className="p-3">Name</th>
// //                     {subjects.map((subject) => (
// //                       <th key={subject} className="p-3">{subject}</th>
// //                     ))}
// //                     <th className="p-3">%</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-gray-900">
// //                   {students.map((student) => {
// //                     const studentMarkObj = marks[student._id] || {};
// //                     const obtained = subjects.reduce(
// //                       (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
// //                       0
// //                     );
// //                     const percent = subjects.length
// //                       ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
// //                       : 0;

// //                     return (
// //                       <tr key={student._id} className="border-b border-white/10">
// //                         <td className="p-3">{student.rollNo}</td>
// //                         <td className="p-3">{student.name}</td>
// //                         {subjects.map((sub) => (
// //                           <td key={sub} className="p-3">
// //                             <input
// //                               type="number"
// //                               value={studentMarkObj[sub] || ""}
// //                               onChange={(e) => handleChange(student._id, sub, e.target.value)}
// //                               className="w-20 p-1 rounded bg-gray-700 text-white border border-gray-600"
// //                             />
// //                           </td>
// //                         ))}
// //                         <td className="p-3">{percent}%</td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}

// //           <div className="mt-6 flex items-center justify-between">
// //             <button
// //               onClick={handleSubmit}
// //               className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition"
// //             >
// //               Save Marks
// //             </button>
// //             {message && <p className="text-yellow-400 text-sm">{message}</p>}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TeacherAddMarks;


// import React, { useState, useEffect } from "react";
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const TeacherAddMarks = () => {
//   const [teams] = useState(["1st Team", "2nd Team", "3rd Team"]);
//   const [selectedTeam, setSelectedTeam] = useState("");
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedClassId, setSelectedClassId] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [marks, setMarks] = useState({});
//   const [totalMarks, setTotalMarks] = useState(100);
//   const [loading, setLoading] = useState(false);
//   const [existingRecords, setExistingRecords] = useState({});

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { 
//       withCredentials: true 
//     }).then((res) => setClasses(res.data));
//   }, []);

//   useEffect(() => {
//     if (selectedClassId) {
//       // Fetch subjects by class ID
//       axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClassId}/subjects`, { 
//         withCredentials: true 
//       })
//         .then((res) => setSubjects(res.data))
//         .catch(() => setSubjects([]));

//       // Fetch students by class ID
//       axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/students/class/${selectedClassId}`, { 
//         withCredentials: true 
//       })
//         .then((res) => setStudents(res.data))
//         .catch(() => setStudents([]));
//     }
//   }, [selectedClassId]);

//   useEffect(() => {
//     const fetchExistingMarks = async () => {
//       if (selectedClass && selectedTeam) {
//         try {
//           const res = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/api/marks/${selectedClass}/${selectedTeam}`, 
//             { withCredentials: true }
//           );
          
//           const records = {};
//           res.data.forEach(record => {
//             records[record.student] = record;
//           });
          
//           setExistingRecords(records);
//         } catch (err) {
//           console.error("Error fetching existing marks", err);
//           setExistingRecords({});
//         }
//       }
//     };
    
//     fetchExistingMarks();
//   }, [selectedClass, selectedTeam]);

//   const handleChange = (studentId, subject, value) => {
//     setMarks((prev) => ({
//       ...prev,
//       [studentId]: {
//         ...(prev[studentId] || {}),
//         [subject]: value,
//       },
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedTeam || !selectedClass || !subjects.length) {
//       toast.error("Please select a team, class, and ensure subjects are available");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       const studentMarks = students.map((student) => {
//         const studentMarkObj = marks[student._id] || {};
//         const obtainedTotal = subjects.reduce(
//           (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
//           0
//         );
//         return {
//           studentId: student._id,
//           marksPerSubject: studentMarkObj,
//           totalObtained: obtainedTotal,
//           percentage: ((obtainedTotal / (totalMarks * subjects.length)) * 100).toFixed(2),
//         };
//       });

//       const payload = {
//         className: selectedClass,
//         classId: selectedClassId,
//         team: selectedTeam,
//         totalMarksPerSubject: totalMarks,
//         subjects,
//         studentMarks,
//       };

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/marks/multiple-subjects`, 
//         payload, 
//         { withCredentials: true }
//       );
      
//       toast.success("✅ Marks submitted successfully!");
//     } catch (err) {
//       toast.error("❌ Error submitting marks. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getExistingMark = (studentId, subject) => {
//     if (existingRecords[studentId] && existingRecords[studentId].marksPerSubject) {
//       return existingRecords[studentId].marksPerSubject[subject] || "";
//     }
//     return "";
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />
//       <div className="flex-1 p-6">
//         <Header />
//         <ToastContainer position="bottom-right" theme="dark" />

//         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-lg max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
//             📊 Add/Update Student Marks
//           </h2>
          
//           <div className="bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-500/30">
//             <div className="flex items-start">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <h3 className="font-semibold text-blue-300">Important Note</h3>
//                 <p className="text-sm text-blue-200">
//                   Entering marks for a student in the same class and team will replace their previous marks.
//                   Green inputs indicate existing marks that can be updated.
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-4 gap-4 mb-8">
//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Team</label>
//               <select 
//                 value={selectedTeam} 
//                 onChange={(e) => setSelectedTeam(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select Team</option>
//                 {teams.map((team) => <option key={team} value={team}>{team}</option>)}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Class</label>
//               <select 
//                 value={selectedClass} 
//                 onChange={(e) => {
//                   const selected = e.target.value;
//                   const cls = classes.find(c => c.name === selected);
//                   setSelectedClass(selected);
//                   setSelectedClassId(cls?._id || "");
//                 }}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls._id} value={cls.name}>{cls.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Total Marks (Per Subject)</label>
//               <input 
//                 type="number" 
//                 value={totalMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//               />
//             </div>
//           </div>

//           {students.length > 0 && subjects.length > 0 && (
//             <div className="overflow-auto rounded-lg border border-white/10 shadow-inner">
//               <table className="w-full text-sm text-left text-gray-300">
//                 <thead className="bg-gray-800 text-white text-sm sticky top-0">
//                   <tr>
//                     <th className="p-3">Roll No</th>
//                     <th className="p-3">Name</th>
//                     {subjects.map((subject) => (
//                       <th key={subject} className="p-3">{subject}</th>
//                     ))}
//                     <th className="p-3">%</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-gray-900 divide-y divide-gray-800">
//                   {students.map((student) => {
//                     const studentMarkObj = marks[student._id] || {};
//                     const obtained = subjects.reduce(
//                       (sum, sub) => sum + (parseFloat(studentMarkObj[sub]) || 0),
//                       0
//                     );
//                     const percent = subjects.length
//                       ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
//                       : 0;

//                     const hasExistingMarks = existingRecords[student._id];

//                     return (
//                       <tr key={student._id} className="hover:bg-gray-800/50">
//                         <td className="p-3 font-medium">{student.rollNo}</td>
//                         <td className="p-3 font-medium">{student.name}</td>
//                         {subjects.map((sub) => {
//                           const existingValue = getExistingMark(student._id, sub);
//                           const hasExistingValue = existingValue !== "";
//                           const value = studentMarkObj[sub] || existingValue;
                          
//                           return (
//                             <td key={sub} className="p-3">
//                               <input
//                                 type="number"
//                                 value={value}
//                                 onChange={(e) => handleChange(student._id, sub, e.target.value)}
//                                 className={`w-full p-1 rounded border ${
//                                   hasExistingValue 
//                                     ? "bg-green-900/30 border-green-700 focus:ring-green-500" 
//                                     : "bg-gray-800 border-gray-700 focus:ring-blue-500"
//                                 } focus:ring-2 focus:border-transparent`}
//                               />
//                               {hasExistingValue && !studentMarkObj[sub] && (
//                                 <div className="text-xs text-green-500 mt-1">Existing: {existingValue}</div>
//                               )}
//                             </td>
//                           );
//                         })}
//                         <td className="p-3">
//                           <div className={`font-bold ${
//                             percent >= 80 ? 'text-green-400' :
//                             percent >= 60 ? 'text-yellow-400' : 'text-red-400'
//                           }`}>
//                             {percent}%
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           <div className="mt-6 flex items-center justify-between">
//             <button
//               onClick={handleSubmit}
//               disabled={loading || !selectedTeam || !selectedClass}
//               className={`px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-semibold rounded-lg transition-all shadow-lg flex items-center ${
//                 loading ? "opacity-70 cursor-not-allowed" : "hover:from-green-500 hover:to-emerald-500"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Saving...
//                 </>
//               ) : (
//                 "Save Marks"
//               )}
//             </button>
            
//             <div className="text-sm text-gray-400">
//               {selectedTeam && selectedClass && (
//                 <span>
//                   {Object.keys(existingRecords).length} students already have marks for {selectedClass} - {selectedTeam}
//                 </span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherAddMarks;


// /*  src/pages/teacher/TeacherAddMarks.jsx
//     COMPLETE FILE WITH ALL FIXES  – ready to copy-paste
// -------------------------------------------------------------------- */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Sidebar from "../../components/Sidebar";
// import Header   from "../../components/Header";

// /* ------------------------------------------------------------------ */
// /*  🔧 utility — strip the “Class ” prefix so requests match backend  */
// const normalizeClassName = (className = "") => className.replace(/^Class\s*/i, "");
// /* ------------------------------------------------------------------ */

// const TeacherAddMarks = () => {
//   /* ---------- state ------------------------------------------------ */
//   const [teams]            = useState(["1st Team", "2nd Team", "3rd Team"]);
//   const [selectedTeam,  setSelectedTeam ] = useState("");

//   const [classes,       setClasses       ] = useState([]);
//   const [selectedClass, setSelectedClass ] = useState("");      // class NAME
//   const [selectedClassId,setSelectedClassId] = useState("");    // class ID

//   const [subjects,      setSubjects      ] = useState([]);
//   const [students,      setStudents      ] = useState([]);

//   const [marks,         setMarks         ] = useState({});      // entered marks
//   const [totalMarks,    setTotalMarks    ] = useState(100);

//   const [loading,       setLoading       ] = useState(false);

//   const [existingRecords,setExistingRecords] = useState({});    // marks already saved
//   /* ------------------------------------------------------------------ */

//   /* 🌐 1. load all classes once */
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { withCredentials: true })
//       .then((res) => setClasses(res.data))
//       .catch((err) => console.error("Fetch classes error:", err));
//   }, []);

//   /* 🌐 2. when classId changes ⇒ fetch SUBJECTS + STUDENTS */
//   useEffect(() => {
//     if (!selectedClassId) return;

//     // Subjects of class
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClassId}/subjects`,
//            { withCredentials: true })
//       .then((res) => setSubjects(res.data))
//       .catch(() => setSubjects([]));

//     // Students of class
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/students/class/${selectedClassId}`,
//            { withCredentials: true })
//       .then((res) => setStudents(res.data))
//       .catch(() => setStudents([]));
//   }, [selectedClassId]);

//   /* 🌐 3. when class NAME and team change ⇒ fetch existing marks */
//   useEffect(() => {
//     if (!selectedClass || !selectedTeam) return;

//     const fetchExisting = async () => {
//       try {
//         const url = `${import.meta.env.VITE_BACKEND_URL}/api/marks/${encodeURIComponent(selectedClass)}/${encodeURIComponent(selectedTeam)}`;
//         const res = await axios.get(url, { withCredentials: true });

//         /*  transform returned list into { studentId : markDoc } */
//         const map = {};
//         res.data.forEach((doc) => { map[doc.student] = doc; });
//         setExistingRecords(map);
//       } catch (err) {
//         console.error("Fetch existing marks error:", err);
//         setExistingRecords({});
//       }
//     };

//     fetchExisting();
//   }, [selectedClass, selectedTeam]);

//   /* ----- handlers -------------------------------------------------- */
//   const handleMarkChange = (stuId, subject, value) => {
//     setMarks((prev) => ({
//       ...prev,
//       [stuId]: { ...(prev[stuId] || {}), [subject]: value },
//     }));
//   };

//   const handleSave = async () => {
//     if (!selectedTeam || !selectedClass || !subjects.length) {
//       toast.error("Select team & class and ensure subjects are available");
//       return;
//     }

//     try {
//       setLoading(true);

//       /* payload for every student */
//       const studentMarks = students.map((stu) => {
//         const entered = marks[stu._id] || {};
//         const obtained = subjects.reduce(
//           (sum, sub) => sum + (parseFloat(entered[sub]) || 0),
//           0
//         );
//         return {
//           studentId: stu._id,
//           marksPerSubject: entered,
//           totalObtained: obtained,
//           percentage: ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2),
//         };
//       });

//       await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/marks/multiple-subjects`,
//         {
//           className: selectedClass,
//           classId: selectedClassId,
//           team: selectedTeam,
//           totalMarksPerSubject: totalMarks,
//           subjects,
//           studentMarks,
//         },
//         { withCredentials: true }
//       );

//       toast.success("✅ Marks saved successfully");
//       setMarks({}); // clear local form
//     } catch (err) {
//       toast.error("❌ Failed to save marks");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getExistingMark = (stuId, subject) =>
//     existingRecords[stuId]?.marksPerSubject?.[subject] ?? "";

//   /* ---------- JSX -------------------------------------------------- */
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       <Sidebar role="teacher" />

//       <div className="flex-1 p-6">
//         <Header />
//         <ToastContainer position="bottom-right" theme="dark" />

//         <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-lg max-w-6xl mx-auto">
//           <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
//             📊 Add / Update Student Marks
//           </h2>

//           {/* ---- selection row ------------------------------------- */}
//           <div className="grid md:grid-cols-4 gap-4 mb-8">

//             {/* Team select */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Team</label>
//               <select
//                 value={selectedTeam}
//                 onChange={(e) => setSelectedTeam(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Team</option>
//                 {teams.map((team) => <option key={team} value={team}>{team}</option>)}
//               </select>
//             </div>

//             {/* Class select */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Class</label>
//               <select
//                 value={selectedClass}
//                 onChange={(e) => {
//                   const name = e.target.value;
//                   const cls  = classes.find(c => c.name === name);
//                   setSelectedClass(name);
//                   setSelectedClassId(cls?._id || "");
//                 }}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls._id} value={cls.name}>{cls.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Total Marks per subject */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-300">Total Marks (Per Subject)</label>
//               <input
//                 type="number"
//                 value={totalMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           {/* -------- table of students / subjects ------------------ */}
//           {students.length > 0 && subjects.length > 0 ? (
//             <div className="overflow-auto rounded-lg border border-white/10 shadow-inner">
//               <table className="w-full text-sm text-left text-gray-300">
//                 <thead className="bg-gray-800 sticky top-0 text-white">
//                   <tr>
//                     <th className="p-3">Roll No</th>
//                     <th className="p-3">Name</th>
//                     {subjects.map(sub => <th key={sub} className="p-3">{sub}</th>)}
//                     <th className="p-3">%</th>
//                   </tr>
//                 </thead>

//                 <tbody className="bg-gray-900 divide-y divide-gray-800">
//                   {students.map((stu) => {
//                     const entered = marks[stu._id] || {};
//                     const obtained = subjects.reduce(
//                       (sum, sub) => sum + (parseFloat(entered[sub]) || 0), 0
//                     );
//                     const percent = subjects.length
//                       ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
//                       : 0;

//                     return (
//                       <tr key={stu._id} className="hover:bg-gray-800/50">
//                         <td className="p-3 font-medium">{stu.rollNo}</td>
//                         <td className="p-3 font-medium">{stu.name}</td>

//                         {subjects.map((sub) => {
//                           const existing = getExistingMark(stu._id, sub);
//                           const value = entered[sub] ?? existing;

//                           const hasExisting = existing !== "";
//                           return (
//                             <td key={sub} className="p-3">
//                               <input
//                                 type="number"
//                                 value={value}
//                                 onChange={(e) =>
//                                   handleMarkChange(stu._id, sub, e.target.value)
//                                 }
//                                 className={`w-full p-1 rounded border
//                                   ${hasExisting
//                                     ? "bg-green-900/30 border-green-700 focus:ring-green-500"
//                                     : "bg-gray-800 border-gray-700 focus:ring-blue-500"
//                                   } focus:ring-2 focus:border-transparent`}
//                               />
//                               {hasExisting && !entered[sub] && (
//                                 <div className="text-xs text-green-500 mt-1">
//                                   Existing: {existing}
//                                 </div>
//                               )}
//                             </td>
//                           );
//                         })}

//                         <td className="p-3">
//                           <span className={`font-bold ${
//                             percent >= 80 ? "text-green-400":
//                             percent >= 60 ? "text-yellow-400":"text-red-400"
//                           }`}>{percent}%</span>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-center text-gray-400 mt-8">
//               {selectedClassId
//                 ? "No students or subjects found for this class."
//                 : "Select a class to load students and subjects."}
//             </p>
//           )}

//           {/* ------------ Save button ------------------------------- */}
//           <div className="mt-6 flex items-center justify-between">
//             <button
//               onClick={handleSave}
//               disabled={loading || !selectedTeam || !selectedClassId}
//               className={`px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-semibold rounded-lg shadow-lg
//                 ${loading ? "opacity-60 cursor-not-allowed" : "hover:from-green-500 hover:to-emerald-500"}`}
//             >
//               {loading ? "Saving…" : "Save Marks"}
//             </button>

//             <div className="text-sm text-gray-400">
//               {selectedTeam && selectedClass &&
//                 `${Object.keys(existingRecords).length} students already have marks for ${selectedClass} • ${selectedTeam}`}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherAddMarks;















/* src/pages/teacher/TeacherAddMarks.jsx
    COMPLETE FILE WITH THE FIX
-------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const TeacherAddMarks = () => {
  /* ---------- state ------------------------------------------------ */
  const [teams] = useState(["1st Team", "2nd Team", "3rd Team"]);
  const [selectedTeam, setSelectedTeam] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(""); // class NAME
  const [selectedClassId, setSelectedClassId] = useState(""); // class ID

  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [marks, setMarks] = useState({}); // entered marks
  const [totalMarks, setTotalMarks] = useState(100);

  const [loading, setLoading] = useState(false);

  const [existingRecords, setExistingRecords] = useState({}); // marks already saved
  /* ------------------------------------------------------------------ */

  /* 🌐 1. load all classes once */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, { withCredentials: true })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error("Fetch classes error:", err));
  }, []);

  /* 🌐 2. when class NAME or ID changes ⇒ fetch SUBJECTS + STUDENTS */
  useEffect(() => {
    // We need both the ID (for subjects) and Name (for students)
    if (!selectedClassId || !selectedClass) {
        setSubjects([]);
        setStudents([]);
        return;
    };

    // --- Fetch Subjects using Class ID ---
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/classes/${selectedClassId}/subjects`, {
        withCredentials: true,
      })
      .then((res) => setSubjects(res.data))
      .catch(() => setSubjects([]));

    // --- ✅ FIX: Fetch Students using Class NAME from the correct endpoint ---
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${encodeURIComponent(selectedClass)}`,
        { withCredentials: true }
      )
      .then((res) => setStudents(res.data))
      .catch(() => setStudents([]));

  }, [selectedClassId, selectedClass]); // Dependency array updated

  /* 🌐 3. when class NAME and team change ⇒ fetch existing marks */
  useEffect(() => {
    if (!selectedClass || !selectedTeam) return;

    const fetchExisting = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/marks/${encodeURIComponent(
          selectedClass
        )}/${encodeURIComponent(selectedTeam)}`;
        const res = await axios.get(url, { withCredentials: true });

        /* transform returned list into { studentId : markDoc } */
        const map = {};
        res.data.forEach((doc) => {
          map[doc.student] = doc;
        });
        setExistingRecords(map);
      } catch (err) {
        console.error("Fetch existing marks error:", err);
        setExistingRecords({});
      }
    };

    fetchExisting();
  }, [selectedClass, selectedTeam]);

  /* ----- handlers -------------------------------------------------- */
  const handleMarkChange = (stuId, subject, value) => {
    setMarks((prev) => ({
      ...prev,
      [stuId]: { ...(prev[stuId] || {}), [subject]: value },
    }));
  };

  const handleSave = async () => {
    if (!selectedTeam || !selectedClass || !subjects.length) {
      toast.error("Select team & class and ensure subjects are available");
      return;
    }

    try {
      setLoading(true);

      /* payload for every student */
      const studentMarks = students.map((stu) => {
        const entered = marks[stu._id] || {};
        const obtained = subjects.reduce(
          (sum, sub) => sum + (parseFloat(entered[sub]) || 0),
          0
        );
        return {
          studentId: stu._id,
          marksPerSubject: entered,
          totalObtained: obtained,
          percentage: ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2),
        };
      });

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/marks/multiple-subjects`,
        {
          className: selectedClass,
          classId: selectedClassId,
          team: selectedTeam,
          totalMarksPerSubject: totalMarks,
          subjects,
          studentMarks,
        },
        { withCredentials: true }
      );

      toast.success("✅ Marks saved successfully");
      setMarks({}); // clear local form
    } catch (err) {
      toast.error("❌ Failed to save marks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getExistingMark = (stuId, subject) =>
    existingRecords[stuId]?.marksPerSubject?.[subject] ?? "";

  /* ---------- JSX -------------------------------------------------- */
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Sidebar role="teacher" />

      <div className="flex-1 p-6">
        <Header />
        <ToastContainer position="bottom-right" theme="dark" />

        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg backdrop-blur-lg max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 border-b border-white/10 pb-2">
            📊 Add / Update Student Marks
          </h2>

          {/* ---- selection row ------------------------------------- */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {/* Team select */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Team</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Team</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Class select */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  const name = e.target.value;
                  const cls = classes.find((c) => c.name === name);
                  setSelectedClass(name);
                  setSelectedClassId(cls?._id || "");
                }}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Marks per subject */}
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Total Marks (Per Subject)
              </label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* -------- table of students / subjects ------------------ */}
          {students.length > 0 && subjects.length > 0 ? (
            <div className="overflow-auto rounded-lg border border-white/10 shadow-inner">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="bg-gray-800 sticky top-0 text-white">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Name</th>
                    {subjects.map((sub) => (
                      <th key={sub} className="p-3">
                        {sub}
                      </th>
                    ))}
                    <th className="p-3">%</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {students.map((stu) => {
                    const entered = marks[stu._id] || {};
                    const obtained = subjects.reduce(
                      (sum, sub) => sum + (parseFloat(entered[sub]) || 0),
                      0
                    );
                    const percent = subjects.length
                      ? ((obtained / (totalMarks * subjects.length)) * 100).toFixed(2)
                      : 0;

                    return (
                      <tr key={stu._id} className="hover:bg-gray-800/50">
                        <td className="p-3 font-medium">{stu.rollNo}</td>
                        <td className="p-3 font-medium">{stu.name}</td>

                        {subjects.map((sub) => {
                          const existing = getExistingMark(stu._id, sub);
                          const value = entered[sub] ?? existing;

                          const hasExisting = existing !== "";
                          return (
                            <td key={sub} className="p-3">
                              <input
                                type="number"
                                value={value}
                                onChange={(e) =>
                                  handleMarkChange(stu._id, sub, e.target.value)
                                }
                                className={`w-full p-1 rounded border
                                  ${
                                    hasExisting
                                      ? "bg-green-900/30 border-green-700 focus:ring-green-500"
                                      : "bg-gray-800 border-gray-700 focus:ring-blue-500"
                                  } focus:ring-2 focus:border-transparent`}
                              />
                              {hasExisting && !entered[sub] && (
                                <div className="text-xs text-green-500 mt-1">
                                  Existing: {existing}
                                </div>
                              )}
                            </td>
                          );
                        })}

                        <td className="p-3">
                          <span
                            className={`font-bold ${
                              percent >= 80
                                ? "text-green-400"
                                : percent >= 60
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {percent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-8">
              {selectedClassId
                ? "No students or subjects found for this class."
                : "Select a class to load students and subjects."}
            </p>
          )}

          {/* ------------ Save button ------------------------------- */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={handleSave}
              disabled={loading || !selectedTeam || !selectedClassId}
              className={`px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-semibold rounded-lg shadow-lg
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-green-500 hover:to-emerald-500"
                }`}
            >
              {loading ? "Saving…" : "Save Marks"}
            </button>

            <div className="text-sm text-gray-400">
              {selectedTeam &&
                selectedClass &&
                `${
                  Object.keys(existingRecords).length
                } students already have marks for ${selectedClass} • ${selectedTeam}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAddMarks;