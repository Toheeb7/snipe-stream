function MovieSkeleton({ count = 5 }) {
  return (
    <div className="skeleton-row">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster"></div>

          <div className="skeleton-title"></div>

          <div className="skeleton-rating"></div>
        </div>
      ))}
    </div>
  );
}

export default MovieSkeleton;
