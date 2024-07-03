import { makeHttpCall} from './utils.js';

export class MovieCard {
  // constructor(data) {
    //   this.posterUrl = data.posterUrl;
    //   this.title = data.title;
    //   this.year = data.year;
    //   this.ranking = data.ranking;
    //   this.genres = data.genres;
    // }
    
    constructor(id, configuration) {
      this.id = id;
      this.configuration = configuration;
    }

    async init() {
      const movieFullInfo = await makeHttpCall(
        `https://api.themoviedb.org/3/movie/${this.id}`
      );
      this.genres = movieFullInfo.genres.map((genre) => genre.name);
      this.posterUrl = `${this.configuration.images.base_url}${this.configuration.images.poster_sizes[6]}${movieFullInfo.poster_path}`;
      this.year = new Date(movieFullInfo.release_date).getFullYear();
      this.title = movieFullInfo.original_title;
      this.ranking = movieFullInfo.vote_average;

  }

  getHtml() {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card', 'card', 'mb-3');

    const cardRow = document.createElement('div');
    cardRow.classList.add('row', 'g-0');
    movieCard.append(cardRow);

    const cardColImg = document.createElement('div');
    cardColImg.classList.add('col-md-4');
    cardRow.append(cardColImg);

    const poster = document.createElement('img');
    poster.classList.add('poster', 'card-img-top');
    poster.setAttribute('src', this.posterUrl);
    cardColImg.append(poster);

    const cardColBody = document.createElement('div');
    cardColBody.classList.add('col-md-8');
    cardRow.append(cardColBody);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardColBody.append(cardBody);

    const title = document.createElement('h2');
    title.classList.add('title', 'card-title');
    title.innerText = this.title;
    cardBody.append(title);

    const year = document.createElement('p');
    year.classList.add('year', 'text-body-secondary');
    year.innerText = this.year;
    cardBody.append(year);

    const ranking = document.createElement('div');
    ranking.classList.add('ranking', 'card-text');
    ranking.innerText = this.ranking;
    cardBody.append(ranking);

    const genres = document.createElement('p');
    genres.classList.add('genres', 'text-body-secondary');
    genres.innerText = this.genres.join(', ');
    cardBody.append(genres);

    return movieCard;
  }
}
