// import React, { useState } from "react";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";

// const API_URL = "http://localhost:5000"; // adjust for deployment

// function ManageSettingsCard({ onClose, currentUsername, currentEmail }) {
//   const [username, setUsername] = useState(currentUsername || "");
//   const [email, setEmail] = useState(currentEmail || "");
//   const [loading, setLoading] = useState(false);

//   // Send password reset email
//   const sendResetEmail = async () => {
//     try {
//       setLoading(true);
//       await axios.post(`${API_URL}/auth/request-password-change`, { email });
//       alert("Password reset link sent to your email!");
//       onClose();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to send reset link");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle save (username/email updates only)
//   const handleSave = async () => {
//     try {
//       await axios.put(`${API_URL}/auth/update-profile`, { username, email });
//       alert("Profile updated successfully");
//       onClose();
//     } catch (err) {
//       alert("Failed to update profile");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-3xl shadow-xl w-96 p-6 relative animate-fadeIn">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl transition-colors"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Manage Settings
//         </h2>

//         {/* Change Username */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Change Username
//           </label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           />
//         </div>

//         {/* Change Email */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Change Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//             placeholder="your@email.com"
//           />
//         </div>

//         {/* Password reset button */}
//         <div className="mb-4">
//           <button
//             onClick={sendResetEmail}
//             disabled={loading}
//             className="w-full px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send Password Reset Email"}
//           </button>
//         </div>

//         {/* Action buttons */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ManageSettingsCard;
