import { MovieCard, MoviesList } from './index.js';

const moviesListURL = new URL('https://api.themoviedb.org/3/discover/movie');

moviesListURL.searchParams.set('page', '4');
moviesListURL.searchParams.set('with_genres', '878');

const headers = {
  Authorization: '',
  accept: 'application/json',
};

fetch(moviesListURL, {
  headers,
  method: 'GET',
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`error: ${response.statusText}`);
    }
    return response.json();
  })
  .then((body) => {
    const movieCardPromises = body.results.map((movie) => {
      return fetch(`https://api.themoviedb.org/3/movie/${movie.id}`, {
        headers,
        method: 'GET',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`error: ${response.statusText}`);
          }
          return response.json();
        })
        .then((body) => {
          const genres = body.genres.map((genre) => genre.name);
          return new MovieCard({
            posterUrl: body.poster_path,
            title: body.original_title,
            genres,
            ranking: body.vote_average,
          });
        });
    });
    Promise.all(movieCardPromises).then((movieCards) => {
      const moviesList = new MoviesList(movieCards);
      document.querySelector('body').append(moviesList.getHtml());
    });
    console.log(body.results);
  })
  .catch((error) => {
    console.error(error);
  });
