import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Signup() {
  return (
    <Layout maxWidth="400px">
      <h1 className="page-title">
        Create Account
      </h1>

      <p className="page-copy login-copy">
        Create your profile to save comparisons and track homestay review insights.
      </p>

      <form className="auth-form">
        <input
          type="text"
          placeholder="Full name"
          className="auth-input"
        />

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
        />

        <button
          type="submit"
          className="auth-submit"
        >
          Create Account
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Layout>
  );
}

export default Signup;
