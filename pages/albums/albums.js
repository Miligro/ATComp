import { get } from "../../api";

const albumsMain = document.getElementById('template');

let albums;

async function getAlbums(){
    albums = await get('https://jsonplaceholder.typicode.com/albums/')
    showAlbums();
}

function showAlbums(){
    const albumsConEl = document.createElement('div');
    albumsConEl.setAttribute('id', 'albums_card');
    albumsConEl.setAttribute('class', 'cards_container');

    for(let album of albums){
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
}

getAlbums();