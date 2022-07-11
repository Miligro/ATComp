import {show as showLoading, destroy as destroyLoading} from "../loading.js"
const loadingEl = showLoading(document.body, '')
const pages = {
    posts: {
        main: {
            html: import('../pages/posts/posts.html'),
            scripts(){
                return import('../pages/posts/posts.js')
            }
        },
    },
    form: {
        main:{
            html: import('../pages/form/form.html'),
            scripts(){
                return import('../pages/form/form.js')
            }
        },
    },
    albums: {
        main: {
            html: import('../pages/albums/albums.html'),
            scripts(){
                return import('../pages/albums/albums.js')
            }
        },
        id:{
            main:{
                html: import('../pages/albums/albumPhotos/albumPhotos.html'),
                scripts(){
                    return import('../pages/albums/albumPhotos/albumPhotos.js')
                }
            },
        }
    }
}

const path = window.location.pathname.substring(1).split('/');
loadPage(path);

async function loadPage(pagesNames){
    if(path[0] === ""){
        mainPage();
        return;
    }
    let page = null
    if(pages[pagesNames[0]]){
        page = pages[pagesNames[0]]
    }else{
        notFound();
        return;
    }
    for(let i=1; i < pagesNames.length; i++){
        if(!isNaN(+pagesNames[i])){
            if(page['id']){
                page = page['id'];
            }else{
                notFound();
                return;
            }
        }else{
            if(page[pagesNames[i]]){
                page = page[pagesNames[i]];
            }else{
                notFound();
                return;
            }
        }
    }
    let toLoad = page['main']
    toLoad.html.then(async (page) => {
        document.getElementById('template').innerHTML=page[1]
        toLoad.scripts().then(()=>{
            destroyLoading(loadingEl)
        });
    })
};

async function notFound(){
    let page = await import('../pages/notFound/notFound.html');
    document.getElementById('template').innerHTML=page[1];
    loadingEl.remove(loadingEl);
}

async function mainPage(){
    let page = await import('../pages/main/main.html');
    document.getElementById('template').innerHTML=page[1];
    loadingEl.remove(loadingEl);
}