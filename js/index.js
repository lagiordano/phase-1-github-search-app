document.addEventListener("DOMContentLoaded", initialize);

function initialize () {

const form = document.querySelector("#github-form");
const githubContainer = document.querySelector("#github-container");
let userList = document.querySelector("#user-list");
let reposList = document.querySelector("#repos-list");


form.addEventListener("submit", e => {
    e.preventDefault();
    const search = form.search.value;
    
    fetch(`https://api.github.com/search/users?q=${search}`)
    .then(res => res.json())
    .then(data => {
        users = data.items;
        users.forEach(user => {
            const li = document.createElement("li");
            li.classList.add("user");
            li.textContent = user.login;
            const nestedUl = document.createElement("ul");
            li.appendChild(nestedUl);
            nestedUl.innerHTML = `
                <li><img src=${user.avatar_url} width="15%"></li>
                <li><a href=${user.html_url}>Profile URL</a></li>
            `;

            userList.appendChild(li);

            li.addEventListener("click", () => {
                displayRepos(user);
            });

        });
    });
});



function displayRepos (user) {
    let userName = user.login;
    
    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(res => res.json())
        .then(data => {
            data.forEach(repo => {
                let li = document.createElement("li");
                li.textContent = `${repo.name}: `
                let a = document.createElement("a");
                a.setAttribute("href", repo.clone_url);
                a.textContent = repo.clone_url;
                li.appendChild(a);
                reposList.appendChild(li);
            });
        });
    

}
  























};