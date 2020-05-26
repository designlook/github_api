export default class AjaxLoader {
  constructor(list_div) {
    this.list_div = list_div
    this.init()
  }
  init() {
    let html = `
      <div id="load-more" class="top_rounded_corners hide">
        <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="2"></circle>
        </svg>
        <span>Loading ...</span>
      </div>`
    this.list_div.insertAdjacentHTML('beforebegin', html)
  }

  hide() {
    document.getElementById("load-more").classList.add('hide');
  }

  show() {
    document.getElementById("load-more").classList.remove('hide');
  }
}