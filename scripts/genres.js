import { makeHttpCall } from './utils.js';

export const genresResponse = await makeHttpCall(
  'https://api.themoviedb.org/3/genre/movie/list'
);

const genresList = genresResponse.genres;

const genreCodeByName = genresList.reduce((accum, item) => {
  accum[item.name] = item.id;
  return accum;
}, {});

const genreNameByCode = genresList.reduce((accum, item) => {
  accum[item.id] = item.name;
  return accum;
}, {});

console.log(genreCodeByName);
console.log(genreNameByCode);
