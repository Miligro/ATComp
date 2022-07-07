import axios from "axios";
import { show as showLoading, destroy as destroyLoading } from "../../loading";
const postsMain = document.getElementById('template');

const filterForm = document.forms[0]
let inputs = ['title', 'userId', 'content', 'sort', 'sortOrder']

let posts = []
let postsShow = []
const loadingEl = showLoading(document.getElementById('template'));

function getPosts(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        posts = res.data;
        checkStorage();
        destroyLoading(loadingEl);
    }).catch(err => console.log(err));
}

function showPosts(postsToShow){
    const el = document.getElementById('posts_card');
    if(el){
        el.remove();
    }
    const postsEl = document.createElement('div');
    postsEl.setAttribute('id', 'posts_card');

    for(key in postsToShow){
        postsEl.innerHTML += `
        <div class="post_card">
            <h2>${postsToShow[key].title}</h2>
            <p class="user_id">ID Użytkownika: ${postsToShow[key].userId}</p>
            <p class="content">${postsToShow[key].body}</p>
        </div>`
    }
    postsMain.appendChild(postsEl);
}

function filterFunction(){
    postsShow = posts.filter((post) => post.title.toLowerCase().search(filterForm['title'].value.toLowerCase()) >= 0);
    postsShow = postsShow.filter((post) => post.body.toLowerCase().search(filterForm['content'].value.toLowerCase()) >= 0);
    if(+filterForm['userId'].value){
        postsShow = postsShow.filter((post) => +post.userId === +filterForm['userId'].value);
    }
    
    postsShow = postsShow.sort((a, b) => {
        if(filterForm['sortOrder'].value === 'desc'){
            return a[filterForm['sort'].value] >= b[filterForm['sort'].value] ? 1 : -1;
        }else{
            return a[filterForm['sort'].value] <= b[filterForm['sort'].value] ? 1 : -1;
        }
    })
    showPosts(postsShow);
}

filterForm['filter_button'].addEventListener('click', ()=>{
    for(inputName of inputs){
        localStorage.setItem(inputName, filterForm[inputName].value)
    }
    filterFunction();
})

filterForm['sortOrder'].addEventListener('click', ()=>{
    if(filterForm['sortOrder'].value === 'asc'){
        filterForm['sortOrder'].innerHTML = "&#8595;";
        filterForm['sortOrder'].value = 'desc';
    }else{
        filterForm['sortOrder'].value = 'asc';
        filterForm['sortOrder'].innerHTML = '&#8593;'
    };
    localStorage.setItem('sortOrder', filterForm['sortOrder'].value);
    filterFunction();
})

function checkStorage(){
    for(inputName of inputs) {
        let value = localStorage.getItem(inputName);
        if(value !== null){
            console.log(`${inputName}: ${value}`)
            filterForm[inputName].value=value
        }   
    }
    filterForm['sortOrder'].value === 'asc' ? filterForm['sortOrder'].innerHTML = "&#8593;" : filterForm['sortOrder'].innerHTML = "&#8595;"
    filterFunction();
}

filterForm['reset_filter_button'].addEventListener('click', ()=>{
    for(inputName of inputs){
        localStorage.setItem(inputName, '')
    }
    localStorage.setItem('sort', 'title');
    localStorage.setItem('sortOrder', 'asc');
    checkStorage();
})

getPosts(posts);