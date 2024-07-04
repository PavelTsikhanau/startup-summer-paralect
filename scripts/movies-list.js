import { MovieCard } from './movie-card.js';
import { makeHttpCall } from './utils.js';

export class MoviesList {
  // constructor(movieCards) {
  //   this.movieCards = movieCards;
  // }

  constructor(configuration) {
    this.configuration = configuration;
  }

  async loadMovies(filters = {}) {
    const moviesListURL = new URL(
      'https://api.themoviedb.org/3/discover/movie'
    );

    if (filters.page !== undefined) {
      moviesListURL.searchParams.set('page', filters.page);
    }

    if (filters.genre !== undefined) {
      moviesListURL.searchParams.set('with_genres', filters.genre);
    }

    if (filters.language !== undefined) {
      moviesListURL.searchParams.set('language', filters.language);
    }

    if (filters.year !== undefined) {
      moviesListURL.searchParams.set('primary_release_year', filters.year);
    }

    if (filters.maxRank !== undefined) {
      moviesListURL.searchParams.set('vote_average.lte', filters.maxRank);
    }

    if (filters.minRank !== undefined) {
      moviesListURL.searchParams.set('vote_average.gte', filters.minRank);
    }

    if (filters.sort !== undefined) {
      moviesListURL.searchParams.set('sort_by', filters.sort);
    }

    const moviesShortInfo = await makeHttpCall(moviesListURL);
    const movieCardPromises = moviesShortInfo.results.map(
      async (movieShortInfo) => {
        try {
          const movieCard = new MovieCard(
            movieShortInfo.id,
            this.configuration
          );
          await movieCard.init();
          return movieCard;
        } catch (error) {
          console.error(error);
        }
      }
    );

    this.movieCards = await Promise.all(movieCardPromises);
  }

  getHtml() {
    const moviesList = document.createElement('div');
    moviesList.classList.add('movies-list');
    this.movieCards.forEach((movieCard) => {
      moviesList.appendChild(movieCard.getHtml());
    });
    return moviesList;
  }
}
