const loadingEl = document.createElement('div')
loadingEl.setAttribute('class', 'loading')
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
document.body.insertBefore(loadingEl, document.body.firstChild);

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
                loadingEl.remove();
            });
        })
    } else {
        page = await import('../notFound.html')
        document.getElementById('template').innerHTML=page[1]
        loadingEl.remove();
    }
};