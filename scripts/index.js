import { makeHttpCall } from './utils.js';
import { MoviesList } from './movies-list.js';
import { MainContainer } from './main-container.js';
import { Sidebar } from './sidebar.js';

try {
  const configuration = await makeHttpCall(
    'https://api.themoviedb.org/3/configuration'
  );

  const moviesList = new MoviesList(configuration);

  const sidebar = new Sidebar();

  const mainContainer = new MainContainer(sidebar, moviesList);
  document.querySelector('body').append(mainContainer.html);

  await moviesList.render();
} catch (error) {
  console.error(`${error}`);
}
