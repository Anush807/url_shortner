// import React, { useState, useEffect } from "react";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { Eye, EyeOff } from "lucide-react"; 
// import { motion, AnimatePresence } from "framer-motion";

// // Typewriter Component
// function Typewriter({ text, speed = 50, delay = 0 }) {
//   const [displayText, setDisplayText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (currentIndex < text.length) {
//         setDisplayText(prev => prev + text[currentIndex]);
//         setCurrentIndex(prev => prev + 1);
//       }
//     }, currentIndex === 0 ? delay : speed);

//     return () => clearTimeout(timer);
//   }, [currentIndex, text, speed, delay]);

//   return (
//     <span>
//       {displayText}
//       {currentIndex < text.length && (
//         <span className="animate-pulse">|</span>
//       )}
//     </span>
//   );
// }

// function SignInPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!formData.email || !formData.password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     axios
//       .post(`http://localhost:5000/auth/signin`, {
//         email: formData.email,
//         password: formData.password,
//       })
//       .then((res) => {
//         if (res.data.token) {
//           // Store JWT token
//           localStorage.setItem("token", res.data.token);
//           setSuccess(res.data.message || "Sign-in successful!");

//           // Optional: Add small delay to show success animation
//           setTimeout(() => {
//             navigate("/dashboard"); // Redirect after success
//           }, 800); // matches your animation
//         } else {
//           setError("Login failed: No token received");
//         }
//       })
//       .catch((err) => {
//         if (err.response?.data?.message) {
//           setError(err.response.data.message);
//         } else {
//           setError("Something went wrong. Please try again.");
//         }
//         console.error(err);
//       });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6 }}
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#fff",
//         color: "#000",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         padding: "20px",
//       }}
//     >
//       {/* Typewriter Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         style={{
//           textAlign: "center",
//           marginBottom: "40px",
//           maxWidth: "600px",
//         }}
//       >
//         <h1
//           style={{
//             fontSize: "42px",
//             fontWeight: "800",
//             color: "#111",
//             marginBottom: "20px",
//             lineHeight: "1.2",
//           }}
//         >
//           <Typewriter text="Shorten. Share. Track." speed={100} delay={500} />
//         </h1>
//         <p
//           style={{
//             fontSize: "18px",
//             color: "#555",
//             lineHeight: "1.6",
//             marginBottom: "10px",
//           }}
//         >
//           <Typewriter 
//             text="Transform long URLs into powerful, trackable short links." 
//             speed={30} 
//             delay={2500} 
//           />
//         </p>
//         <p
//           style={{
//             fontSize: "16px",
//             color: "#777",
//             lineHeight: "1.6",
//           }}
//         >
//           <Typewriter 
//             text="Sign in to access your dashboard and analytics." 
//             speed={40} 
//             delay={5000} 
//           />
//         </p>
//       </motion.div>

//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ y: 40, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.6 }}
//         style={{
//           backgroundColor: "#f9f9f9",
//           padding: "40px",
//           borderRadius: "12px",
//           width: "100%",
//           maxWidth: "400px",
//           boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//           display: "flex",
//           flexDirection: "column",
//           gap: "20px",
//         }}
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           style={{
//             textAlign: "center",
//             fontWeight: "700",
//             fontSize: "24px",
//             color: "#111",
//           }}
//         >
//           Sign In
//         </motion.h2>

//         {/* Email */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.9 }}
//         >
//           <label htmlFor="email" style={{ fontWeight: "600", color: "#333" }}>
//             Email Address
//           </label>
//           <input
//             type="text"
//             id="email"
//             name="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             style={{
//               padding: "12px 15px",
//               borderRadius: "8px",
//               border: "1px solid #ddd",
//               backgroundColor: "#fff",
//               color: "#000",
//               fontSize: "16px",
//               width: "100%",
//               marginTop: "5px",
//             }}
//           />
//         </motion.div>

//         {/* Password */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 1.0 }}
//         >
//           <label htmlFor="password" style={{ fontWeight: "600", color: "#333" }}>
//             Password
//           </label>
//           <div style={{ position: "relative" }}>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter password"
//               style={{
//                 padding: "12px 40px 12px 15px",
//                 borderRadius: "8px",
//                 border: "1px solid #ddd",
//                 backgroundColor: "#fff",
//                 color: "#000",
//                 fontSize: "16px",
//                 width: "100%",
//                 marginTop: "5px",
//               }}
//             />
//             <span
//               onClick={() => setShowPassword(!showPassword)}
//               style={{
//                 position: "absolute",
//                 right: "12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#555",
//               }}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </span>
//           </div>
//         </motion.div>

//         {/* Error & Success */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               style={{ color: "red", fontWeight: "600", textAlign: "center" }}
//             >
//               {error}
//             </motion.div>
//           )}
//           {success && (
//             <motion.div
//               key="success"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               style={{
//                 color: "green",
//                 fontWeight: "600",
//                 textAlign: "center",
//               }}
//             >
//               {success}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Submit Button */}
//         <motion.button
//           type="submit"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           transition={{ duration: 0.2 }}
//           style={{
//             backgroundColor: "#111",
//             color: "#fff",
//             padding: "12px",
//             borderRadius: "8px",
//             border: "none",
//             fontWeight: "700",
//             fontSize: "16px",
//             cursor: "pointer",
//           }}
//         >
//           Sign In
//         </motion.button>
        
//         {/* Signup Link */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.3 }}
//           style={{ textAlign: "center", fontSize: "14px", color: "#333", marginTop: "10px" }}
//         >
//           Don't have an account?{" "}
//           <span
//             onClick={() => navigate("/signup")}
//             style={{ color: "#111", fontWeight: "600", cursor: "pointer" }}
//           >
//             Sign Up
//           </span>
//         </motion.p>
//       </motion.form>
//     </motion.div>
//   );
// }

// export default SignInPage;