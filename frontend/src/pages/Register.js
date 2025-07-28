import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // Use environment variable or fallback to localhost for development
      // In production, use empty string to make requests to same domain
      const API_URL = process.env.NODE_ENV === 'production' 
        ? (process.env.REACT_APP_API_URL || '') 
        : (process.env.REACT_APP_API_URL || 'http://localhost:5000');
      await axios.post(`${API_URL}/api/auth/register`, { username: form.username, password: form.password });
      setSuccess("Register successful! Redirecting to login...");
      setLoading(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      setLoading(false);
    }
  };
  return (
    <main className="container my-5">
      <h1 className="text-center">Register</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Username</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </main>
  );
};

export default Register;