import { MovieCard, MoviesList } from './index.js';

let configurations;

const makeHttpCall = (url, method = 'GET') => {
  return fetch(url, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzkzOWZkN2EzYWYwYTgyN2M2YmI3YjYxMTllOTU0YiIsInN1YiI6IjY2NGIzODNiMjdjMGU2OTMxOWVkM2UzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUwDGglMTVwT9-OYHUH4Qrml_zReXFXKf01A5lr4ICc',
      accept: 'application/json',
    },
    method,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`error: ${response.statusText}`);
    }
    return response.json();
  });
};

//images response
makeHttpCall('https://api.themoviedb.org/3/configuration')
  .then((configuration) => {
    configurations = configuration;

    const moviesListURL = new URL(
      'https://api.themoviedb.org/3/discover/movie'
    );

    moviesListURL.searchParams.set('page', '4');
    moviesListURL.searchParams.set('with_genres', '878');

    return makeHttpCall(moviesListURL);
  })
  .then((moviesListJson) => {
    const movieCardPromises = moviesListJson.results.map((movieShortInfo) => {
      return makeHttpCall(`https://api.themoviedb.org/3/movie/${movieShortInfo.id}`)
        .then((movieFullInfo) => {
          const genres = movieFullInfo.genres.map((genre) => genre.name);
          const posterUrl = `${configurations.images.base_url}${configurations.images.poster_sizes[6]}${movieFullInfo.poster_path}`;
          const year = new Date(movieFullInfo.release_date).getFullYear()
          return new MovieCard({
            posterUrl,
            title: movieFullInfo.original_title,
            year,
            genres,
            ranking: movieFullInfo.vote_average,
          });
        });
    });
    Promise.all(movieCardPromises).then((movieCards) => {
      const moviesList = new MoviesList(movieCards);
      document.querySelector('body').append(moviesList.getHtml());
    });
  })
  .catch((error) => {
    console.error(error);
  });
