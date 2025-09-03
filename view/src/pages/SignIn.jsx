import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

const handleSubmit = (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  if (!formData.userName || !formData.password) {
    setError("Please enter both username and password.");
    return;
  }

  axios.post("http://localhost:5000/auth/signin", {
    userName: formData.userName,
    password: formData.password,
  })
  .then((res) => {
    setSuccess(res.data.message || "Sign-in successful!");

    // Store JWT token if available
    if (res.data.token) {
  localStorage.setItem("token", res.data.token);
  setSuccess(res.data.message || "Sign-in successful!");

  // navigate only if token exists
  setTimeout(() => {
    navigate("/dashboard");
  }, 1000);
} else {
  setError("Login failed: No token received");
}

  })
  .catch((err) => {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong. Please try again.");
    }
    console.error(err);
  });
};



  return (
    <div
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
      <form
        onSubmit={handleSubmit}
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
        <h2 style={{ textAlign: "center", fontWeight: "700" }}>Sign In</h2>

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
          }}
        />

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
          }}
        />

        {error && (
          <div style={{ color: "red", fontWeight: "600", textAlign: "center" }}>
            {error}
          </div>
        )}
        {success && (
          <div
            style={{ color: "limegreen", fontWeight: "600", textAlign: "center" }}
          >
            {success}
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
