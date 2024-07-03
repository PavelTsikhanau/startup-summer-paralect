export class MainContainer {
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
