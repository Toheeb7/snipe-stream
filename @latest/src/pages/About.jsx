import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="about-label">ABOUT STREAM SNIPE</span>

        <h1>
          Your gateway to
          <span> great movies.</span>
        </h1>

        <p>
          Stream Snipe is a movie discovery platform designed to help users
          explore popular, highly rated, and upcoming movies, discover trailers,
          and keep track of movies they want to watch.
        </p>
      </section>

      <section className="about-section">
        <div className="about-card">
          <h2>Discover</h2>

          <p>
            Explore movies using categories such as popular, top rated,
            upcoming, and different genres.
          </p>
        </div>

        <div className="about-card">
          <h2>Explore</h2>

          <p>
            View detailed movie information including ratings, genres, release
            dates, descriptions, and recommendations.
          </p>
        </div>

        <div className="about-card">
          <h2>Watch</h2>

          <p>
            Watch available movie trailers directly from the Stream Snipe watch
            page.
          </p>
        </div>
      </section>

      <section className="about-tech">
        <div>
          <span className="about-label">BUILT WITH</span>

          <h2>Modern web technologies</h2>

          <p>
            Stream Snipe was built with React and Vite on the frontend and uses
            the TMDB API to retrieve movie information.
          </p>
        </div>

        <div className="tech-list">
          <span>React</span>
          <span>JavaScript</span>
          <span>Vite</span>
          <span>CSS</span>
          <span>TMDB API</span>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to discover something new?</h2>

        <p>Start exploring movies and find your next favorite film.</p>

        <Link to="/" className="watch-button">
          Explore Movies
        </Link>
      </section>
    </main>
  );
}

export default About;
