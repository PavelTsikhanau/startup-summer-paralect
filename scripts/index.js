import { makeHttpCall } from './utils.js';
import { MoviesList } from './movies-list.js';
import { genresResponse } from './genres.js';

//images response
try {
  const configuration = await makeHttpCall(
    'https://api.themoviedb.org/3/configuration'
  );

  const moviesList = new MoviesList(configuration);
  await moviesList.loadMovies({
    genre: '878',
    page: '10',
    minRank: '7.4',
    maxRank: '7.6',
    sort: 'popularity.desc'
  });
  document.querySelector('body').append(moviesList.getHtml());
} catch (error) {
  console.error(error);
}
