const sideNav = document.getElementById('side_nav');

const navs = [
    {
        text: "Formularz",
        href: "/form",
        icon: `<i class="fa-brands fa-wpforms"></i>`,
    },
    {
        text: "Posty",
        href: "/posts",
        icon: `<i class="fa-regular fa-message"></i>`,
    },
    {
        text: "Albumy",
        href: "/albums",
        icon: `<i class="fa-regular fa-images"></i>`,
    },
]

function setNavs(){
    for(let nav of navs){
        sideNav.innerHTML += `
        <a href="${nav.href}">
            <div class="navigation_con main-page-nav">
                <p>${nav.text}</p>
                ${nav.icon}  
            </div>
        </a>
        `
    }
}

setNavs();