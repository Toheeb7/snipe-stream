import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyList, removeFromMyList } from "../utils/myList";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MyList() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState(getMyList());

  const handleRemove = (movieId) => {
    removeFromMyList(movieId);

    setMovies(getMyList());
  };

  if (movies.length === 0) {
    return (
      <main className="my-list-page">
        <h1>My List</h1>

        <div className="empty-list">
          <h2>Your list is empty</h2>

          <p>Movies you add to your list will appear here.</p>

          <button className="watch-button" onClick={() => navigate("/")}>
            Browse Movies
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="my-list-page">
      <h1>My List</h1>

      <p className="my-list-count">
        {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
      </p>

      <div className="my-list-grid">
        {movies.map((movie) => (
          <div className="my-list-card" key={movie.id}>
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
            />

            <div className="my-list-info">
              <h3>{movie.title}</h3>

              <p>⭐ {movie.vote_average?.toFixed(1)}</p>

              <button
                className="remove-list-button"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyList;
