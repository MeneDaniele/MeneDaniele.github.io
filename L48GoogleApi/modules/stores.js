import {refreshMarkers} from "./markers.js";
import {getMap, setMap} from "./map.js";

let stores = [];

const storesListContainer = document.querySelector('#store-list');


function setStores(storesList) {
    stores = storesList;
}
/*LOGICA FILTRI*/

let filterParams = {
    category: 'all',
    searchTerm: ''
}

function setFilter(filter,value) {
    console.log(filter,value)
    updateFilterParams(filter,value);
    let filteredStores = applayFilters();
    updateStoreList(filteredStores)
    let map = getMap()
    refreshMarkers(map,filteredStores)
}


function updateFilterParams(filter, value) {
    filterParams = {
        ...filterParams,        /*utilizziamo lo spred operetor "..."per copiare la variabile e poi aggiungere o sostituire il valore */

        [filter]: value
    }
}

function applayFilters() {
    let filteredStores = stores;
    // Filtro per categoria
    if(filterParams.category !== 'all') {
        filteredStores = filteredStores.filter(
            store => store.categories.includes(filterParams.category)
        )
    }
    // Filtro per input
    if(filterParams.searchTerm !== '') {
        filteredStores = filteredStores.filter(
            store =>
            store.name.toLocaleLowerCase().includes(filterParams.searchTerm) ||
            store.address.toLocaleLowerCase().includes(filterParams.searchTerm)
    )
    }

    return filteredStores;
}


/*MODIFICHE AL DOM*/
function updateStoreList(stores) {

   storesListContainer.innerHTML = '';

    stores.forEach(store => {
    let storeDetailsContainer = document.createElement('div');
    storeDetailsContainer.classList.add('store');
    storeDetailsContainer.addEventListener('click', () => {
    // TODO: implementare funzione di zoom sul negozio
    setMap(store.coords.lat, store.coords.lng, 15);
     // zoomToStore(store.coords);
    })

    let name = document.createElement('h3');
    name.textContent = store.name;
    let address = document.createElement('p');
    address.textContent = store.address;
    let email = document.createElement('p');
    email.textContent = store.email;
    let phone = document.createElement('p');
    phone.textContent = store.phone;
    let link = document.createElement('a');
    link.textContent = 'Directions';
    link.href = `https://www.google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}`;
    link.target = '_blank';

    storeDetailsContainer.appendChild(name);
    storeDetailsContainer.appendChild(address);
    storeDetailsContainer.appendChild(email);
    storeDetailsContainer.appendChild(phone);
    storeDetailsContainer.appendChild(link);

    storesListContainer.appendChild(storeDetailsContainer);
    })
}

// function zoomToStore (coords) {
//     let map = getMap();
//     map.setZoom(15);
//     map.setCenter(coords);
// }

export { setStores,updateStoreList, setFilter };