export class Pagination {
  constructor() {
    const nav = document.createElement('nav');

    this.ul = document.createElement('ul');
    this.ul.classList.add('pagination');
    nav.append(this.ul);

    this.liForPrevious = document.createElement('li');
    this.liForPrevious.classList.add('page-item');

    const aForPrevious = document.createElement('a');
    aForPrevious.classList.add('page-link');
    aForPrevious.setAttribute('href', '#');
    aForPrevious.setAttribute('aria-label', 'Previous');
    this.liForPrevious.append(aForPrevious);

    const spanForPrevious = document.createElement('span');
    spanForPrevious.setAttribute('aria-hidden', 'true');
    spanForPrevious.innerHTML = '&laquo;';
    aForPrevious.append(spanForPrevious);

    this.liForNext = document.createElement('li');
    this.liForNext.classList.add('page-item');


    const aForNext = document.createElement('a');
    aForNext.classList.add('page-link');
    aForNext.setAttribute('href', '#');
    aForNext.setAttribute('aria-label', 'Next');
    this.liForNext.append(aForNext);

    const spanForNext = document.createElement('span');
    spanForNext.setAttribute('aria-hidden', 'true');
    spanForNext.innerHTML = '&raquo;';
    aForNext.append(spanForNext);

    this.html = nav;
  }

  render(totalPages, currentPage) {
    this.ul.replaceChildren();
    this.ul.append(this.liForPrevious);
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      this.ul.append(li);

      const a = document.createElement('a');
      a.classList.add('page-link');
      a.setAttribute('href', '#');
      a.innerText = i;
      li.append(a);

      if(i === currentPage) {
        li.classList.add('current-page');
      }
    }
    this.ul.append(this.liForNext);
  }
}
