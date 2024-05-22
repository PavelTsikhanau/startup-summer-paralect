// @ts-check

//movie card +
class MovieCard {
  constructor(data) {
    this.posterUrl = data.posterUrl;
    this.title = data.title;
    this.year = data.year;
    this.ranking = data.ranking;
    this.genres = data.genres;
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

//movies list +
class MoviesList {
  constructor(movieCards) {
    this.movieCards = movieCards;
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

//main container (+ - ?)
class MainContainer {
  getHtml() {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container-fluid');

    const mainRow = document.createElement('div');
    mainRow.classList.add('row');

    const sidebarColumn = document.createElement('div');
    sidebarColumn.classList.add('col-md-3');
    mainRow.append(sidebarColumn);

    const moviesListColumn = document.createElement('div');
    moviesListColumn.classList.add('col-md-9');
    mainRow.append(moviesListColumn);
  }
}

//sidebar (p for text & div for image)
class Sidebar {
  getHtml() {
    const sidebar = document.createElement('div');
    const sidebarLogo = document.createElement('div');
    sidebarLogo.classList.add('sidebar-logo', 'd-flex', 'flex-row-reverse');
    sidebarLogo.innerText = 'ArrowFlicks';
    sidebar.append(sidebarLogo);

    const logoImage = document.createElement('img');
    logoImage.classList.add('logo-image');
    logoImage.setAttribute('src', './images/sidebar-logo.svg');
    sidebarLogo.append(logoImage);

    const moviesBtn = document.createElement('button');
    moviesBtn.classList.add('movies-btn');
    moviesBtn.innerText = 'Movies';
    sidebar.append(moviesBtn);

    const ratedMoviesBtn = document.createElement('button');
    ratedMoviesBtn.classList.add('rated-movies-btn');
    ratedMoviesBtn.innerText = 'Rated movies';
    sidebar.append(ratedMoviesBtn);

    return sidebar;
  }
}

//select form +
class Select {
  constructor(options) {
    this.options = options;
  }
  getHtml() {
    const select = document.createElement('select');
    select.classList.add('form-select');
    select.setAttribute('aria-label', 'Large select example');

    const firstOptionElement = document.createElement('option');
    firstOptionElement.setAttribute('selected', '');
    firstOptionElement.innerText = 'trtrt';
    select.appendChild(firstOptionElement);

    this.options.forEach((option, i) => {
      const optionElement = document.createElement('option');
      optionElement.setAttribute('value', option);
      optionElement.innerText = option;
      select.appendChild(optionElement);
    });
    return select;
  }
}

//pagination (count of 'a' & 'li' attributes)
class Pagination {
  getHtml() {
    const nav = document.createElement('nav');

    const ul = document.createElement('ul');
    ul.classList.add('pagination');
    nav.append(ul);

    const liForPrevious = document.createElement('li');
    liForPrevious.classList.add('page-item');
    ul.append(liForPrevious);

    const aForPrevious = document.createElement('a');
    aForPrevious.classList.add('page-link');
    aForPrevious.setAttribute('href', '#');
    aForPrevious.setAttribute('aria-label', 'Previous');
    liForPrevious.append(aForPrevious);

    const spanForPrevious = document.createElement('span');
    spanForPrevious.setAttribute('aria-hidden', 'true');
    spanForPrevious.innerHTML = '&laquo;';
    aForPrevious.append(spanForPrevious);

    for (let i = 1; i < 4; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      ul.append(li);

      const a = document.createElement('a');
      a.classList.add('page-link');
      a.setAttribute('href', '#');
      a.innerText = i;
      li.append(a);
    }

    const liForNext = document.createElement('li');
    liForNext.classList.add('page-item');
    ul.append(liForNext);

    const aForNext = document.createElement('a');
    aForNext.classList.add('page-link');
    aForNext.setAttribute('href', '#');
    aForNext.setAttribute('aria-label', 'Next');
    liForNext.append(aForNext);

    const spanForNext = document.createElement('span');
    spanForNext.setAttribute('aria-hidden', 'true');
    spanForNext.innerHTML = '&raquo;';
    aForNext.append(spanForNext);

    return nav;
  }
}

//trial period
// const firstMovie = new MovieCard({
//   posterUrl:
//     'https://img.freepik.com/free-photo/the-adorable-illustration-of-kittens-playing-in-the-forest-generative-ai_260559-483.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716220800&semt=ais_user',
//   title: 'Green Mile',
//   year: '1999',
//   ranking: '9.5',
//   genres: ['drama', 'comedy'],
// });

// const secondMovieCard = new MovieCard({
//   posterUrl:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBC7mjvM5ScpKdw_anvVZ7ptcF7gEjF8NWV4p2pZdubQ&s',
//   title: 'Green Mine',
//   year: '2000',
//   ranking: '8',
//   genres: ['drama', 'comedy', 'tragedy'],
// });

// const movieCards = [firstMovie, secondMovieCard];

// const sideBar = new Sidebar();
// const body = document.querySelector('body');
// body.append(sideBar.getHtml());

// const firstSelect = new Select(['1991', '1992', '1993']);
// const body = document.querySelector('body');
// body.append(firstSelect.getHtml());

// const firstMoviesList = new MoviesList(movieCards)

// const body = document.querySelector('body');
// const pagination = new Pagination();
// body.append(pagination.getHtml());
