import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message || "Login Failed"
      );

    }
  };
  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Save some user information
    localStorage.setItem("googleUser", JSON.stringify({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    }));

    // Create a placeholder token so ProtectedRoute works.
    // In a production app, you'd verify the Firebase ID token on your backend.
    localStorage.setItem("token", "google-authenticated");

    alert("Google Login Successful!");

    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Google Login Failed");
  }
};

  return (
    <Layout maxWidth="400px">
      <h1 className="page-title">Login</h1>

      <p className="page-copy login-copy">
        Sign in to access your personalized review dashboard.
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

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
          Sign In
        </button>
              <button
        type="button"
        className="auth-submit"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>

      </form>

      <p className="auth-switch">
        Don't have an account?
        <Link to="/signup"> Create Account</Link>
      </p>

    </Layout>
  );
}

export default Login;