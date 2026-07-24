import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">HomestayReview</h2>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            🏠 Home
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            ℹ️ About
          </Link>
        </li>

        <li>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            📊 Dashboard
          </Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                👤 Login
              </Link>
            </li>

            <li>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                📝 Signup
              </Link>
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