const path = window.location.pathname.substring(1);
if(path == 'posts') {
    import("./posts.html").then(function (page) {
        document.getElementById('template').innerHTML = page.toString()
        import("./posts.js")
    });
}else if(path == 'form'){
    import("./form.html").then(function (page) {
        document.getElementById('template').innerHTML = page.toString()
        import("./form.js")
    });
} else {
    import("./form.html").then(function (page) {
        document.getElementById('template').innerHTML = page.toString()
    });
}