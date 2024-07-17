export class Select {
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
