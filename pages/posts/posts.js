import axios from "axios";
import { show as showLoading, destroy as destroyLoading } from "../../loading";
const postsMain = document.getElementById('template');
const filterBtn = document.getElementById('filter_button');
const title = document.getElementById('title');
const userId = document.getElementById('user_id');
const content = document.getElementById('content');
const sort = document.getElementById('sort');
const sortOrder = document.getElementById('sort_order')
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
    postsShow = posts.filter((post) => post.title.toLowerCase().search(title.value.toLowerCase()) >= 0);
    postsShow = postsShow.filter((post) => post.body.toLowerCase().search(content.value.toLowerCase()) >= 0);
    if(+userId.value){
        postsShow = postsShow.filter((post) => +post.userId === +userId.value);
    }
    
    postsShow = postsShow.sort((a, b) => {
        if(sortOrder.value === 'desc'){
            return a[sort.value] >= b[sort.value] ? 1 : -1;
        }else{
            return a[sort.value] <= b[sort.value] ? 1 : -1;
        }
    })
    showPosts(postsShow);
}

filterBtn.addEventListener('click', ()=>{
    localStorage.setItem('title', title.value);
    localStorage.setItem('content', content.value);
    localStorage.setItem('userId', userId.value);
    localStorage.setItem('sort', sort.value);
    localStorage.setItem('sortOrder', sortOrder.value);
    filterFunction();
})

sortOrder.addEventListener('click', ()=>{
    if(sortOrder.value === 'asc'){
        sortOrder.innerHTML = "&#8595;";
        sortOrder.value = 'desc';
    }else{
        sortOrder.value = 'asc';
        sortOrder.innerHTML = '&#8593;'
    };
    localStorage.setItem('sortOrder', sortOrder.value);
    filterFunction();
})


function checkStorage(){
    title.value = localStorage.getItem('title');
    content.value = localStorage.getItem('content');
    userId.value = localStorage.getItem('userId');
    sort.value = localStorage.getItem('sort');
    sortOrder.value = localStorage.getItem('sortOrder');
    if(sortOrder.value === 'asc'){
        sortOrder.innerHTML = "&#8593;";
    }else{
        sortOrder.innerHTML = "&#8595;";
    }
    filterFunction();
}

getPosts(posts);