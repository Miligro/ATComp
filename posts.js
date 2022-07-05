import axios from "axios";
const postsMain = document.getElementById('template');
const filterBtn = document.getElementById('filter_button');
const title = document.getElementById('title');
const userId = document.getElementById('user_id');
const content = document.getElementById('content');
const sort = document.getElementById('sort');
const sortOrder = document.getElementById('sort_order')
posts = []

function getPosts(){
    axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
        posts = res.data;
        showPosts(posts);
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
        const postEl = document.createElement('div');
        postEl.setAttribute('class', 'post_card');
        
        const titleEl = document.createElement('h2');
        titleEl.innerText = postsToShow[key].title;
        
        const userIdEl = document.createElement('p');
        userIdEl.setAttribute('class', 'user_id');
        userIdEl.innerText = `ID Użytkownika: ${postsToShow[key].userId}`;
        
        const contentEl = document.createElement('p');
        contentEl.setAttribute('class', 'content');
        contentEl.innerText = postsToShow[key].body;
        
        postEl.appendChild(titleEl);
        postEl.appendChild(userIdEl);
        postEl.appendChild(contentEl);
        postsEl.appendChild(postEl)
    }
    postsMain.appendChild(postsEl);
}

function filterFunction(){
    let postsShow = posts.filter((post) => { return post.title.toLowerCase().includes(title.value.toLowerCase())});
    postsShow = postsShow.filter((post) => post.body.toLowerCase().includes(content.value.toLowerCase()));
    if(+userId.value){
        postsShow = postsShow.filter((post) => +post.userId === +userId.value);
    }
    
    postsShow = postsShow.sort((a, b) => {
        if(sortOrder.value === 'desc'){
            if(a[sort.value] < b[sort.value]) { return -1; }
            if(a[sort.value] > b[sort.value]) { return 1; }
            return 0;
        }else{
            if(a[sort.value] > b[sort.value]) { return -1; }
            if(a[sort.value] < b[sort.value]) { return 1; }
            return 0;
        }
    })
    showPosts(postsShow);
}

filterBtn.addEventListener('click', filterFunction)

sortOrder.addEventListener('click', ()=>{
    if(sortOrder.value === 'desc'){
        sortOrder.innerHTML = "&#8595;";
        sortOrder.value = 'asc';
    }else{
        sortOrder.value = 'desc';
        sortOrder.innerHTML = '&#8593;'
    };
    filterFunction();
})

getPosts(posts);
