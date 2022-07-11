import { get } from "../../api";
import { destroy as destroyLoading, show as showLoading } from "../../loading";
import {createFilters, onFilter as filterAlbums, checkStorage } from "../../filters.js"

const albumsMain = document.getElementById('template');
const loadingEl = showLoading(document.getElementById("template"), "");

let albums;
let albumsToShow;

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
        ],
        id: 'sort',
    },
]

async function getAlbums(){
    albums = await get('https://jsonplaceholder.typicode.com/albums/')
    checkStorage();
}

function showAlbums(albumsToShow){
    const el = document.getElementById('albums_card');
    if(el){
        el.remove();
    }
    const albumsConEl = document.createElement('div');
    albumsConEl.setAttribute('id', 'albums_card');
    albumsConEl.setAttribute('class', 'cards_container');

    for(let album of albumsToShow){
        const albumCardEl = document.createElement('a');
        albumCardEl.setAttribute('id', album.id);
        albumCardEl.setAttribute('class', 'card-as-btn');
        albumCardEl.setAttribute('href', `${window.location.pathname}/${album.id}`);
        albumCardEl.innerHTML = `
        <h2>${album.title}</h2>
        <p>ID Użytkownika: ${album.userId}`;

        albumCardEl.addEventListener('click', (e)=>{
            console.log(e.target.id)
        })

        albumsConEl.appendChild(albumCardEl);
    }
    albumsMain.appendChild(albumsConEl);
    destroyLoading(loadingEl);
}

getAlbums();
createFilters(filters, 'albums');

window.document.addEventListener('filter', ()=>{
    albumsToShow = filterAlbums(albums);
    showAlbums(albumsToShow);
}, false)