import { MovieCard, MoviesList } from './index.js';

let configurations;

async function makeHttpCall(url, method = 'GET') {
  const response = await fetch(url, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzkzOWZkN2EzYWYwYTgyN2M2YmI3YjYxMTllOTU0YiIsInN1YiI6IjY2NGIzODNiMjdjMGU2OTMxOWVkM2UzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUwDGglMTVwT9-OYHUH4Qrml_zReXFXKf01A5lr4ICc',
      accept: 'application/json',
    },
    method,
  });
  if (!response.ok) {
    throw new Error(`error: ${response.statusText}`);
  }
  return response.json();
}

//images response
try {
  const configuration = await makeHttpCall(
    'https://api.themoviedb.org/3/configuration'
  );

  const moviesListURL = new URL('https://api.themoviedb.org/3/discover/movie');
  moviesListURL.searchParams.set('page', '4');
  moviesListURL.searchParams.set('with_genres', '878');

  const moviesShortInfo = await makeHttpCall(moviesListURL);

  const movieCardPromises = moviesShortInfo.results.map(
    async (movieShortInfo) => {
      try {
        const movieFullInfo = await makeHttpCall(
          `https://api.themoviedb.org/3/movie/${movieShortInfo.id}`
        );
        const genres = movieFullInfo.genres.map((genre) => genre.name);
        const posterUrl = `${configuration.images.base_url}${configuration.images.poster_sizes[6]}${movieFullInfo.poster_path}`;
        const year = new Date(movieFullInfo.release_date).getFullYear();
        return new MovieCard({
          posterUrl,
          title: movieFullInfo.original_title,
          year,
          genres,
          ranking: movieFullInfo.vote_average,
        });
      } catch (error) {
        console.error(error);
      }
    }
  );

  const movieCards = await Promise.all(movieCardPromises);
  const moviesList = new MoviesList(movieCards);
  document.querySelector('body').append(moviesList.getHtml());
} catch (error) {
  console.error(error);
}

const result = await Promise.resolve('trtrt');

Promise.resolve('trtrt').then((result) => {
  
})
