function timeSince(o) {
  var t = Math.floor((new Date - o) / 1e3),
    a = Math.floor(t / 31536e3);
  return a > 1 ? a + " years ago" : (a = Math.floor(t / 2592e3)) > 1 ? a + " months" : (a = Math.floor(t / 86400)) > 1 ? a + " days" : (a = Math.floor(t / 3600)) > 1 ? a + " hours" : (a = Math.floor(t / 60)) > 1 ? a + " minutes" : Math.floor(t) + " seconds"
}

export default class Repo {
  render(repo) {
    console.log(repo)
    let html = document.createElement('li');
    html.id = "repo_${repo.id}"
    html.className = "repo shadow rounded_corners fade-in show"
    html.innerHTML = `
        <div class="repo_wrapper">
         <div class='author'>
          <a href="${repo.html_url}">
            <div class='repo_owner_avatar_url'><img src='${repo.owner.avatar_url}'/></div>
          </a>
        </div>
        <div class="title">
          <div class='repo_git_url'>
            <a href="${repo.html_url}">${repo.name}</a>
          </div>
          <div class="repo_stargazers_count">
            <i class="fas fa-star"></i> ${repo.stargazers_count/1000}k
          </div>
        </div>
        <div class='repo_updated_at'>Last update: ${timeSince(Date.parse(repo.updated_at))}</div>
        <div class='repo_description'>${repo.description}</div>
        <div class="repo_commits_url">
          <svg class="octicon octicon-git-commit" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10.86 7c-.45-1.72-2-3-3.86-3-1.86 0-3.41 1.28-3.86 3H0v2h3.14c.45 1.72 2 3 3.86 3 1.86 0 3.41-1.28 3.86-3H14V7h-3.14zM7 10.2c-1.22 0-2.2-.98-2.2-2.2 0-1.22.98-2.2 2.2-2.2 1.22 0 2.2.98 2.2 2.2 0 1.22-.98 2.2-2.2 2.2z"></path></svg>
          <a href="${repo.html_url}/commits/master">Commits</a>
        </div>
        </div>
        `
    return html
  }
}
