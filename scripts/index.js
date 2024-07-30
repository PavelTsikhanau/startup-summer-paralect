import { makeHttpCall } from './utils.js';
import { MoviesList } from './movies-list.js';
import { MainContainer } from './main-container.js';
import { Sidebar } from './sidebar.js';

//images response
try {
  const configuration = await makeHttpCall(
    'https://api.themoviedb.org/3/configuration'
  );

  const moviesList = new MoviesList(configuration);

  const sidebar = new Sidebar();

  const mainContainer = new MainContainer(sidebar, moviesList);
  document.querySelector('body').append(mainContainer.html);

  await moviesList.render();

  // setTimeout(async (
  // ) => {
  //   await moviesList.render({
  //     genres: ['16'],
  //     maxRank: '7.6',
  //     sort: 'popularity.asc'
  //   });
  // }, 5000)
} catch (error) {
  console.error(`${error}. Просто включи ВПН!`);
}

//тотал пейдж = 1  -- не нужны стрелки
//current page 1 -- стрелка неактивна
