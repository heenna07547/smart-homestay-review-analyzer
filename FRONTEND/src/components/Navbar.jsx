import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">HomestayReview</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">🏠 Home</Link>
        </li>

        <li>
          <Link to="/about">ℹ️ About</Link>
        </li>

        <li>
          <Link to="/dashboard">📊 Dashboard</Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link to="/login">👤 Login</Link>
            </li>

            <li>
              <Link to="/signup">📝 Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="nav-btn logout-btn"
            >
              🚪 Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;