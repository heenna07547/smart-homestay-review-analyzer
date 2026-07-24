import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://smart-homestay-review-analyzer.onrender.com/api/auth/register",
        form
      );

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {

      alert(
        err.response?.data?.message || "Registration Failed"
      );

    }

  };

  return (
    <Layout maxWidth="400px">

      <h1 className="page-title">
        Create Account
      </h1>

      <p className="page-copy login-copy">
        Create your profile.
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="auth-input"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="auth-submit"
        >
          Create Account
        </button>

      </form>

      <p className="auth-switch">
        Already have an account?
        <Link to="/login"> Sign In</Link>
      </p>

    </Layout>
  );
}

export default Signup;