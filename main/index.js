import {show as showLoading, destroy as destroyLoading} from "../loading.js"
const loadingEl = showLoading(document.body, '')
const pages = {
    posts: {
        html: import('../pages/posts/posts.html'),
        scripts(){
            return import('../pages/posts/posts.js')
        }
    },
    form: {
        html: import('../pages/form/form.html'),
        scripts(){
            return import('../pages/form/form.js')
        }
    }
}
const path = window.location.pathname.substring(1);
loadPage(path);

async function loadPage(pageName){
    let page = null
    if(pages[pageName]) {
        let toLoad = pages[pageName]
        toLoad.html.then(async (page) => {
            document.getElementById('template').innerHTML=page[1]
            toLoad.scripts().then(()=>{
                destroyLoading(loadingEl)
            });
        })
    } else {
        page = await import('../pages/notFound/notFound.html')
        document.getElementById('template').innerHTML=page[1]
        loadingEl.remove(loadingEl);
    }
};