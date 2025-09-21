// // ResetPasswordPage.jsx
// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function ResetPasswordPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const token = searchParams.get("token");
//   const id = searchParams.get("id");

//   const [pw, setPw] = useState("");
//   const [confirmPw, setConfirmPw] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!token || !id) {
//       setMsg("Invalid reset link.");
//     }
//   }, [token, id]);

//   const submit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     if (pw !== confirmPw) {
//       setMsg("Passwords do not match.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/auth/reset-password`, {
//         id,
//         token,
//         newPassword: pw,
//       });
//       setMsg(res.data.message || "Password updated.");
//       // redirect to signin after small delay
//       setTimeout(() => navigate("/signin"), 1500);
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Failed to reset password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={submit} className="p-6 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Choose a new password</h2>
//       <input type="password" className="w-full border rounded p-2 mb-3" placeholder="New password" value={pw} onChange={(e) => setPw(e.target.value)} required />
//       <input type="password" className="w-full border rounded p-2 mb-3" placeholder="Confirm password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required />
//       <button className="btn btn-black w-full" disabled={loading}>{loading ? "Updating..." : "Reset Password"}</button>
//       {msg && <p className="mt-3 text-sm">{msg}</p>}
//     </form>
//   );
// }
