function MovieDetailsSkeleton() {
  return (
    <main className="movie-details-skeleton">
      <div className="skeleton-details-content">
        <div className="skeleton-back-button"></div>

        <div className="skeleton-details-layout">
          <div className="skeleton-details-poster"></div>

          <div className="skeleton-details-info">
            <div className="skeleton-details-title"></div>

            <div className="skeleton-details-meta"></div>

            <div className="skeleton-details-text"></div>
            <div className="skeleton-details-text short"></div>

            <div className="skeleton-details-genres">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="skeleton-details-buttons">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetailsSkeleton;
