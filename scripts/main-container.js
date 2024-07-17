export class MainContainer {
  constructor(sidebar, moviesList) {
  
    this.html = document.createElement('div');
    this.html.classList.add('container-fluid');
    const mainRow = document.createElement('div');
    mainRow.classList.add('row');
  
    const sidebarColumn = document.createElement('div');
    sidebarColumn.classList.add('col-md-3');
    sidebarColumn.append(sidebar.html);
    mainRow.append(sidebarColumn);
  
    const moviesListColumn = document.createElement('div');
    moviesListColumn.classList.add('col-md-9');
    moviesListColumn.append(moviesList.html);
    mainRow.append(moviesListColumn);

    this.html.append(mainRow)
  }
}
