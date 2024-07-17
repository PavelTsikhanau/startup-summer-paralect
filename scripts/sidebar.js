export class Sidebar {
  constructor() {
    this.html = document.createElement('div');
    const sidebarLogo = document.createElement('div');
    sidebarLogo.classList.add('sidebar-logo', 'd-flex', 'flex-row-reverse');
    sidebarLogo.innerText = 'ArrowFlicks';
    this.html.append(sidebarLogo);

    const logoImage = document.createElement('img');
    logoImage.classList.add('logo-image');
    logoImage.setAttribute('src', './images/sidebar-logo.svg');
    sidebarLogo.append(logoImage);

    const moviesBtn = document.createElement('button');
    moviesBtn.classList.add('movies-btn');
    moviesBtn.innerText = 'Movies';
    this.html.append(moviesBtn);

    const ratedMoviesBtn = document.createElement('button');
    ratedMoviesBtn.classList.add('rated-movies-btn');
    ratedMoviesBtn.innerText = 'Rated movies';
    this.html.append(ratedMoviesBtn);
  }
}
