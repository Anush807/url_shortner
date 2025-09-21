// // RequestPasswordChangePage.jsx
// import React, { useState } from "react";
// import axios from "axios";

// export default function RequestPasswordChangePage() {
//   const [identifier, setIdentifier] = useState(""); // email or username
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg("");
//     try {
//       // prefer email; you can change payload shape on backend as needed
//       await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/auth/request-password-change`, {
//         email: identifier,
//       });
//       setMsg("If an account exists, a reset link has been sent to the associated email.");
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={submit} className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
//       <input
//         className="w-full border rounded p-2 mb-3"
//         placeholder="Enter your registered email"
//         value={identifier}
//         onChange={(e) => setIdentifier(e.target.value)}
//         required
//       />
//       <button className="btn btn-black w-full" disabled={loading}>
//         {loading ? "Sending..." : "Send Reset Link"}
//       </button>
//       {msg && <p className="mt-3 text-sm">{msg}</p>}
//     </form>
//   );
// }
