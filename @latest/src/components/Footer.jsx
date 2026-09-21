import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            STREAM <span>SNIPE</span>
          </Link>

          <p>
            Discover movies, explore trailers, and find your next favorite film.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/my-list">My List</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer-links">
          <h3>Categories</h3>

          <Link to="/category/popular">Popular</Link>
          <Link to="/category/top-rated">Top Rated</Link>
          <Link to="/category/upcoming">Upcoming</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Stream Snipe. All rights reserved.</p>

        <p>Movie data provided by TMDB.</p>
      </div>
    </footer>
  );
}

export default Footer;
