export class Pagination {
  constructor() {
    const nav = document.createElement('nav');

    this.ul = document.createElement('ul');
    this.ul.classList.add('pagination');
    nav.append(this.ul);

    this.liForPrevious = document.createElement('li');
    this.liForPrevious.classList.add('page-item');

    this.aForPrevious = document.createElement('a');
    this.aForPrevious.classList.add('page-link');
    this.aForPrevious.setAttribute('href', '#');
    this.aForPrevious.setAttribute('aria-label', 'Previous');
    this.liForPrevious.append(this.aForPrevious);

    const spanForPrevious = document.createElement('span');
    spanForPrevious.setAttribute('aria-hidden', 'true');
    spanForPrevious.innerHTML = '&laquo;';
    this.aForPrevious.append(spanForPrevious);

    this.liForNext = document.createElement('li');
    this.liForNext.classList.add('page-item');

    this.aForNext = document.createElement('a');
    this.aForNext.classList.add('page-link');
    this.aForNext.setAttribute('href', '#');
    this.aForNext.setAttribute('aria-label', 'Next');
    this.liForNext.append(this.aForNext);

    const spanForNext = document.createElement('span');
    spanForNext.setAttribute('aria-hidden', 'true');
    spanForNext.innerHTML = '&raquo;';
    this.aForNext.append(spanForNext);

    this.html = nav;
  }

  #getPaginationOffset(totalPages, currentPage) {
    if (totalPages >= 7) {
      return {
        leftOffset: 3,
        rightOffset: 3,
      };
    } else {
      return {
        leftOffset: 3,
        rightOffset: 3,
      };
    }
  }

  render(totalPages, currentPage, changePageCb) {
    this.ul.replaceChildren();
    this.ul.append(this.liForPrevious);
    let offset = this.#getPaginationOffset(totalPages, currentPage);
    let startPage = currentPage - offset.leftOffset;
    let endPage = currentPage + offset.rightOffset;
    if (totalPages < 7) {
      startPage = 1;
      endPage = totalPages;
    }

    if (startPage < 1) {
      endPage = endPage + (1 - startPage);
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage = startPage - (endPage - totalPages);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement('li');

      li.classList.add('page-item');
      this.ul.append(li);

      const a = document.createElement('a');
      a.classList.add('page-link');
      a.setAttribute('data-page', i);
      a.setAttribute('href', '#');
      a.innerText = i;
      li.append(a);

      a.addEventListener('click', (event) => {
        event.preventDefault();
        changePageCb(event.target.getAttribute('data-page'));
      });

      if (i === currentPage) {
        li.classList.add('current-page');
      }
    }

    //arrow button
    if (currentPage === 1) {
      this.aForPrevious.classList.add('disabled');
    } else {
      this.aForPrevious.classList.remove('disabled');
    }
    this.aForPrevious.onclick = (event) => {
      event.preventDefault();
      changePageCb(currentPage - 1);
    };

    if (currentPage === totalPages) {
      this.aForNext.classList.add('disabled');
    } else {
      this.aForNext.classList.remove('disabled');
    }
    this.aForNext.onclick = (event) => {
      event.preventDefault();
      changePageCb(currentPage - 1);
    };

    this.ul.append(this.liForNext);
  }
}
