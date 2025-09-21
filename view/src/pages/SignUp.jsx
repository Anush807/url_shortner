// // SignUpPage.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "motion/react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom";

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

// function SignUpPage() {
//   const navigate = useNavigate();
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setSuccess("");

//     axios
//       .post(
//         "http://localhost:5000/auth/signup",
//         {
//           email: formData.email,
//           password: formData.password,
//           confirmPassword: formData.confirmPassword,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//           timeout: 10000,
//         }
//       )
//       .then((response) => {
//         setSuccess("Sign-up successful!");
//         console.log("User created:", response.data);
//         setFormData({ email: "", password: "", confirmPassword: "" });

//         // Start transition animation before redirect
//         setIsTransitioning(true);

//         setTimeout(() => {
//           navigate("/signin", { state: { email: formData.email } });
//         }, 2000);
//       })
//       .catch((error) => {
//         if (error.response) {
//           const errorMessage =
//             error.response.data?.message ||
//             error.response.data?.error ||
//             `Error: ${error.response.status}`;
//           setError(errorMessage);
//         } else if (error.request) {
//           setError("No response from server. Please check your connection.");
//         } else {
//           setError("An unexpected error occurred. Please try again.");
//         }
//         console.error("Signup error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       animate={{ opacity: isTransitioning ? 0.3 : 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.8 }}
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
//           <Typewriter text="Start Your Journey." speed={100} delay={500} />
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
//             text="Join thousands of users who trust us with their links." 
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
//             text="Create your account and start shortening URLs today." 
//             speed={40} 
//             delay={5000} 
//           />
//         </p>
//       </motion.div>

//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ y: 50, opacity: 0 }}
//         animate={{
//           y: 0,
//           opacity: 1,
//           scale: isTransitioning ? 0.95 : 1,
//         }}
//         transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.6, delay: 0.6 }}
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
//           style={{ textAlign: "center", fontWeight: "700", fontSize: "24px", color: "#111" }}
//         >
//           Sign Up
//         </motion.h2>

//         {/* Email Field */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
//           <label htmlFor="email" style={{ fontWeight: "600", color: "#333" }}>
//             Email Address
//           </label>
//           <input
//             type="email"
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

//         {/* Password Field */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
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

//         {/* Confirm Password Field */}
//         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
//           <label htmlFor="confirmPassword" style={{ fontWeight: "600", color: "#333" }}>
//             Confirm Password
//           </label>
//           <div style={{ position: "relative" }}>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword"
//               name="confirmPassword"
//               required
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Re-enter password"
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
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               style={{
//                 position: "absolute",
//                 right: "12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 cursor: "pointer",
//                 color: "#555",
//               }}
//             >
//               {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </span>
//           </div>
//         </motion.div>

//         {/* Error & Success */}
//         <AnimatePresence>
//           {error && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ color: "red", fontWeight: "600", textAlign: "center" }}>
//               {error}
//             </motion.div>
//           )}
//           {success && (
//             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ color: "green", fontWeight: "600", textAlign: "center" }}>
//               {success}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Submit Button */}
//         <motion.button
//           type="submit"
//           disabled={loading || isTransitioning}
//           whileHover={{ scale: isTransitioning ? 1 : 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           style={{
//             backgroundColor: isTransitioning ? "#ccc" : "#111",
//             color: "#fff",
//             padding: "12px",
//             borderRadius: "8px",
//             border: "none",
//             fontWeight: "700",
//             fontSize: "16px",
//             cursor: isTransitioning ? "not-allowed" : "pointer",
//             transition: "background-color 0.3s ease",
//           }}
//         >
//           {loading ? "Signing Up..." : isTransitioning ? "Redirecting..." : "Sign Up"}
//         </motion.button>
        
//         {/* Already have an account? */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.3 }}
//           style={{
//             marginTop: "15px",
//             textAlign: "center",
//             fontSize: "14px",
//             color: "#555",
//           }}
//         >
//           Already signed up?{" "}
//           <Link
//             to="/signin"
//             style={{ color: "#111", fontWeight: "600", textDecoration: "underline" }}
//           >
//             Login
//           </Link>
//         </motion.div>
//       </motion.form>
//     </motion.div>
//   );
// }

// export default SignUpPage;