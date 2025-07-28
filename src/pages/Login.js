import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
// Use environment variable or fallback to localhost for development
// In production, use empty string to make requests to same domain
// const API_URL = process.env.NODE_ENV === 'production' 
//   ? (process.env.REACT_APP_API_URL || '') 
//   : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

// For development - using localhost directly
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      login(res.data.token);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };
  return (
    <main className="container my-5">
      <h1 className="text-center">Login</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Username or Email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter username or email" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </main>
  );
};

export default Login;