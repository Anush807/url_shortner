import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react"
function SignUpPage() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };
    
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    axios.post('http://localhost:5000/auth/signup', {
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    })
      .then(response => {
        setSuccess("Sign-up successful!");
        console.log('User created:', response.data);
        setFormData({
          userName: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          // If you want to pass the email to signin page:
          navigate('/signin', { state: { userName: formData.userName } }); // Navigate to signin route
        }, 2000);
      })
      .catch(error => {
        if (error.response) {
          const errorMessage = error.response.data?.message ||
            error.response.data?.error ||
            `Error: ${error.response.status}`;
          setError(errorMessage);
        } else if (error.request) {
          setError("No response from server. Please check your connection.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        console.error('Signup error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    }

  return (
     <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0.3 : 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
      style={{
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isTransitioning ? 0.95 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.6 
        }}
        style={{
          backgroundColor: "#111",
          padding: "40px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 15px rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: "center", fontWeight: "700" }}
        >
          Sign In
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="email" style={{ fontWeight: "600" }}>
            Email Address
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            required
            value={formData.userName}
            onChange={handleChange}
            placeholder="you@example.com"
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "1px solid #fff",
              backgroundColor: "#222",
              color: "#fff",
              fontSize: "16px",
              width: "100%",
              marginTop: "5px"
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="password" style={{ fontWeight: "600" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "1px solid #fff",
              backgroundColor: "#222",
              color: "#fff",
              fontSize: "16px",
              width: "100%",
              marginTop: "5px"
            }}
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ color: "red", fontWeight: "600", textAlign: "center" }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ color: "limegreen", fontWeight: "600", textAlign: "center" }}
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          disabled={isTransitioning}
          whileHover={{ scale: isTransitioning ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            backgroundColor: isTransitioning ? "#888" : "#fff",
            color: "#000",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "700",
            fontSize: "16px",
            cursor: isTransitioning ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isTransitioning ? "Redirecting..." : "Sign In"}
        </motion.button>
      </motion.form>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "linear-gradient(45deg, #000, #111)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "50px",
                height: "50px",
                border: "3px solid #333",
                borderTop: "3px solid #fff",
                borderRadius: "50%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SignUpPage;