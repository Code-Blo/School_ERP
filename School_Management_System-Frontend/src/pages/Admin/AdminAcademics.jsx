
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Sidebar from '../../components/Sidebar';
// // import Header from '../../components/Header';
// // import { FaDownload, FaTrash, FaTimes, FaEdit } from 'react-icons/fa';

// // const AdminAcademics = () => {
// //   // Syllabus state
// //   const [syllabusFile, setSyllabusFile] = useState(null);
// //   const [activeSyllabusClass, setActiveSyllabusClass] = useState('');

// //   // Timetable state
// //   const [newTimetableEntries, setNewTimetableEntries] = useState(
// //     ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({
// //       day,
// //       periods: Array(6).fill(''),
// //     }))
// //   );
// //   const [activeTimetableClass, setActiveTimetableClass] = useState('');

// //   // Results state
// //   const [classOptions, setClassOptions] = useState([]);
// //   const [selectedClass, setSelectedClass] = useState('');
// //   const [activeTab, setActiveTab] = useState('syllabus');
// //   const [students, setStudents] = useState([]);
// //   const [newResults, setNewResults] = useState({});

// //   // Modal states
// //   const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
// //   const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);

// //   // All syllabus and timetables state
// //   const [allSyllabus, setAllSyllabus] = useState([]);
// //   const [allTimetables, setAllTimetables] = useState([]);

// //   // Normalize class name helper
// //   const normalizeClassName = (className) => className.replace(/^Class\s*/i, '');

// //   // Fetch classes, syllabus, and timetables on mount
// //   useEffect(() => {
// //     const fetchClasses = async () => {
// //       try {
// //         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
// //           withCredentials: true,
// //         });
// //         const classNames = response.data.map(cls => cls.name);
// //         setClassOptions(classNames);
// //         if (classNames.length > 0) setSelectedClass(classNames[0]);
// //       } catch (error) {
// //         console.error("Failed to fetch class list", error);
// //       }
// //     };

// //     const fetchAllSyllabus = async () => {
// //       try {
// //         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/admin/all`, {
// //           withCredentials: true,
// //         });
// //         setAllSyllabus(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch syllabus", error);
// //       }
// //     };

// //     const fetchAllTimetables = async () => {
// //       try {
// //         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/admin/all`, {
// //           withCredentials: true,
// //         });
// //         setAllTimetables(response.data);
// //       } catch (error) {
// //         console.error("Failed to fetch timetables", error);
// //       }
// //     };

// //     fetchClasses();
// //     fetchAllSyllabus();
// //     fetchAllTimetables();
// //   }, []);

// //   // Fetch students for selected class
// //   // useEffect(() => {
// //   //   if (!selectedClass) return;
// //   //   const fetchData = async () => {
// //   //     try {
// //   //       const studentsRes = await axios.get(
// //   //         `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${normalizeClassName(selectedClass)}`,
// //   //         { withCredentials: true }
// //   //       );
// //   //       setStudents(studentsRes.data);
// //   //     } catch (err) {
// //   //       console.error("Fetch data error", err);
// //   //     }
// //   //   };
// //   //   fetchData();
// //   // }, [selectedClass]);

// //   useEffect(() => {
// //     if (!selectedClass || selectedClass.trim() === '') return;

// //     const fetchData = async () => {
// //       try {
// //         const cleanClass = normalizeClassName(selectedClass); // Strip "Class " prefix
// //         console.log('Fetching students by class:', cleanClass);

// //         const studentsRes = await axios.get(
// //           `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${encodeURIComponent(cleanClass)}`,
// //           { withCredentials: true }
// //         );

// //         // Log what you're getting back for debugging
// //         if (!Array.isArray(studentsRes.data)) {
// //           console.warn('Response is not a valid array:', studentsRes.data);
// //         }

// //         setStudents(studentsRes.data);
// //       } catch (err) {
// //         console.error("Fetch students error:", err);
// //         alert("Failed to load students. Check console.");
// //       }
// //     };

// //     fetchData();
// //   }, [selectedClass]);


// //   // --- Handlers ---

// //   const handleSyllabusUpload = async () => {
// //     if (!syllabusFile || !selectedClass) return;

// //     const formData = new FormData();
// //     formData.append("syllabus", syllabusFile);
// //     formData.append("class", normalizeClassName(selectedClass));

// //     try {
// //       const res = await axios.post(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/upload`,
// //         formData,
// //         {
// //           withCredentials: true,
// //           headers: { 'Content-Type': 'multipart/form-data' },
// //         }
// //       );

// //       if (res.data?.data) {
// //         setAllSyllabus(prev => {
// //           const existingIndex = prev.findIndex(s => normalizeClassName(s.class) === normalizeClassName(selectedClass));
// //           if (existingIndex >= 0) {
// //             const updated = [...prev];
// //             updated[existingIndex] = res.data.data;
// //             return updated;
// //           }
// //           return [...prev, res.data.data];
// //         });
// //         setSyllabusFile(null);
// //         alert('Syllabus uploaded successfully!');
// //       }
// //     } catch (err) {
// //       console.error("Syllabus upload error", err);
// //       alert(err.response?.data?.error || "Failed to upload syllabus");
// //     }
// //   };

// //   const handleDeleteSyllabus = async (className) => {
// //     if (!className) return;

// //     try {
// //       await axios.delete(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${normalizeClassName(className)}`,
// //         { withCredentials: true }
// //       );

// //       setAllSyllabus(prev => prev.filter(s => normalizeClassName(s.class) !== normalizeClassName(className)));
// //       alert('Syllabus deleted successfully!');
// //     } catch (err) {
// //       console.error("Delete syllabus error", err);
// //       alert(err.response?.data?.error || "Failed to delete syllabus");
// //     }
// //   };

// //   const handleTimetableInput = (dayIndex, periodIndex, value) => {
// //     const updatedEntries = [...newTimetableEntries];
// //     updatedEntries[dayIndex].periods[periodIndex] = value;
// //     setNewTimetableEntries(updatedEntries);
// //   };

// //   const handleTimetableSubmit = async () => {
// //     const payload = {
// //       class: normalizeClassName(selectedClass),
// //       entries: newTimetableEntries,
// //     };

