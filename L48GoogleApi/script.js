import {initMap, resetMap,} from './modules/map.js';
import {addMarkers} from "./modules/markers.js";
import {setStores,updateStoreList, setFilter} from "./modules/stores.js";

// const storeContainer = document.querySelector('#store-list');

let Apikey = `AIzaSyDRxarRwODN_h7o4tnH9T7J_eXpyWgZWVE`;
let map;
let myCoords = { lat: 42.511827, lng: 12.903539 }
let myCoords1 = { lat: 43.511827, lng: 10.903539 }
let zoom = 6

/* Pulsanti per filtrare categoria */
let buttons = Array.from(document.querySelectorAll('.category-buttons-container button'));
const categoryFilterContainer = document.querySelector('.category-buttons-container');

categoryFilterContainer.addEventListener('click', (e) => {
    let pressedButton = e.target.closest('button');
  if(pressedButton){
      pressedButton.classList.add('active');
      let otherButtons = buttons.filter(button => button !== pressedButton);
      otherButtons.forEach(button => button.classList.remove('active'));
  // console.log(pressedButton.dataset)

    setFilter('category', pressedButton.dataset.filter)
  }
})

/* Input per filtrare negozi */
const searchStore = document.querySelector('#search-store');
const ClearInputButton = document.querySelector('#clear-input');

searchStore.addEventListener('keyup', () => processInput());
ClearInputButton.addEventListener('click', () => {clearInput()});

/*Pulsante per Resettare mappa*/
let resetMapButton = document.querySelector('#reset-zoom');
resetMapButton.addEventListener('click', () => {
resetMap(myCoords, zoom);
})


function processInput() {
    let userInput =searchStore.value.toLocaleLowerCase();
    setFilter('searchTerm',userInput);
}

function clearInput() {
    searchStore.value = '';
    processInput();
}


async function initApp() {
    try {
    let stores = await fetch('stores.json')
        .then(res => res.json())
        .then(data => data.stores)
    let map = await initMap(myCoords.lat,myCoords.lng,zoom,Apikey);
    addMarkers(map,stores);

    setStores(stores)
    updateStoreList(stores);

    } catch(err){
        console.log(err);
        document.querySelector('#map').innerHTML =`
        <h1>Sorry, something went wrong</h1>`
    }

}
initApp();