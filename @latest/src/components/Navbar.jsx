import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          STREAM <span>SNIPE</span>
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/my-list" onClick={closeMenu}>
            My List
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About
          </Link>

          <Link to="/search" onClick={closeMenu}>
            🔍 Search
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
