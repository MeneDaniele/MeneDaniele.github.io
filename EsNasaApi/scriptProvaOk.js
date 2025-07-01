

//VARIABILI
let dayGalery = 86400000*10;
let start_date = getDate(new Date().getTime() -dayGalery);
let end_date = getDate(new Date());
let ApiKey = 'RMYuEOiCMFgNhQWlHgzhIEqJz3ThQ0uJnL7te6bH';

console.log(start_date)
console.log(end_date)
// -----------------------------------------------
// let astronomyPicturesURL = `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=${ApiKey}`;
let originalAstronomyPicturesURL = 'mock/astronomy-pictures.json';

//-----------------------------------------------
let astronomyPicturesURL = 'mock/astronomy-pictures.json';

//-----------------------------------------------
let day = 4

let mainPicture = document.querySelector('#main-picture');
let picturesContainer = document.querySelector('.pictures-container');
let headerPicture = document.querySelector('header');




// -----------------------------------------------

// FUNZIONE PER CONVERTIRE IN STRINGA LA DATA
function getDate(a){
    let date = new Date(a)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return `${year}-${month}-${day}`
}
// -----------------------------------------------




// -----------------------------------------------



// fetch(astronomyPicturesURL)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//
//         // let container = document.querySelector('main')
//         // let img = document.createElement('img')
//         // img.src = data[1].url;
//         // container.append(data[1].title)
//         // container.append(img)
//     })

//ESTRAZIONE FETCH
let fetchPictures = () => {
    let pictures= fetch(astronomyPicturesURL)
        .then(res => res.json());
    console.log(pictures)
    return pictures;
}
// -----------------------------------------------

// INVERSIONE DATA e ASSEGNAZIONE FUNZIONI
let fetchedPictures = fetchPictures()
    .then(pictures => {
        console.log(pictures)
        //inversione array
        let invPictures = pictures.reverse();
        //assegnazione funzione
        PictureOfDay(invPictures);
        createMainPicture(invPictures);
        headerPic1(invPictures)
        createPreviousImages(myPictures(invPictures))
    })
// -----------------------------------------------

// ESTRAZIONE IMMAGINE ODIERNA
function PictureOfDay(invPictures) {
            let img = document.createElement('img');
            img.src = invPictures[day].url;
            mainPicture.append(img);
            console.log(invPictures)
        }

// CREAZIONE CONTENUTO MAIN PICTURE
function createMainPicture(invPictures) {
            let div = document.createElement('div');
            div.classList.add('text-container');
            let title = document.createElement('h3');
            title.textContent = invPictures[day].title;
            let explanation = document.createElement('p');
            explanation.textContent = invPictures[day].explanation;
            let copyright = document.createElement('p');
            copyright.textContent = invPictures[day].copyright;

            div.append(title);
            div.append(explanation);
            div.append(copyright);
            mainPicture.append(div);
        }
// -----------------------------------------------

// PRENDERE LE PICTURES RESTANTI
function myPictures (invPictures) {
        let myPictures = invPictures.slice(1);
        console.log(myPictures);
        return myPictures;
    }


function createPreviousImages(invPictures) {
            invPictures.forEach(picture => {
                let div = document.createElement('div');
                div.classList.add ('picture-container');
                let img = document.createElement('img');
                img.src = picture.url;
                picturesContainer.append(div);
                div.append(img);
            });
        }

// -----------------------------------------------

// FUNZIONE PER CAMBIARE IMMAGINE HEADER
function headerPic1(invPictures) {
            headerPicture.style.cssText = `background-image: url(${invPictures[day].url})`;
}

// -----------------------------------------------
// estrarre l'immagine odierna
// creare il contenuto di main picture
// prendere le pictures restanti
// popolare la sezione previous images
// Attenzione: la prima immagine dovrà essere quella di ieri, poi quella di 2 giorni fa e così via