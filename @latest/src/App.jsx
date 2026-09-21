import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import MovieRow from "./components/MovieRow";
import MovieDetails from "./pages/MovieDetails";
import Watch from "./pages/Watch";
import Hero from "./components/Hero";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import MyList from "./pages/MyList";
import Category from "./pages/Category";
import MovieSkeleton from "./components/MovieSkeleton";
import Footer from "./components/Footer";
import About from "./pages/About";

import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getMoviesByGenre,
} from "./services/tmdb";

function Home() {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const [popular, topRated, upcoming, action, comedy, horror] =
          await Promise.all([
            getPopularMovies(),
            getTopRatedMovies(),
            getUpcomingMovies(),
            getMoviesByGenre(28),
            getMoviesByGenre(35),
            getMoviesByGenre(27),
          ]);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);
        setUpcomingMovies(upcoming);
        setActionMovies(action);
        setComedyMovies(comedy);
        setHorrorMovies(horror);

        setFeaturedMovie(popular[0]);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return (
      <main>
        <section className="movie-row">
          <h2>Popular Movies</h2>
          <MovieSkeleton />
        </section>

        <section className="movie-row">
          <h2>Top Rated</h2>
          <MovieSkeleton />
        </section>

        <section className="movie-row">
          <h2>Upcoming</h2>
          <MovieSkeleton />
        </section>
      </main>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main>
      <Hero movie={featuredMovie} />

      <MovieRow
        title="Popular Movies"
        movies={popularMovies}
        onSeeMore={() => navigate("/category/popular")}
      />

      <MovieRow title="Top Rated" movies={topRatedMovies} />

      <MovieRow title="Upcoming Movies" movies={upcomingMovies} />
      <MovieRow title="Action" movies={actionMovies} />
      <MovieRow title="Comedy" movies={comedyMovies} />
      <MovieRow title="Horror" movies={horrorMovies} />
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
