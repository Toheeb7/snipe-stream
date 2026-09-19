const KEY = "streamSnipeMyList";

export function getMyList() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function isInMyList(movieId) {
  const list = getMyList();

  return list.some((movie) => movie.id === movieId);
}

export function addToMyList(movie) {
  const list = getMyList();

  if (!list.some((item) => item.id === movie.id)) {
    localStorage.setItem(KEY, JSON.stringify([...list, movie]));
  }
}

export function removeFromMyList(movieId) {
  const list = getMyList().filter((movie) => movie.id !== movieId);

  localStorage.setItem(KEY, JSON.stringify(list));
}
