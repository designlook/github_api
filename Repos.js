import Repo from './Repo.js';
import AjaxLoader from './AjaxLoader.js';


export default class Repos {
  constructor(options) {
    this.url = options.url || "https://api.github.com/search/repositories"
    this.list_div = document.getElementById("maincontent")
    this.per_page = options.per_page || 10
    this.q = options.q || 'language:javascript'
    this.ajax_loader = new AjaxLoader(this.list_div)
    this.lastRowList
    this.page = 0
    this.allow_scroll = true
    this.init()
  }

  init() {
    this.getList()
  }

  getList() {
    let parent = this
    this.toggle_loader(true)
    this.request().then(data => {
      parent.toggle_loader()
      parent.render(data).then(data => {
        this.activate_scroller()
      })
    }).catch(reason => console.log(reason))
  }

  async render(data) {
    let html = ''
    data.items.map(repo => {
      this.list_div.appendChild(new Repo().render(repo) )
    })
      this.list_div.insertAdjacentHTML('beforeend', html)
      this.lastRowList = document.querySelector("#maincontent li:last-child")
    return Promise.resolve(html);
  }

  async request() {
    this.page++
    console.log(this.page)
    let url = new URL(this.url)
    let params = {
      q: this.q,
      sort: 'stars',
      order: 'desc',
      page: this.page
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const response = await fetch(url);
    const json = await response.json();
    this.allow_scroll = true
    return json
  }

  respondToVisibility(element, callback) {
    var options = {
      root: document.documentElement
    }
    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    });
    observer.observe(element);
  }

  activate_scroller() {
    let parent = this
    this.respondToVisibility(this.lastRowList, visible => {
      if (visible) {
        parent.getList()
        parent.allow_scroll = false
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  toggle_loader(show = false) {
    if (show) {
      this.ajax_loader.show()
    } else {
      this.ajax_loader.hide()
    }
    return true
  }
}



