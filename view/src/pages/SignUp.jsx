import React, { useState } from "react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Here you would typically call your API or state management to handle signup
    setSuccess("Sign-up successful!"); 
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
        <h2 style={{ textAlign: "center", fontWeight: "700" }}>Create Account</h2>

        <label htmlFor="email" style={{ fontWeight: "600" }}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
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

        <label htmlFor="confirmPassword" style={{ fontWeight: "600" }}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
