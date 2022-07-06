const loading = document.getElementById('loading');

const pages = {
    posts: {
        html: import('../pages/posts/posts.html'),
        scripts(){
            import('../pages/posts/posts.js')
        }
    },
    form: {
        html: import('../pages/form/form.html'),
        scripts(){
            import('../pages/form/form.js')
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
            document.getElementById('template').innerHTML=page.toString()
            toLoad.scripts();
        })
    } else {
        page = await import('../notFound.html')
        document.getElementById('template').innerHTML=page.toString()
    }
};