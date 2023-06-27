
const name = document.getElementById('search')
const form = document.querySelector('form')
const accessToken = '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'
form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchData()
})

const fetchData = function(){
    fetch(`https://api.github.com/search/users?q=${name.value}`, {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
    })
    .then(res => res.json())
    .then(data => renderUsers(data.items))
}

const renderUsers = function(users) {
    users.forEach(user => {
        const ul = document.querySelector('#user-list')
        let li = document.createElement("li")
        li.textContent = user.login
        li.addEventListener("click", repoLink)
        ul.appendChild(li)
    })
   
}

const repoLink = function(e) {
    console.log(e.target.textContent)
    fetch(`https://api.github.com/users/${e.target.textContent}/repos`, {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
    })
    // .then(res => console.log(res))
    .then(res => res.json())
    .then(repos => renderRepos(repos))
}

const renderRepos = function(repos) {
    repos.forEach(repo => {

        const ul = document.querySelector('#repos-list')
        let li = document.createElement("li")
        li.textContent = repo.html_url
        ul.appendChild(li)
    })
}
