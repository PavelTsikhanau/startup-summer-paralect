export class Pagination {
  constructor() {
    const nav = document.createElement('nav');

    this.ul = document.createElement('ul');
    this.ul.classList.add('pagination');
    nav.append(this.ul);

    this.liForPrevious = document.createElement('li');
    this.liForPrevious.classList.add('page-item');

    this.aForFirst = document.createElement('a');
    this.aForFirst.classList.add('page-link');
    this.aForFirst.setAttribute('href', '#');
    this.aForFirst.setAttribute('aria-label', 'Previous');
    this.liForPrevious.append(this.aForFirst);

    const spanForPrevious = document.createElement('span');
    spanForPrevious.setAttribute('aria-hidden', 'true');
    spanForPrevious.innerHTML = '&laquo;';
    this.aForFirst.append(spanForPrevious);

    this.liForNext = document.createElement('li');
    this.liForNext.classList.add('page-item');

    const aForLast = document.createElement('a');
    aForLast.classList.add('page-link');
    aForLast.setAttribute('href', '#');
    aForLast.setAttribute('aria-label', 'Next');
    this.liForNext.append(aForLast);

    const spanForNext = document.createElement('span');
    spanForNext.setAttribute('aria-hidden', 'true');
    spanForNext.innerHTML = '&raquo;';
    aForLast.append(spanForNext);

    this.html = nav;
  }

  #getPaginationOffset(totalPages, currentPage) {
    if(totalPages >= 7) {
      return {
        leftOffset: 3,
        rightOffset: 3,
      }
    }
    
  }

  render(totalPages, currentPage, changePageCb) {
    this.ul.replaceChildren();
    this.ul.append(this.liForPrevious);
    let offset = this.#getPaginationOffset(totalPages, currentPage);
    let startPage = currentPage - offset.leftOffset;
    let endPage = currentPage + offset.rightOffset;
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

      //arrow button
      if (currentPage === 1) {
        this.aForFirst.classList.add('disabled');
      } else {
        this.aForFirst.classList.remove('disabled');
      }

      this.aForFirst.addEventListener('click', (event) => {
        event.preventDefault();
        changePageCb()
      })
    }
    this.ul.append(this.liForNext);
  }
}

//start page 1-3 (-2)
//current 1
//end 1+3 (4)
