import { get, deleteAxios, updateAxios } from '../../api.js'
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
        const el = document.getElementById(`comments${id}`);
        if(el){
            el.remove();
        }
        
        const postEl = document.getElementById(`post${id}`).nextSibling;

        const commentsEl = document.createElement('div')
        commentsEl.setAttribute('id', `comments${id}`)
        commentsEl.setAttribute('class', 'comments-card');
        const loadingCommentsEl = showLoading(commentsEl, '-small');
        commentsEl.appendChild(loadingCommentsEl);
        postsCard = document.getElementById('posts_card');
        if(postEl){
            postsCard.insertBefore(commentsEl, postEl);
        }else{
            postsCard.appendChild(commentsEl)
        }
        commentsEl.style.maxHeight = `${commentsEl.scrollHeight}px`

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
        commentsEl.style.maxHeight = `${commentsEl.scrollHeight}px`
        commentBtn.innerHTML = "Komentarze <i class='fa-solid fa-arrow-down-long'></i>"
        commentBtn.value = 'opened'
    }else{
        const commentsEl = document.getElementById(`comments${id}`)
        commentsEl.style.maxHeight = '0px'
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
            <p class="content">${postsToShow[key].body}</p>
            `
            

        const rowEl = document.createElement('div');
        rowEl.setAttribute('class', 'row-space');
        const innerRowEl = document.createElement('div');
        innerRowEl.setAttribute('class','row-start');

        const removeEl = document.createElement('i');
        removeEl.setAttribute('class', 'fa-solid fa-trash');
        removeEl.setAttribute('id', `remove${postsToShow[key].id}`);

        const editEl = document.createElement('i');
        editEl.setAttribute('class', 'fa-regular fa-pen-to-square');
        editEl.setAttribute('id', `edit${postsToShow[key].id}`);

        innerRowEl.appendChild(removeEl);
        innerRowEl.appendChild(editEl);

        rowEl.appendChild(innerRowEl);
    
        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('id', `comment${postsToShow[key].id}`);
        commentBtn.setAttribute('value', 'closed');
        commentBtn.innerHTML = "Komentarze <i class='fa-solid fa-arrow-up-long'></i>"
        rowEl.appendChild(commentBtn);
        postCard.appendChild(rowEl);

        postsEl.appendChild(postCard);

        commentBtn.addEventListener('click', (e)=>{
            getComments(+e.target.id.slice(7));
        })

        removeEl.addEventListener('click', (e)=>{
            confirmDialog(+e.target.id.slice(6));
        })

        editEl.addEventListener('click', (e)=>{
            editDialog(+e.target.id.slice(4));
        })
    }
    postsMain.appendChild(postsEl);
}

async function deletePost(id){
    const res = await deleteAxios(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return res;
}

getPosts();
createFilters(filters, 'posts');

window.document.addEventListener('filter', ()=>{
    postsShow = filterPosts(posts);
    showPosts(postsShow);
}, false)

function confirmDialog(id){
    const alertDialog = document.createElement("div");
    alertDialog.setAttribute('class', 'alert-dialog');
    alertDialog.setAttribute('id', 'alert-dialog');
    
    window.onclick = function(event) {
        if (event.target == alertDialog) {
            alertDialog.remove();
        }
    } 
    
    const alertContent = document.createElement("div");
    alertContent.setAttribute('class', 'alert-content');

    const icon = document.createElement("span");
    icon.setAttribute('class', 'ask-icon');
    icon.innerText = "?";

    const messagePara = document.createElement("p");
    messagePara.innerText = "Czy chcesz usunąć ten post?";

    const rowEndEl = document.createElement('div');
    rowEndEl.setAttribute('class', 'row-end');

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute('id', 'close-btn');
    closeBtn.innerText = "Zamknij";

    const confirmBtn = document.createElement("button");
    confirmBtn.setAttribute('class', 'delete_button');
    confirmBtn.innerText = "Usuń";

    closeBtn.addEventListener('click', ()=>{
        alertDialog.remove();
    })

    confirmBtn.addEventListener('click', ()=>{
        deletePost(id).then((res)=>{
            alertContent.innerHTML = "";
            if(res === 'success'){
                messagePara.innerText = "Usunięto";
                icon.setAttribute('class', 'success-icon')
                icon.innerHTML = `<i class="fa-solid fa-check"></i>`
            }
            else{
                messagePara.innerText = "Nie udało się usunąć";
                icon.setAttribute('class', 'error-icon')
                icon.innerText = '!'
            }
            alertContent.appendChild(icon);
            alertContent.appendChild(messagePara);
            alertContent.appendChild(closeBtn);
        });
    })

    alertContent.appendChild(icon);
    alertContent.appendChild(messagePara);

    rowEndEl.appendChild(closeBtn);
    rowEndEl.appendChild(confirmBtn);
    alertContent.appendChild(rowEndEl);

    alertDialog.appendChild(alertContent);
    document.body.appendChild(alertDialog);
}

function editDialog(id){
    const post = posts.find((post) => post.id === id);
    if(!post){
        return;
    }
    const alertDialog = document.createElement("div");
    alertDialog.setAttribute('class', 'alert-dialog');
    alertDialog.setAttribute('id', 'alert-dialog');
    
    window.onclick = function(event) {
        if (event.target == alertDialog) {
            alertDialog.remove();
        }
    } 
    
    const alertContent = document.createElement("div");
    alertContent.setAttribute('class', 'alert-content');

    const icon = document.createElement("span");

    const messagePara = document.createElement("p");
    messagePara.innerText = "Edytowanie posta";
    
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'edit-title');
    titleLabel.innerText = 'Tytuł'

    const editTitle = document.createElement('input');
    editTitle.setAttribute('type', 'text');
    editTitle.setAttribute('name', 'edit-title');
    editTitle.value = post.title;

    const contentLabel = document.createElement('label');
    contentLabel.setAttribute('for', 'edit-content');
    contentLabel.innerText = 'Zawartość';

    const editContent = document.createElement('textarea');
    editContent.setAttribute('type', 'text');
    editContent.setAttribute('name', 'edit-content');
    editContent.setAttribute('rows', '10');
    editContent.value = post.body;

    const rowEndEl = document.createElement('div');
    rowEndEl.setAttribute('class', 'row-end');

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute('id', 'close-btn');
    closeBtn.innerText = "Zamknij";

    closeBtn.addEventListener('click', ()=>{
        alertDialog.remove();
    })

    const confirmBtn = document.createElement("button");
    confirmBtn.setAttribute('class', 'save_button');
    confirmBtn.innerText = "Zapisz";

    confirmBtn.addEventListener('click', ()=>{
        updateAxios(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            id: id,
            title: editTitle.value,
            body: editContent.value,
            userId: post.userId,
        }).then((res)=>{
            alertContent.innerHTML = "";
            if(res === 'success'){
                messagePara.innerText = "Pomyślnie zaktualizowano";
                icon.setAttribute('class', 'success-icon')
                icon.innerHTML = `<i class="fa-solid fa-check"></i>`
            }
            else{
                messagePara.innerText = "Nie udało się zaktualizować";
                icon.setAttribute('class', 'error-icon')
                icon.innerText = '!'
            }
            alertContent.appendChild(icon);
            alertContent.appendChild(messagePara);
            alertContent.appendChild(closeBtn);
        })
    })

    rowEndEl.appendChild(closeBtn);
    rowEndEl.appendChild(confirmBtn);

    alertContent.appendChild(messagePara);
    alertContent.appendChild(titleLabel);
    alertContent.appendChild(editTitle);
    alertContent.appendChild(contentLabel);
    alertContent.appendChild(editContent);
    alertContent.appendChild(rowEndEl);

    alertDialog.appendChild(alertContent);
    document.body.appendChild(alertDialog);
}