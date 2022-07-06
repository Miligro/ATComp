import axios from "axios";
const postsMain = document.getElementById('template');
const filterBtn = document.getElementById('filter_button');
const title = document.getElementById('title');
const userId = document.getElementById('user_id');
const content = document.getElementById('content');
const sort = document.getElementById('sort');
const sortOrder = document.getElementById('sort_order')
let posts = []

const loadingEl = document.createElement('div')
loadingEl.setAttribute('class', 'loading-small')
loadingEl.innerHTML = `
<h2>Wczytywanie</h2>
<div class="loading-items">
    <div class="loading-item-1"></div>
    <div class="loading-item-2"></div>
    <div class="loading-item-3"></div>
    <div class="loading-item-4"></div>
    <div class="loading-item-5"></div>
    <div class="loading-item-6"></div>
    <div class="loading-item-7"></div>
    <div class="loading-item-8"></div>
</div>
`
document.getElementById('template').appendChild(loadingEl)

function getPosts(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        posts = res.data;
        showPosts(posts);
        loadingEl.remove();
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
    let postsShow = posts.filter((post) => post.title.toLowerCase().search(title.value.toLowerCase()) >= 0);
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

filterBtn.addEventListener('click', filterFunction)

sortOrder.addEventListener('click', ()=>{
    if(sortOrder.value === 'asc'){
        sortOrder.innerHTML = "&#8593;";
        sortOrder.value = 'desc';
    }else{
        sortOrder.value = 'asc';
        sortOrder.innerHTML = '&#8595;'
    };
    filterFunction();
})


getPosts(posts);
