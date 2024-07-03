import { makeHttpCall } from './utils.js';

export const genresResponse = await makeHttpCall(
  'https://api.themoviedb.org/3/genre/movie/list'
);

const genresList = genresResponse.genres;
const genreNameByCode = {};
const genreCodeByName = {};

genresList.forEach((item) => {
  genreNameByCode[item.id] = item.name;
});

genresList.forEach((item) => {
  genreCodeByName[item.name] = item.id;
});

console.log(genreNameByCode);
console.log(genreCodeByName);
