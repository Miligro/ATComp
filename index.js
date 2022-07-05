const path = window.location.pathname.substring(1);
if(path == 'posts') {
    import("./posts.html").then(function (page) {
        document.getElementById('template').innerHTML = page.toString()
        import("./posts.js").then(function (page) {
        });
    });
}else if(path == 'form'){
    import("./form.html").then(function (page) {
        document.getElementById('template').innerHTML = page.toString()
        import("./form.js").then(function (page) {
        });
    });
}