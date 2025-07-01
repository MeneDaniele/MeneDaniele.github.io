let start_date = '2022-10-10';
let end_date = '2022-10-18';
let ApiKey = 'RMYuEOiCMFgNhQWlHgzhIEqJz3ThQ0uJnL7te6bH';

// let astronomyPicturesURL = `https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=${ApiKey}`;
let astronomyPicturesURL = 'mock/astronomy-pictures.json';

let day = 0

let mainPicture = document.querySelector('#main-picture');
let picturesContainer = document.querySelector('.pictures-container');

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
    let pictures;
    pictures = fetch(astronomyPicturesURL).then(res => res.json());
console.log(pictures)
    return pictures;
}

// INVERSIONE DATA
let invertDate = fetchPictures()
    .then(pictures => {
        let inverted = pictures.reverse();
console.log(inverted);
        return inverted;
    });

// ESTRAZIONE IMMAGINE ODIERNA
let fetchedPictures = invertDate
    .then(inverted => {
        let img = document.createElement('img');
        img.src = inverted[day].url;
        mainPicture.append(img);
           }
    );

// CREAZIONE CONTENUTO MAIN PICTURE
let createMainPicture =()=> {
    invertDate
        .then(inverted => {
            let div = document.createElement('div');
            div.classList.add('text-container');
            let title = document.createElement('h3');
            title.textContent = inverted[day].title;
            let explanation = document.createElement('p');
            explanation.textContent = inverted[day].explanation;
            let copyright = document.createElement('p');
            copyright.textContent = inverted[day].copyright;

            div.append(title);
            div.append(explanation);
            div.append(copyright);
            mainPicture.append(div);
        })
}
createMainPicture()


// PRENDERE LE PICTURES RESTANTI
let myPictures = invertDate
    .then(restanti => {
        let myPictures = restanti.slice(1);
        console.log(myPictures);
        return myPictures;
    });


function createPreviousImages() {
    myPictures
        .then(pictures => {
            pictures.forEach(picture => {
                let div = document.createElement('div');
                div.classList.add ('picture-container');
                let img = document.createElement('img');
                img.src = picture.url;
                picturesContainer.append(div);
                div.append(img);
            });
        });
}
createPreviousImages()


// estrarre l'immagine odierna
// creare il contenuto di main picture
// prendere le pictures restanti
// popolare la sezione previous images
// Attenzione: la prima immagine dovrà essere quella di ieri, poi quella di 2 giorni fa e così via