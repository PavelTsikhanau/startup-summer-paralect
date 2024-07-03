export class Pagination {
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
