import { makeHttpCall } from "./utils.js";

export const genresList = await makeHttpCall(
  'https://api.themoviedb.org/3/genre/movie/list'
  );
  
  const genreNameByCode = { 
    '28': 'Action', 
  };

console.log(genresList.genres)

class genreCodeByName {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }
}
