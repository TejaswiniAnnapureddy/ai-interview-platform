import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>
        <p>Start your AI-powered interview preparation.</p>

        <form onSubmit={handleSubmit}>
          <input className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="button" type="submit">Register</button>
        </form>

        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}