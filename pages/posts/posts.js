import { get } from '../../api.js'
import { show as showLoading, destroy as destroyLoading } from "../../loading";
import {createFilters, onFilter as filterPosts, checkStorage } from "../../filters.js"
const postsMain = document.getElementById('template');

let posts = []
let postsShow = []

const filters = [
    {
        placeholder: 'Tytuł',
        type: 'text',
        id: 'title',
    },
    {
        placeholder: 'ID Użytkownika',
        type: 'number',
        id: 'userId',
    },
    {
        placeholder: 'Zawartość',
        type: 'text',
        id: 'body',
    },
    {
        type: 'select',
        options: [
            {
                value: 'title',
                text: 'Tytuł'
            },
            {
                value: 'userId',
                text: 'ID użytkownika'
            },
            {
                value: 'body',
                text: 'Zawartość'
            }
        ],
        id: 'sort',
    },
]
const loadingEl = showLoading(document.getElementById('template'), '');

async function getPosts(){
    posts = await get('https://jsonplaceholder.typicode.com/posts')
    checkStorage();
    destroyLoading(loadingEl);
}

async function getComments(id){
    const commentBtn = document.getElementById(`comment${id}`);
    
    if(commentBtn.value === 'closed'){
        const postEl = document.getElementById(`post${id}`).nextSibling;
        const commentsEl = document.createElement('div')
        commentsEl.setAttribute('id', `comments${id}`)
        commentsEl.setAttribute('class', 'comments-card');
        const loadingCommentsEl = showLoading(document.getElementById('template'), '-small');
        commentsEl.appendChild(loadingCommentsEl);
        postsCard = document.getElementById('posts_card');
        if(postEl){
            postsCard.insertBefore(commentsEl, postEl);
        }else{
            postsCard.appendChild(commentsEl)
        }

        const comments = await get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

        destroyLoading(loadingCommentsEl);

        for(let comment of comments){
            commentsEl.innerHTML += `
            <div class="comment-card">
                <h3>${comment.name}</h3>
                <p>${comment.body}</p>
                <p class='small'>email: ${comment.email}</p>
                <hr>
            </div>
            `
        }
        
        commentBtn.innerHTML = "Komentarze <i class='fa-solid fa-arrow-down-long'></i>"
        commentBtn.value = 'opened'
    }else{
        const commentsEl = document.getElementById(`comments${id}`)
        commentsEl.remove()
        commentBtn.innerHTML = "Komentarze <i class='fa-solid fa-arrow-up-long'></i>"
        commentBtn.value = 'closed'
    }
}

function showPosts(postsToShow){
    const el = document.getElementById('posts_card');
    if(el){
        el.remove();
    }
    const postsEl = document.createElement('div');
    postsEl.setAttribute('id', 'posts_card');
    postsEl.setAttribute('class', 'cards_container');

    for(key in postsToShow){
        const postCard = document.createElement('div');
        postCard.setAttribute('class', 'card');
        postCard.setAttribute('id', `post${postsToShow[key].id}`)
        postCard.innerHTML = `
            <h2>${postsToShow[key].title}</h2>
            <p class="user_id">ID Użytkownika: ${postsToShow[key].userId}</p>
            <p class="content">${postsToShow[key].body}</p>`
            
        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('id', `comment${postsToShow[key].id}`);
        commentBtn.setAttribute('value', 'closed');
        commentBtn.innerHTML = "Komentarze <i class='fa-solid fa-arrow-up-long'></i>"
        postCard.appendChild(commentBtn);
        postsEl.appendChild(postCard);

        commentBtn.addEventListener('click', (e)=>{
            getComments(+e.target.id.slice(7));
        })
    }
    postsMain.appendChild(postsEl);
}

getPosts();
createFilters(filters);

window.document.addEventListener('filter', ()=>{
    postsShow = filterPosts(posts);
    showPosts(postsShow);
}, false)
