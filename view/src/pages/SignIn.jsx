import React, { useState } from "react";

function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
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
    // Placeholder: Add your sign-in logic here (API call)
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    // Simulate success
    setSuccess("Sign-in successful!");
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
