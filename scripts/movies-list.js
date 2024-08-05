import { MovieCard } from './movie-card.js';
import { makeHttpCall } from './utils.js';
import { Pagination } from './pagination.js';

export class MoviesList {
  #moviesList;
  #pagination;
  constructor(configuration) {
    this.configuration = configuration;
    this.html = document.createElement('div');
    this.html.classList.add('movies-list-wrapper');
    this.#moviesList = document.createElement('div');
    this.#moviesList.classList.add('movies-list');
    this.html.append(this.#moviesList);
    this.#pagination = new Pagination();
    this.html.append(this.#pagination.html);
  }

  async #changePage(page) {
    await this.render({ page });
  }

  async #getMovieCards(filters = {}) {
    const moviesListURL = new URL(
      'https://api.themoviedb.org/3/discover/movie'
    );

    if (filters.page) {
      moviesListURL.searchParams.set('page', filters.page);
    }

    if (filters.genres || filters.genres?.length > 0) {
      moviesListURL.searchParams.set('with_genres', filters.genres.join(','));
    }

    if (filters.language) {
      moviesListURL.searchParams.set('language', filters.language);
    }

    if (filters.year) {
      moviesListURL.searchParams.set('primary_release_year', filters.year);
    }

    if (filters.maxRank) {
      moviesListURL.searchParams.set('vote_average.lte', filters.maxRank);
    }

    if (filters.minRank) {
      moviesListURL.searchParams.set('vote_average.gte', filters.minRank);
    }

    if (filters.sort) {
      moviesListURL.searchParams.set('sort_by', filters.sort);
    }

    const moviesShortInfo = await makeHttpCall(moviesListURL);
    this.#pagination.render(
      moviesShortInfo.total_pages,
      moviesShortInfo.page,
      this.#changePage.bind(this)
    );
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

    return await Promise.all(movieCardPromises);
  }

  async render(filters = {}) {
    const movieCards = await this.#getMovieCards(filters);
    const movieCardsHtml = movieCards.map((movieCard) => {
      return movieCard.getHtml();
    });
    this.#moviesList.replaceChildren();
    this.#moviesList.append(...movieCardsHtml);
  }
}