// //     try {
// //       const res = await axios.post(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/timetable`,
// //         payload,
// //         { withCredentials: true }
// //       );

// //       setAllTimetables(prev => {
// //         const existingIndex = prev.findIndex(t => normalizeClassName(t.class) === normalizeClassName(selectedClass));
// //         if (existingIndex >= 0) {
// //           const updated = [...prev];
// //           updated[existingIndex] = res.data;
// //           return updated;
// //         }
// //         return [...prev, res.data];
// //       });

// //       alert('Timetable saved successfully!');
// //     } catch (err) {
// //       console.error("Timetable upload error", err);
// //       alert(err.response?.data?.error || "Failed to save timetable");
// //     }
// //   };

// //   const handleDeleteTimetable = async (className) => {
// //     if (!className) return;

// //     try {
// //       await axios.delete(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizeClassName(className)}`,
// //         { withCredentials: true }
// //       );

// //       setAllTimetables(prev => prev.filter(t => normalizeClassName(t.class) !== normalizeClassName(className)));
// //       alert('Timetable deleted successfully!');
// //     } catch (err) {
// //       console.error("Delete timetable error", err);
// //       alert(err.response?.data?.error || "Failed to delete timetable");
// //     }
// //   };

// //   const handleResultChange = (studentId, file) => {
// //     setNewResults(prev => ({ ...prev, [studentId]: file }));
// //   };

// //   const handleSaveResults = async () => {
// //     try {
// //       for (const [studentId, file] of Object.entries(newResults)) {
// //         if (!file) continue;
// //         const formData = new FormData();
// //         formData.append("file", file);
// //         await axios.post(
// //           `${import.meta.env.VITE_BACKEND_URL}/api/results/${normalizeClassName(selectedClass)}/${studentId}`,
// //           formData,
// //           {
// //             withCredentials: true,
// //             headers: { 'Content-Type': 'multipart/form-data' },
// //           }
// //         );
// //       }
// //       alert("Results uploaded successfully");
// //       setNewResults({});
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to upload results: " + err.message);
// //     }
// //   };

// //   // --- Renderers ---

// //   const renderSyllabusTab = () => (
// //     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //       <div className="mb-8">
// //         <h3 className="text-xl font-bold mb-4">Upload Syllabus for {selectedClass}</h3>
// //         <div className="flex flex-col md:flex-row gap-4 items-start">
// //           <div className="flex-1">
// //             <label className="block mb-2 text-sm font-medium text-gray-300">
// //               Select PDF File
// //             </label>
// //             <input
// //               type="file"
// //               onChange={(e) => setSyllabusFile(e.target.files[0])}
// //               accept="application/pdf"
// //               className="block w-full text-sm text-gray-400
// //                 file:mr-4 file:py-2 file:px-4
// //                 file:rounded file:border-0
// //                 file:text-sm file:font-semibold
// //                 file:bg-blue-600 file:text-white
// //                 hover:file:bg-blue-700"
// //             />
// //           </div>
// //           <button
// //             onClick={handleSyllabusUpload}
// //             disabled={!syllabusFile}
// //             className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
// //               hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             Upload Syllabus
// //           </button>
// //         </div>
// //       </div>

// //       <div>
// //         <h3 className="text-xl font-bold mb-4">Class Syllabus Status</h3>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //           {classOptions.map((cls) => {
// //             const syllabus = allSyllabus.find(s => normalizeClassName(s.class) === normalizeClassName(cls));
// //             return (
// //               <div
// //                 key={cls}
// //                 className={`p-4 rounded-lg border ${syllabus
// //                   ? "border-green-500 bg-green-900/20"
// //                   : "border-gray-700 bg-gray-900/50"
// //                   } transition hover:scale-[1.02] cursor-pointer`}
// //                 onClick={() => {
// //                   if (syllabus) {
// //                     setActiveSyllabusClass(cls);
// //                     setIsSyllabusModalOpen(true);
// //                   }
// //                 }}
// //               >
// //                 <div className="flex justify-between items-center">
// //                   <h5 className="font-bold text-lg">{cls}</h5>
// //                   <span className={`px-2 py-1 rounded text-xs ${syllabus
// //                     ? "bg-green-800 text-green-200"
// //                     : "bg-gray-700 text-gray-400"
// //                     }`}>
// //                     {syllabus ? "Uploaded" : "Not Uploaded"}
// //                   </span>
// //                 </div>
// //                 <div className="mt-3 flex justify-between items-center">
// //                   {syllabus ? (
// //                     <span className="text-blue-400 flex items-center">
// //                       <FaDownload className="mr-2" /> Click to view
// //                     </span>
// //                   ) : (
// //                     <span className="text-gray-500">No syllabus available</span>
// //                   )}
// //                   {syllabus && (
// //                     <button
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         handleDeleteSyllabus(cls);
// //                       }}
// //                       className="text-red-500 hover:text-red-400"
// //                     >
// //                       <FaTrash />
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderTimetableTab = () => (
// //     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //       <div className="mb-8">
// //         <h3 className="text-xl font-bold mb-4">Edit Timetable for {selectedClass}</h3>

// //         <div className="overflow-x-auto">
// //           <table className="w-full border-collapse">
// //             <thead>
// //               <tr className="bg-gray-700">
// //                 <th className="p-2 text-left border border-gray-600">Day</th>
// //                 {[1, 2, 3, 4, 5, 6].map(period => (
// //                   <th key={period} className="p-2 border border-gray-600">Period {period}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {newTimetableEntries.map((entry, dayIdx) => (
// //                 <tr key={entry.day} className="hover:bg-gray-750">
// //                   <td className="p-2 font-semibold border border-gray-700">{entry.day}</td>
// //                   {entry.periods.map((period, periodIdx) => (
// //                     <td key={periodIdx} className="border border-gray-700">
// //                       <input
// //                         type="text"
// //                         value={period}
// //                         onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
// //                         className="w-full p-2 bg-gray-900 focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
// //                         placeholder={`Subject ${periodIdx + 1}`}
// //                       />
// //                     </td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="mt-4 flex justify-end">
// //           <button
// //             onClick={handleTimetableSubmit}
// //             className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition"
// //           >
// //             Save Timetable
// //           </button>
// //         </div>
// //       </div>

// //       <div>
// //         <h3 className="text-xl font-bold mb-4">Class Timetables</h3>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //           {classOptions.map((cls) => {
// //             const timetable = allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(cls));
// //             return (
// //               <div
// //                 key={cls}
// //                 className={`p-4 rounded-lg border ${timetable?.entries?.length > 0
// //                   ? "border-blue-500 bg-blue-900/20"
// //                   : "border-gray-700 bg-gray-900/50"
// //                   } transition hover:scale-[1.02]`}
// //               >
// //                 <div className="flex justify-between items-center mb-3">
// //                   <h5 className="font-bold text-lg">{cls}</h5>
// //                   <span className={`px-2 py-1 rounded text-xs ${timetable?.entries?.length > 0
// //                     ? "bg-blue-800 text-blue-200"
// //                     : "bg-gray-700 text-gray-400"
// //                     }`}>
// //                     {timetable?.entries?.length > 0 ? "Uploaded" : "Not Uploaded"}
// //                   </span>
// //                 </div>

// //                 {timetable?.entries?.length > 0 ? (
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => {
// //                         setActiveTimetableClass(cls);
// //                         setIsTimetableModalOpen(true);
// //                       }}
// //                       className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
// //                     >
// //                       View
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         setSelectedClass(cls);
// //                         setActiveTab('Time-Table');
// //                         setNewTimetableEntries(timetable.entries);
// //                       }}
// //                       className="py-2 px-3 bg-yellow-600 hover:bg-yellow-700 rounded"
// //                     >
// //                       <FaEdit />
// //                     </button>
// //                     <button
// //                       onClick={() => handleDeleteTimetable(cls)}
// //                       className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded"
// //                     >
// //                       <FaTrash />
// //                     </button>
// //                   </div>
// //                 ) : (
// //                   <p className="text-gray-500 text-sm">No timetable available</p>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   const renderResultsTab = () => (
// //     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
// //       <div className="mb-6">
// //         <h3 className="text-xl font-bold mb-4">Upload Results for {selectedClass}</h3>

// //         <div className="bg-gray-900 rounded-lg p-4 mb-6">
// //           <p className="text-gray-400 mb-3">Instructions:</p>
// //           <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
// //             <li>Upload PDF result files for each student</li>
// //             <li>Files should be named as: [StudentName]_[Term].pdf</li>
// //             <li>Only PDF files are accepted</li>
// //             <li>Click "Save Results" when finished</li>
// //           </ul>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {students.map((student) => (
// //             <div key={student._id} className="bg-gray-900 p-4 rounded-lg">
// //               <h4 className="font-bold mb-3 flex items-center">
// //                 <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
// //                   {student.name.charAt(0)}
// //                 </span>
// //                 {student.name}
// //               </h4>
// //               <div className="flex items-center">
// //                 <label className="flex-1 mr-2">
// //                   <span className="sr-only">Upload result for {student.name}</span>
// //                   <input
// //                     type="file"
// //                     accept="application/pdf"
// //                     className="block w-full text-sm text-gray-400
// //                       file:mr-2 file:py-1.5 file:px-3
// //                       file:rounded file:border-0
// //                       file:text-xs file:font-medium
// //                       file:bg-gray-700 file:text-gray-300
// //                       hover:file:bg-gray-600"
// //                     onChange={(e) => handleResultChange(student._id, e.target.files[0])}
// //                   />
// //                 </label>
// //                 {newResults[student._id] && (
// //                   <span className="text-green-400 text-sm">Ready</span>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex justify-between items-center">
// //         <p className="text-gray-400 text-sm">
// //           {Object.keys(newResults).length} file(s) ready for upload
// //         </p>
// //         <button
// //           onClick={handleSaveResults}
// //           disabled={Object.keys(newResults).length === 0}
// //           className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
// //             hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
// //         >
// //           Save Results
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
// //       <Sidebar role="admin" />
// //       <div className="flex-1 p-4 md:p-8">
// //         <Header />
// //         <div className="max-w-7xl mx-auto mt-8">
// //           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
// //             <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Academic Management</h2>

// //             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
// //               <select
// //                 value={selectedClass}
// //                 onChange={(e) => setSelectedClass(e.target.value)}
// //                 className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
// //               >
// //                 <option value="">Select Class</option>
// //                 {classOptions.map((cls) => (
// //                   <option key={cls} value={cls}>{cls}</option>
// //                 ))}
// //               </select>

// //               <div className="flex bg-gray-800 rounded-lg p-1">
// //                 {['Syllabus', 'Time-Table', 'Result'].map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab
// //                       ? 'bg-blue-600 text-white'
// //                       : 'text-gray-300 hover:text-white'
// //                       }`}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-700 shadow-2xl">
// //             {activeTab === 'Syllabus' && renderSyllabusTab()}
// //             {activeTab === 'Time-Table' && renderTimetableTab()}
// //             {activeTab === 'Result' && renderResultsTab()}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Syllabus Modal */}
// //       {isSyllabusModalOpen && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
// //           <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl">
// //             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
// //               <h3 className="text-xl font-bold">
// //                 Syllabus for {activeSyllabusClass}
// //               </h3>
// //               <button
// //                 onClick={() => setIsSyllabusModalOpen(false)}
// //                 className="text-gray-400 hover:text-white"
// //               >
// //                 <FaTimes size={20} />
// //               </button>
// //             </div>
// //             {(() => {
// //               const syllabus = allSyllabus.find(
// //                 s => normalizeClassName(s.class) === normalizeClassName(activeSyllabusClass)
// //               );
// //               return (
// //                 <div className="p-6">
// //                   <div className="flex justify-center mb-6">
// //                     <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-xl w-64 h-64 flex items-center justify-center">
// //                       {syllabus?.syllabusURL ? (
// //                         <iframe
// //                           src={syllabus.syllabusURL}
// //                           width="220"
// //                           height="240"
// //                           style={{ border: 'none' }}
// //                           title="PDF Preview"
// //                         ></iframe>
// //                       ) : (
// //                         <span className="text-gray-500">PDF Preview</span>
// //                       )}
// //                     </div>
// //                   </div>
// //                   <div className="flex justify-center gap-4">
// //                     <a
// //                       href={syllabus?.syllabusURL}
// //                       download
// //                       target="_blank"
// //                       rel="noopener noreferrer"
// //                       className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold flex items-center hover:bg-blue-700"
// //                     >
// //                       <FaDownload className="mr-2" /> Download Syllabus
// //                     </a>
// //                     <button
// //                       onClick={() => {
// //                         handleDeleteSyllabus(activeSyllabusClass);
// //                         setIsSyllabusModalOpen(false);
// //                       }}
// //                       className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold flex items-center hover:bg-red-700"
// //                     >
// //                       <FaTrash className="mr-2" /> Delete Syllabus
// //                     </button>
// //                   </div>
// //                 </div>
// //               );
// //             })()}
// //           </div>
// //         </div>
// //       )}
// //       {/* Timetable Modal */}
// //       {isTimetableModalOpen && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
// //           <div className="bg-gray-800 rounded-xl max-w-4xl w-full border border-gray-700 shadow-2xl">
// //             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
// //               <h3 className="text-xl font-bold">
// //                 Timetable for {activeTimetableClass}
// //               </h3>
// //               <button
// //                 onClick={() => setIsTimetableModalOpen(false)}
// //                 className="text-gray-400 hover:text-white"
// //               >
// //                 <FaTimes size={20} />
// //               </button>
// //             </div>

// //             <div className="p-4 overflow-auto max-h-[70vh]">
// //               <table className="w-full border-collapse">
// //                 <thead>
// //                   <tr className="bg-gray-700">
// //                     <th className="p-3 text-left border border-gray-600">Day</th>
// //                     {[1, 2, 3, 4, 5, 6].map(period => (
// //                       <th key={period} className="p-3 border border-gray-600">Period {period}</th>
// //                     ))}
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(activeTimetableClass))?.entries?.map((row, i) => (
// //                     <tr key={i} className="hover:bg-gray-750">
// //                       <td className="p-3 font-semibold border border-gray-700">{row.day}</td>
// //                       {row.periods.map((p, idx) => (
// //                         <td key={idx} className="p-3 border border-gray-700">{p}</td>
// //                       ))}
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminAcademics;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Header from '../../components/Header';
// import { FaDownload, FaTrash, FaTimes, FaEdit } from 'react-icons/fa';

// const AdminAcademics = () => {
//   // State declarations remain the same
//   const [syllabusFile, setSyllabusFile] = useState(null);
//   const [activeSyllabusClass, setActiveSyllabusClass] = useState('');
//   const [newTimetableEntries, setNewTimetableEntries] = useState(
//     ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({
//       day,
//       periods: Array(6).fill(''),
//     }))
//   );
//   const [activeTimetableClass, setActiveTimetableClass] = useState('');
//   const [classOptions, setClassOptions] = useState([]);
//   const [selectedClass, setSelectedClass] = useState('');
//   const [activeTab, setActiveTab] = useState('syllabus');
//   const [students, setStudents] = useState([]);
//   const [newResults, setNewResults] = useState({});
//   const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
//   const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
//   const [allSyllabus, setAllSyllabus] = useState([]);
//   const [allTimetables, setAllTimetables] = useState([]);

//   // This helper is still useful for consistency, but we won't use it for the student fetch
//   const normalizeClassName = (className) => className.replace(/^Class\s*/i, '');

//   useEffect(() => {
//     // This useEffect for fetching initial data remains the same
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
//           withCredentials: true,
//         });
//         const classNames = response.data.map(cls => cls.name);
//         setClassOptions(classNames);
//         if (classNames.length > 0) setSelectedClass(classNames[0]);
//       } catch (error) {
//         console.error("Failed to fetch class list", error);
//       }
//     };
//     const fetchAllSyllabus = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/admin/all`, {
//           withCredentials: true,
//         });
//         setAllSyllabus(response.data);
//       } catch (error) {
//         console.error("Failed to fetch syllabus", error);
//       }
//     };
//     const fetchAllTimetables = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/admin/all`, {
//           withCredentials: true,
//         });
//         setAllTimetables(response.data);
//       } catch (error) {
//         console.error("Failed to fetch timetables", error);
//       }
//     };
//     fetchClasses();
//     fetchAllSyllabus();
//     fetchAllTimetables();
//   }, []);

//   // ✅ **FIX 1: Students not loading for Results**
//   // This useEffect now sends the full class name to the backend.
//   useEffect(() => {
//     if (!selectedClass) return;

//     const fetchStudentsForClass = async () => {
//       try {
//         const response = await axios.get(
//           // Use the full 'selectedClass' name directly without normalizing it
//           `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${encodeURIComponent(selectedClass)}`,
//           { withCredentials: true }
//         );
//         setStudents(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error("Failed to fetch students for class:", err);
//         setStudents([]); // Clear students on error
//       }
//     };
    
//     fetchStudentsForClass();
//   }, [selectedClass]);

//   // --- Handlers (remain the same) ---
//   const handleSyllabusUpload = async () => {
//     if (!syllabusFile || !selectedClass) return;
//     const formData = new FormData();
//     formData.append("syllabus", syllabusFile);
//     formData.append("class", normalizeClassName(selectedClass));
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/upload`,
//         formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
//       );
//       if (res.data?.data) {
//         setAllSyllabus(prev => {
//           const existingIndex = prev.findIndex(s => normalizeClassName(s.class) === normalizeClassName(selectedClass));
//           if (existingIndex >= 0) {
//             const updated = [...prev];
//             updated[existingIndex] = res.data.data;
//             return updated;
//           }
//           return [...prev, res.data.data];
//         });
//         setSyllabusFile(null);
//         alert('Syllabus uploaded successfully!');
//       }
//     } catch (err) {
//       console.error("Syllabus upload error", err);
//       alert(err.response?.data?.error || "Failed to upload syllabus");
//     }
//   };

//   const handleDeleteSyllabus = async (className) => {
//     if (!className) return;
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${normalizeClassName(className)}`, { withCredentials: true }
//       );
//       setAllSyllabus(prev => prev.filter(s => normalizeClassName(s.class) !== normalizeClassName(className)));
//       alert('Syllabus deleted successfully!');
//     } catch (err) {
//       console.error("Delete syllabus error", err);
//       alert(err.response?.data?.error || "Failed to delete syllabus");
//     }
//   };

//   const handleTimetableInput = (dayIndex, periodIndex, value) => {
//     const updatedEntries = [...newTimetableEntries];
//     updatedEntries[dayIndex].periods[periodIndex] = value;
//     setNewTimetableEntries(updatedEntries);
//   };

//   const handleTimetableSubmit = async () => {
//     const payload = {
//       class: normalizeClassName(selectedClass),
//       entries: newTimetableEntries,
//     };
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/timetable`,
//         payload, { withCredentials: true }
//       );
//       setAllTimetables(prev => {
//         const existingIndex = prev.findIndex(t => normalizeClassName(t.class) === normalizeClassName(selectedClass));
//         if (existingIndex >= 0) {
//           const updated = [...prev];
//           updated[existingIndex] = res.data;
//           return updated;
//         }
//         return [...prev, res.data];
//       });
//       alert('Timetable saved successfully!');
//     } catch (err) {
//       console.error("Timetable upload error", err);
//       alert(err.response?.data?.error || "Failed to save timetable");
//     }
//   };

//   const handleDeleteTimetable = async (className) => {
//     if (!className) return;
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizeClassName(className)}`, { withCredentials: true }
//       );
//       setAllTimetables(prev => prev.filter(t => normalizeClassName(t.class) !== normalizeClassName(className)));
//       alert('Timetable deleted successfully!');
//     } catch (err) {
//       console.error("Delete timetable error", err);
//       alert(err.response?.data?.error || "Failed to delete timetable");
//     }
//   };

//   const handleResultChange = (studentId, file) => {
//     setNewResults(prev => ({ ...prev, [studentId]: file }));
//   };

//   const handleSaveResults = async () => {
//     try {
//       for (const [studentId, file] of Object.entries(newResults)) {
//         if (!file) continue;
//         const formData = new FormData();
//         formData.append("file", file);
//         await axios.post(
//           `${import.meta.env.VITE_BACKEND_URL}/api/results/${normalizeClassName(selectedClass)}/${studentId}`,
//           formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
//         );
//       }
//       alert("Results uploaded successfully");
//       setNewResults({});
//     } catch (err) {
//       console.error(err);
//       alert("Failed to upload results: " + err.message);
//     }
//   };

//   // --- Renderers (Syllabus renderer is fixed) ---
//   const renderSyllabusTab = () => (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//         {/* ... (upload section remains the same) ... */}
//         <div className="mb-8">
//             <h3 className="text-xl font-bold mb-4">Upload Syllabus for {selectedClass}</h3>
//             <div className="flex flex-col md:flex-row gap-4 items-start">
//             <div className="flex-1">
//                 <label className="block mb-2 text-sm font-medium text-gray-300">
//                 Select PDF File
//                 </label>
//                 <input
//                 type="file"
//                 onChange={(e) => setSyllabusFile(e.target.files[0])}
//                 accept="application/pdf"
//                 className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                 />
//             </div>
//             <button
//                 onClick={handleSyllabusUpload}
//                 disabled={!syllabusFile}
//                 className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//                 Upload Syllabus
//             </button>
//             </div>
//         </div>

//       <div>
//         <h3 className="text-xl font-bold mb-4">Class Syllabus Status</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {classOptions.map((cls) => {
//             const syllabus = allSyllabus.find(s => normalizeClassName(s.class) === normalizeClassName(cls));
//             return (
//               <div
//                 key={cls}
//                 className={`p-4 rounded-lg border ${syllabus ? "border-green-500 bg-green-900/20" : "border-gray-700 bg-gray-900/50"} transition hover:scale-[1.02] cursor-pointer`}
//                 onClick={() => {
//                   if (syllabus) {
//                     setActiveSyllabusClass(cls);
//                     setIsSyllabusModalOpen(true);
//                   }
//                 }}
//               >
//                 <div className="flex justify-between items-center">
//                   <h5 className="font-bold text-lg">{cls}</h5>
//                   <span className={`px-2 py-1 rounded text-xs ${syllabus ? "bg-green-800 text-green-200" : "bg-gray-700 text-gray-400"}`}>
//                     {syllabus ? "Uploaded" : "Not Uploaded"}
//                   </span>
//                 </div>
//                 <div className="mt-3 flex justify-between items-center">
//                   {syllabus ? (
//                     <span className="text-blue-400 flex items-center">
//                       <FaDownload className="mr-2" /> Click to view
//                     </span>
//                   ) : (
//                     <span className="text-gray-500">No syllabus available</span>
//                   )}
//                   {syllabus && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeleteSyllabus(cls);
//                       }}
//                       className="text-red-500 hover:text-red-400"
//                     >
//                       <FaTrash />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
  
//   // Timetable and Results renderers remain the same
//   const renderTimetableTab = () => (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//       <div className="mb-8">
//         <h3 className="text-xl font-bold mb-4">Edit Timetable for {selectedClass}</h3>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-700">
//                 <th className="p-2 text-left border border-gray-600">Day</th>
//                 {[1, 2, 3, 4, 5, 6].map(period => (
//                   <th key={period} className="p-2 border border-gray-600">Period {period}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {newTimetableEntries.map((entry, dayIdx) => (
//                 <tr key={entry.day} className="hover:bg-gray-750">
//                   <td className="p-2 font-semibold border border-gray-700">{entry.day}</td>
//                   {entry.periods.map((period, periodIdx) => (
//                     <td key={periodIdx} className="border border-gray-700">
//                       <input
//                         type="text"
//                         value={period}
//                         onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
//                         className="w-full p-2 bg-gray-900 focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         placeholder={`Subject ${periodIdx + 1}`}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={handleTimetableSubmit}
//             className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition"
//           >
//             Save Timetable
//           </button>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-xl font-bold mb-4">Class Timetables</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {classOptions.map((cls) => {
//             const timetable = allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(cls));
//             return (
//               <div
//                 key={cls}
//                 className={`p-4 rounded-lg border ${timetable?.entries?.length > 0
//                   ? "border-blue-500 bg-blue-900/20"
//                   : "border-gray-700 bg-gray-900/50"
//                   } transition hover:scale-[1.02]`}
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h5 className="font-bold text-lg">{cls}</h5>
//                   <span className={`px-2 py-1 rounded text-xs ${timetable?.entries?.length > 0
//                     ? "bg-blue-800 text-blue-200"
//                     : "bg-gray-700 text-gray-400"
//                     }`}>
//                     {timetable?.entries?.length > 0 ? "Uploaded" : "Not Uploaded"}
//                   </span>
//                 </div>

//                 {timetable?.entries?.length > 0 ? (
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         setActiveTimetableClass(cls);
//                         setIsTimetableModalOpen(true);
//                       }}
//                       className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedClass(cls);
//                         setActiveTab('Time-Table');
//                         setNewTimetableEntries(timetable.entries);
//                       }}
//                       className="py-2 px-3 bg-yellow-600 hover:bg-yellow-700 rounded"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteTimetable(cls)}
//                       className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-sm">No timetable available</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );

//   const renderResultsTab = () => (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
//       <div className="mb-6">
//         <h3 className="text-xl font-bold mb-4">Upload Results for {selectedClass}</h3>
//         <div className="bg-gray-900 rounded-lg p-4 mb-6">
//           <p className="text-gray-400 mb-3">Instructions:</p>
//           <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
//             <li>Upload PDF result files for each student</li>
//             <li>Files should be named as: [StudentName]_[Term].pdf</li>
//             <li>Only PDF files are accepted</li>
//             <li>Click "Save Results" when finished</li>
//           </ul>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {students.map((student) => (
//             <div key={student._id} className="bg-gray-900 p-4 rounded-lg">
//               <h4 className="font-bold mb-3 flex items-center">
//                 <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
//                   {student.name.charAt(0)}
//                 </span>
//                 {student.name}
//               </h4>
//               <div className="flex items-center">
//                 <label className="flex-1 mr-2">
//                   <span className="sr-only">Upload result for {student.name}</span>
//                   <input
//                     type="file"
//                     accept="application/pdf"
//                     className="block w-full text-sm text-gray-400 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
//                     onChange={(e) => handleResultChange(student._id, e.target.files[0])}
//                   />
//                 </label>
//                 {newResults[student._id] && (
//                   <span className="text-green-400 text-sm">Ready</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <p className="text-gray-400 text-sm">
//           {Object.keys(newResults).length} file(s) ready for upload
//         </p>
//         <button
//           onClick={handleSaveResults}
//           disabled={Object.keys(newResults).length === 0}
//           className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Save Results
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       <Sidebar role="admin" />
//       <div className="flex-1 p-4 md:p-8">
//         <Header />
//         <div className="max-w-7xl mx-auto mt-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
//             <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Academic Management</h2>
//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               <select
//                 value={selectedClass}
//                 onChange={(e) => setSelectedClass(e.target.value)}
//                 className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
//               >
//                 <option value="">Select Class</option>
//                 {classOptions.map((cls) => (
//                   <option key={cls} value={cls}>{cls}</option>
//                 ))}
//               </select>
//               <div className="flex bg-gray-800 rounded-lg p-1">
//                 {['Syllabus', 'Time-Table', 'Result'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-700 shadow-2xl">
//             {activeTab === 'Syllabus' && renderSyllabusTab()}
//             {activeTab === 'Time-Table' && renderTimetableTab()}
//             {activeTab === 'Result' && renderResultsTab()}
//           </div>
//         </div>
//       </div>

//       {/* Syllabus Modal */}
//       {isSyllabusModalOpen && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl">
//             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//               <h3 className="text-xl font-bold">
//                 Syllabus for {activeSyllabusClass}
//               </h3>
//               <button
//                 onClick={() => setIsSyllabusModalOpen(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             {(() => {
//               const syllabus = allSyllabus.find(
//                 s => normalizeClassName(s.class) === normalizeClassName(activeSyllabusClass)
//               );
//               // ✅ **FIX 2: Syllabus PDF display**
//               // Construct the full URL for the iframe src.
//               const syllabusUrl = syllabus?.syllabusURL
//                 ? `${import.meta.env.VITE_BACKEND_URL}${syllabus.syllabusURL}`
//                 : "";

//               return (
//                 <div className="p-6">
//                   {syllabusUrl ? (
//                     <iframe
//                       src={syllabusUrl}
//                       className="w-full h-96 rounded-lg border border-gray-700"
//                       title="Syllabus PDF Preview"
//                     ></iframe>
//                   ) : (
//                     <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg">
//                       <p className="text-gray-500">PDF Preview not available.</p>
//                     </div>
//                   )}
//                   <div className="flex justify-center gap-4 mt-6">
//                     <a
//                       href={syllabusUrl}
//                       download
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold flex items-center hover:bg-blue-700"
//                     >
//                       <FaDownload className="mr-2" /> Download Syllabus
//                     </a>
//                   </div>
//                 </div>
//               );
//             })()}
//           </div>
//         </div>
//       )}
      
//       {/* Timetable Modal */}
//       {isTimetableModalOpen && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-xl max-w-4xl w-full border border-gray-700 shadow-2xl">
//             <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//               <h3 className="text-xl font-bold">
//                 Timetable for {activeTimetableClass}
//               </h3>
//               <button
//                 onClick={() => setIsTimetableModalOpen(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div className="p-4 overflow-auto max-h-[70vh]">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-700">
//                     <th className="p-3 text-left border border-gray-600">Day</th>
//                     {[1, 2, 3, 4, 5, 6].map(period => (
//                       <th key={period} className="p-3 border border-gray-600">Period {period}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(activeTimetableClass))?.entries?.map((row, i) => (
//                     <tr key={i} className="hover:bg-gray-750">
//                       <td className="p-3 font-semibold border border-gray-700">{row.day}</td>
//                       {row.periods.map((p, idx) => (
//                         <td key={idx} className="p-3 border border-gray-700">{p}</td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminAcademics;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { FaDownload, FaTrash, FaTimes, FaEdit } from 'react-icons/fa';

const AdminAcademics = () => {
  // All your existing state and functions remain the same...
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [activeSyllabusClass, setActiveSyllabusClass] = useState('');
  const [newTimetableEntries, setNewTimetableEntries] = useState(
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({
      day,
      periods: Array(6).fill(''),
    }))
  );
  const [activeTimetableClass, setActiveTimetableClass] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [activeTab, setActiveTab] = useState('syllabus');
  const [students, setStudents] = useState([]);
  const [newResults, setNewResults] = useState({});
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [allSyllabus, setAllSyllabus] = useState([]);
  const [allTimetables, setAllTimetables] = useState([]);

  const normalizeClassName = (className) => className.replace(/^Class\s*/i, '');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/classes`, {
          withCredentials: true,
        });
        const classNames = response.data.map(cls => cls.name);
        setClassOptions(classNames);
        if (classNames.length > 0) setSelectedClass(classNames[0]);
      } catch (error) {
        console.error("Failed to fetch class list", error);
      }
    };
    const fetchAllSyllabus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/syllabus/admin/all`, {
          withCredentials: true,
        });
        setAllSyllabus(response.data);
      } catch (error) {
        console.error("Failed to fetch syllabus", error);
      }
    };
    const fetchAllTimetables = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/timetable/admin/all`, {
          withCredentials: true,
        });
        setAllTimetables(response.data);
      } catch (error) {
        console.error("Failed to fetch timetables", error);
      }
    };
    fetchClasses();
    fetchAllSyllabus();
    fetchAllTimetables();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/students/by-class-name/${encodeURIComponent(selectedClass)}`,
          { withCredentials: true }
        );
        setStudents(studentsRes.data);
      } catch (err) {
        console.error("Fetch data error", err);
      }
    };
    fetchData();
  }, [selectedClass]);

  // All your handler functions (handleSyllabusUpload, etc.) remain unchanged...
  const handleSyllabusUpload = async () => {
    if (!syllabusFile || !selectedClass) return;

    const formData = new FormData();
    formData.append("syllabus", syllabusFile);
    formData.append("class", normalizeClassName(selectedClass));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/upload`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (res.data?.data) {
        setAllSyllabus(prev => {
          const existingIndex = prev.findIndex(s => normalizeClassName(s.class) === normalizeClassName(selectedClass));
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = res.data.data;
            return updated;
          }
          return [...prev, res.data.data];
        });
        setSyllabusFile(null);
        alert('Syllabus uploaded successfully!');
      }
    } catch (err) {
      console.error("Syllabus upload error", err);
      alert(err.response?.data?.error || "Failed to upload syllabus");
    }
  };

  const handleDeleteSyllabus = async (className) => {
    if (!className) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/syllabus/${normalizeClassName(className)}`,
        { withCredentials: true }
      );

      setAllSyllabus(prev => prev.filter(s => normalizeClassName(s.class) !== normalizeClassName(className)));
      alert('Syllabus deleted successfully!');
    } catch (err) {
      console.error("Delete syllabus error", err);
      alert(err.response?.data?.error || "Failed to delete syllabus");
    }
  };

  const handleTimetableInput = (dayIndex, periodIndex, value) => {
    const updatedEntries = [...newTimetableEntries];
    updatedEntries[dayIndex].periods[periodIndex] = value;
    setNewTimetableEntries(updatedEntries);
  };

  const handleTimetableSubmit = async () => {
    const payload = {
      class: normalizeClassName(selectedClass),
      entries: newTimetableEntries,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/timetable`,
        payload,
        { withCredentials: true }
      );

      setAllTimetables(prev => {
        const existingIndex = prev.findIndex(t => normalizeClassName(t.class) === normalizeClassName(selectedClass));
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = res.data;
          return updated;
        }
        return [...prev, res.data];
      });

      alert('Timetable saved successfully!');
    } catch (err) {
      console.error("Timetable upload error", err);
      alert(err.response?.data?.error || "Failed to save timetable");
    }
  };

  const handleDeleteTimetable = async (className) => {
    if (!className) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/timetable/${normalizeClassName(className)}`,
        { withCredentials: true }
      );

      setAllTimetables(prev => prev.filter(t => normalizeClassName(t.class) !== normalizeClassName(className)));
      alert('Timetable deleted successfully!');
    } catch (err) {
      console.error("Delete timetable error", err);
      alert(err.response?.data?.error || "Failed to delete timetable");
    }
  };

  const handleResultChange = (studentId, file) => {
    setNewResults(prev => ({ ...prev, [studentId]: file }));
  };

  const handleSaveResults = async () => {
    try {
      for (const [studentId, file] of Object.entries(newResults)) {
        if (!file) continue;
        const formData = new FormData();
        formData.append("file", file);
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/results/${normalizeClassName(selectedClass)}/${studentId}`,
          formData,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
      }
      alert("Results uploaded successfully");
      setNewResults({});
    } catch (err) {
      console.error(err);
      alert("Failed to upload results: " + err.message);
    }
  };

  // All your render functions (renderSyllabusTab, etc.) remain the same...
  const renderSyllabusTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Upload Syllabus for {selectedClass}</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Select PDF File
            </label>
            <input
              type="file"
              onChange={(e) => setSyllabusFile(e.target.files[0])}
              accept="application/pdf"
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
            />
          </div>
          <button
            onClick={handleSyllabusUpload}
            disabled={!syllabusFile}
            className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
              hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Syllabus
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Class Syllabus Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classOptions.map((cls) => {
            const syllabus = allSyllabus.find(s => normalizeClassName(s.class) === normalizeClassName(cls));
            return (
              <div
                key={cls}
                className={`p-4 rounded-lg border ${syllabus
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-700 bg-gray-900/50"
                  } transition hover:scale-[1.02] cursor-pointer`}
                onClick={() => {
                  if (syllabus) {
                    setActiveSyllabusClass(cls);
                    setIsSyllabusModalOpen(true);
                  }
                }}
              >
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-lg">{cls}</h5>
                  <span className={`px-2 py-1 rounded text-xs ${syllabus
                    ? "bg-green-800 text-green-200"
                    : "bg-gray-700 text-gray-400"
                    }`}>
                    {syllabus ? "Uploaded" : "Not Uploaded"}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  {syllabus ? (
                    <span className="text-blue-400 flex items-center">
                      <FaDownload className="mr-2" /> Click to view
                    </span>
                  ) : (
                    <span className="text-gray-500">No syllabus available</span>
                  )}
                  {syllabus && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSyllabus(cls);
                      }}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTimetableTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Edit Timetable for {selectedClass}</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left border border-gray-600">Day</th>
                {[1, 2, 3, 4, 5, 6].map(period => (
                  <th key={period} className="p-2 border border-gray-600">Period {period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {newTimetableEntries.map((entry, dayIdx) => (
                <tr key={entry.day} className="hover:bg-gray-750">
                  <td className="p-2 font-semibold border border-gray-700">{entry.day}</td>
                  {entry.periods.map((period, periodIdx) => (
                    <td key={periodIdx} className="border border-gray-700">
                      <input
                        type="text"
                        value={period}
                        onChange={(e) => handleTimetableInput(dayIdx, periodIdx, e.target.value)}
                        className="w-full p-2 bg-gray-900 focus:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={`Subject ${periodIdx + 1}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleTimetableSubmit}
            className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition"
          >
            Save Timetable
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Class Timetables</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classOptions.map((cls) => {
            const timetable = allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(cls));
            return (
              <div
                key={cls}
                className={`p-4 rounded-lg border ${timetable?.entries?.length > 0
                  ? "border-blue-500 bg-blue-900/20"
                  : "border-gray-700 bg-gray-900/50"
                  } transition hover:scale-[1.02]`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-bold text-lg">{cls}</h5>
                  <span className={`px-2 py-1 rounded text-xs ${timetable?.entries?.length > 0
                    ? "bg-blue-800 text-blue-200"
                    : "bg-gray-700 text-gray-400"
                    }`}>
                    {timetable?.entries?.length > 0 ? "Uploaded" : "Not Uploaded"}
                  </span>
                </div>

                {timetable?.entries?.length > 0 ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setActiveTimetableClass(cls);
                        setIsTimetableModalOpen(true);
                      }}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedClass(cls);
                        setActiveTab('Time-Table');
                        setNewTimetableEntries(timetable.entries);
                      }}
                      className="py-2 px-3 bg-yellow-600 hover:bg-yellow-700 rounded"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTimetable(cls)}
                      className="py-2 px-3 bg-red-600 hover:bg-red-700 rounded"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No timetable available</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderResultsTab = () => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Upload Results for {selectedClass}</h3>

        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <p className="text-gray-400 mb-3">Instructions:</p>
          <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm">
            <li>Upload PDF result files for each student</li>
            <li>Files should be named as: [StudentName]_[Term].pdf</li>
            <li>Only PDF files are accepted</li>
            <li>Click "Save Results" when finished</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {students.map((student) => (
            <div key={student._id} className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-bold mb-3 flex items-center">
                <span className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  {student.name.charAt(0)}
                </span>
                {student.name}
              </h4>
              <div className="flex items-center">
                <label className="flex-1 mr-2">
                  <span className="sr-only">Upload result for {student.name}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="block w-full text-sm text-gray-400
                      file:mr-2 file:py-1.5 file:px-3
                      file:rounded file:border-0
                      file:text-xs file:font-medium
                      file:bg-gray-700 file:text-gray-300
                      hover:file:bg-gray-600"
                    onChange={(e) => handleResultChange(student._id, e.target.files[0])}
                  />
                </label>
                {newResults[student._id] && (
                  <span className="text-green-400 text-sm">Ready</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          {Object.keys(newResults).length} file(s) ready for upload
        </p>
        <button
          onClick={handleSaveResults}
          disabled={Object.keys(newResults).length === 0}
          className="px-6 py-3 bg-green-600 rounded-lg text-white font-semibold 
            hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Results
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar role="admin" />
      <div className="flex-1 p-4 md:p-8">
        <Header />
        <div className="max-w-7xl mx-auto mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Academic Management</h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-full sm:w-64"
              >
                <option value="">Select Class</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              <div className="flex bg-gray-800 rounded-lg p-1">
                {['Syllabus', 'Time-Table', 'Result'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-700 shadow-2xl">
            {activeTab === 'Syllabus' && renderSyllabusTab()}
            {activeTab === 'Time-Table' && renderTimetableTab()}
            {activeTab === 'Result' && renderResultsTab()}
          </div>
        </div>
      </div>

      {/* Syllabus Modal */}
      {isSyllabusModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Syllabus for {activeSyllabusClass}
              </h3>
              <button
                onClick={() => setIsSyllabusModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {(() => {
              const syllabus = allSyllabus.find(
                s => normalizeClassName(s.class) === normalizeClassName(activeSyllabusClass)
              );
              // ✅ **THIS IS THE FIX**
              // Construct the full URL for both the iframe and the download link
              const syllabusUrl = syllabus?.syllabusURL
                ? `${import.meta.env.VITE_BACKEND_URL}${syllabus.syllabusURL}`
                : "";

              return (
                <div className="p-6">
                  {syllabusUrl ? (
                    <iframe
                      src={syllabusUrl}
                      className="w-full h-96 rounded-lg border border-gray-700"
                      title="Syllabus PDF Preview"
                    ></iframe>
                  ) : (
                    <div className="w-full h-96 flex items-center justify-center bg-gray-900 rounded-lg">
                      <p className="text-gray-500">PDF Preview not available.</p>
                    </div>
                  )}
                  <div className="flex justify-center gap-4 mt-6">
                    <a
                      href={syllabusUrl} // Use the full URL here
                      download // This attribute prompts the browser to download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold flex items-center hover:bg-blue-700"
                    >
                      <FaDownload className="mr-2" /> Download Syllabus
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
      
      {/* Timetable Modal */}
      {isTimetableModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full border border-gray-700 shadow-2xl">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Timetable for {activeTimetableClass}
              </h3>
              <button
                onClick={() => setIsTimetableModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[70vh]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3 text-left border border-gray-600">Day</th>
                    {[1, 2, 3, 4, 5, 6].map(period => (
                      <th key={period} className="p-3 border border-gray-600">Period {period}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allTimetables.find(t => normalizeClassName(t.class) === normalizeClassName(activeTimetableClass))?.entries?.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-750">
                      <td className="p-3 font-semibold border border-gray-700">{row.day}</td>
                      {row.periods.map((p, idx) => (
                        <td key={idx} className="p-3 border border-gray-700">{p}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAcademics;