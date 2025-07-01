// let start = '2022-11-02'
// let end = '2022-11-18'


// converte la data in millesecondi
let endMillis = Date.now();
console.log(endMillis);
//-------------------------
// convertire 16 giorni in millisecondi
let daysMillis = convertDaysToMillis(16);

function convertDaysToMillis(days) {
    return days * 24 * 60 * 60 * 1000;
}
console.log(daysMillis);
//-------------------------
// sottrarre i millisecondi dei giorni dalla data attuale
let startMillis=endMillis - daysMillis;
//-------------------------
// creare due oggetti Date
// let start_date = new Date(startMillis);
// let end_date = new Date(endMillis);
//
// console.log(start_date);
// console.log(end_date);
//********************************************************************************
//creazione data formattata in stringa 1 METODO
// let [endYear, endMonth, endDay] = [end_date.getFullYear(), end_date.getMonth()+1, end_date.getDate()];
// console.log(endYear,endMonth,endDay);
// let [startYear, startMonth, startDay] = [start_date.getFullYear(), start_date.getMonth()+1, start_date.getDate()];
// console.log(startYear,startMonth,startDay);

// let start = `${startYear}-${startMonth}-${startDay}`;
// let end = `${endYear}-${endMonth}-${endDay}`;
//********************************************************************************
//creazione data formattata in stringa 2 METODO TRAMMITE FUNZIONE
let start = createFormattedData(startMillis);
let end = createFormattedData(endMillis);

//-------1 METODO
// function createFormattedData(millis) {
//     let year = millis.getFullYear();
//     let month = millis.getMonth() + 1;
//     let day = millis.getDate();
//     return `${year}-${month}-${day}`;
// }
//______2 METODO
function createFormattedData(millis) {
    let date = new Date(millis)
    let[year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return `${year}-${month}-${day}`;}




let ApiKey = 'RMYuEOiCMFgNhQWlHgzhIEqJz3ThQ0uJnL7te6bH';

// let astronomyPicturesURL = `https://api.nasa.gov/planetary/apod?start_date=${start}&end_date=${end}&api_key=${ApiKey}&thumbs=true`;
// let astronomyPicturesURL = 'mock/astronomy-pictures.json';
let astronomyPicturesURL = 'mock/astronomy-pictures-20250317.json';

let daynumeber = -1

let mainPicture = document.querySelector('#main-picture');
let picturesContainer = document.querySelector('.pictures-container');
let dettailContainer = document.querySelector('#picture-details-container');
let pictureDetails = document.querySelector('.picture-details');
let headerPicture = document.querySelector('header');


//ESTRAZIONE FETCH
let fetchPictures = () => {
    let pictures = fetch(astronomyPicturesURL)

       //controllo degli errori in caso di caricamento
        .then(res => {
            // console.log(res)
            if (res.ok) {
                return res.json();
            } else {
                // res.json().then(data => console.log(data))
                // console.log(res)
                // new Error('errore');
                throw new Error(res.status);
            }
        })
        //acchiappa l'errore
        .catch(
            error => {
                console.log(error)
                mainPicture.innerHTML = '<h2 style="color: red">Errore<h2>';
            }
        )
        .finally(() => {console.log('fine!!!')})
    return pictures;
}
//FUNZIONE PER CONTROLLARE IL TIPO DI MEDIA
    function checkMediaType(picture) {
        if(picture.media_type === 'image') {
            return picture.url;
        } else if(picture.media_type === 'video') {
            return picture.thumbnail_url;
        }
    }

let fetchedPictures = fetchPictures()
    .then(
        pictures => {
            console.log(pictures);
            // estrarre l'immagine odierna
            headerPic1(pictures.at(daynumeber));
            createMainPicture(pictures.at(daynumeber));       //(immagine ultima della lista)
            // let todayImage = pictures.pop(-1);
            // let previousImages = [...pictures]           //(creare copia array)
            createPreviousPictures(pictures.reverse().slice(1))
            // let previousImages = pictures.reverse().slice(1); //ribaltato array
            // console.log(previousImages);

            // creare il contenuto di main picture
            // prendere le pictures restanti
            // popolare la sezione previous images
            // Attenzione: la prima immagine dovrà essere quella di ieri, poi quella di 2 giorni fa e così via
        }
    )
// function createMainPicture(picture) {
// }

// FUNZIONE PER CREARE L'IMMAGINE PRINCIPALE
let createMainPicture = (picture) => {
    // console.log(picture);
    mainPicture.innerHTML = ''
    let img = document.createElement('img');
    let imgContent = checkMediaType(picture);
    img.src = imgContent;
    mainPicture.append(img)

    let container = document.createElement('div');
    container.classList.add('text-container');
//GESTIONE ERRORE: casistica TERNARIA





    let title = document.createElement('h3');
    //NORMALE
    title.textContent = picture.title;

    //GESTIONE ERRORI: casistica IF ELS
    // if(picture.title) {
    //     title.textContent = picture.title;
    // }else{
    //     title.textContent = 'No title'
    // }

    //GESTIONE ERRORE: casistica TERNARIA
    picture.title ? title.textContent = picture.title : title.textContent = 'No title';

    let description = document.createElement('p');
    description.textContent = picture.explanation;

    let copyright = document.createElement('p');
    copyright.textContent = picture.copyright;

    container.append(title)
    container.append(description)
    container.append(copyright)

    mainPicture.append(container)
}
//*************************************************************************

// FUNZIONE PER CREARE LE IMMAGINI PRECEDENTI
let createPreviousPictures = (pictures) => {
    // console.log(pictures);

    //svuoti il contenitore
    picturesContainer.innerHTML = ''

    // for(let picture of pictures) {
    //
    // }

//Per Ogni immagine creiamo il contenitore ecc...
    pictures.map((picture) => {
        let pictureContainer = document.createElement('div');
        pictureContainer.classList.add('picture-container');

        //todo: aggiungiamo un lostener per aprire la modal window con tutte le info
        //Quando clicchiamo sull'immagine, apriamo il dettaglio
        pictureContainer.addEventListener("click", () => {
            showDetail(picture);
        })
//------------------------------------------------------
        let img = document.createElement('img');
        let imgContent = checkMediaType(picture);
        img.src = imgContent;

        // pictureContainer.addEventListener("click", function () {
        //     createDetail(picture);
        //     changeDisplayProperty();
        // })

        pictureContainer.append(img)
        picturesContainer.append(pictureContainer)
    })}
//*************************************************************************



// FUNZIONE PER LA COMPILAZIONE DELLA MODALE WINDOWS CON LE  INFO  DELL'IMMAGINE
    let showDetail = (picture) => {

//Prendiamo gli elementi della modale cje abbiamo mappato in html
        let pictureDetailsTitle = document.querySelector("#picture-title");
        let pictureDetailsImg = document.querySelector('#picture-img');
        let pictureDetailsDescription = document.querySelector('#picture-description');
        let pictureDetailsCopyright = document.querySelector('#picture-copyright');
        console.log(picture.title);
        console.log(pictureDetailsTitle);

//assegnammo i valori agli elementi della modale
        pictureDetailsTitle.textContent = picture.title;
        pictureDetailsDescription.textContent = picture.explanation;
        pictureDetailsCopyright.textContent = picture.copyright;
        pictureDetailsImg.src = picture.url;

        // let img= document.createElement('img');
        // img.src = picture.url;

//funzione per mostrare la modale
        pictureDetailsContainer.style.display = 'flex';
}
//------------------------------------------------------
        let closeButton = document.querySelector('#close-button');
        let pictureDetailsContainer = dettailContainer;

//Bottone per chiudere la modale e nascondere la modale
        closeButton.addEventListener('click', () => {
            pictureDetailsContainer.style.display = 'none';
        })
//Chiudere la modale se clicchiamo fuori dalla modale
        window.addEventListener('click', (e) => {
            // console.log(e.target);
            if (e.target === pictureDetailsContainer) {
                pictureDetailsContainer.style.display = 'none';
            }
        })
//ESC chiudere la modale e nascondere la modale
      window.addEventListener('keydown', (e) => {
//          console.log(e.key);
        if(e.key === 'Escape') {
            pictureDetailsContainer.style.display = 'none';
        }
      })
//*************************************************************************

// FUNZIONE PER CAMBIARE IMMAGINE HEADER
function headerPic1(pictures) {
    console.log(pictures.url)
    let foto = (pictures.url)
    foto = checkMediaType(pictures);
    headerPicture.style.cssText = `background-image: url(${foto})`;
// console.log(invPictures[daynumeber].url)
}

//*************************************************************************

// let element = document.querySelector('#picture-details-container');

// // Funzione per cambiare la proprietà CSS
// function changeDisplayProperty() {
//     dettailContainer.style.display = 'flex';}// Funzione per cambiare la proprietà CSS
// function changeDisplayProperty() {
//     dettailContainer.style.display = 'flex';}


// Funzione per chiudere il dettaglio
// let closeButton = document.querySelector('#close');
// closeButton.addEventListener('click', () => {
//     element.style.display = 'none';
// })
// funzione per creare il dettaglio
//------------------------------------------------------
// let createDetail = (picture) => {
//     pictureDetails.innerHTML = '';
// console.log(picture);
//     let title = document.createElement('h3');
//     title.textContent = picture.title;
//
//     let button = document.createElement('button');
//     button.textContent = 'X CLOSE';
//     button.classList.add('close');
//     button.addEventListener('click', () => {
//         element.style.display = 'none';
//     });
//
//     let description = document.createElement('p');
//     description.textContent = picture.explanation;
//
//     let img = document.createElement('img');
//     let imgContent = checkMediaType(picture);
//     img.src = imgContent;
//
//     let date = document.createElement('p');
//     date.textContent = picture.date;
//
//     pictureDetails.append(img);
//     pictureDetails.append(title);
//     pictureDetails.append(button);
//     pictureDetails.append(description);
//     pictureDetails.append(date)

    // dettailContainer.append(container);
// }}

//*************************************************************************
//*************************************************************************

/* ----- DATI IN ARRIVO DA MARTE ----- */

// Dati di Curiosity: https://mars.nasa.gov/msl/weather/
// Google line charts: https://developers.google.com/chart/interactive/docs/gallery/linechart

// const curiosityData = 'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';
const curiosityData = 'mock/CuriosityRover.json';


let fetchCuriosityData = () => {
    let data = fetch(curiosityData)
        .then(res => res.json())
        .then(data =>data.soles)
    return data
}

fetchCuriosityData().then(
    res => {
        let marsWeatherData = [];

        //Riempiamo un Array con i dati
       for(let i=0; i < 250; i++) {
              marsWeatherData.push(res[i]);
       }
        return marsWeatherData;
    }
)
    .then(data => {
        console.log(data);
        //creazione dati per Curiosity Today
// let today = data [0];
// document.querySelector('#mars-today').innerHTML = `
// <h2>Curiosity Today</h2>
// <p>This is my ${today.sol} Martian day</p>
// <p>Today the weather is ${today}</p>
// `
//CARICARE LA CHART DI GOOGLE
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(()=> {myChart(data)});
    })

let myChart = (weatherData) => {
    console.log(weatherData);

    // dall'array mardWeatherData prendiamo 3 proprietà: sols, min e max
    let formattedData = weatherData.map(data => {
        return [data.sol, +data.min_temp, +data.max_temp]
    })
    // console.log(formattedData);

    var chartData = [
        ['Date', 'Min', 'Max']
        // ['2004',  1000,      400],
        // ['2005',  1170,      460],
        // ['2006',  660,       1120],
        // ['2007',  1030,      540]
    ]
    //*/*/*/*/*/*/*/*






    //*/*/*/*/*/*/*/*/
    // formattare i dati in modo che siano in ordine cronologico
    formatteData = formattedData.reverse();
    for (let data of formattedData) {
        chartData.push(data);
    }
// console.log(chartData);
//------------------------------------------------------
//OPZIONI DELLA CHART
    let options = {
        title: 'Mars Weather Data',
        curveType: 'function',
        legend: {position: 'bottom'},
        hAxis: {
            title: 'Sols',
            titleTextStyle: {
                color: 'blue',
                fontSize: 20,
            },
        },
        vAxis: {
            title: 'Temp (Celsius)',
            titleTextStyle: {
                color: 'blue',
                fontSize: 20,
            },
            ticks: [-80,-60,-40,-10,0,10 ]

        },
        animation: {
            duration: 3000,
            startup: true,
            easing: 'linear',

        }
    }
//------------------------------------------------------
    // riempiamo la chart con i valori
    let finalData = new google.visualization.arrayToDataTable(chartData);
//------------------------------------------------------
    //ci aggancia a un div nel Dom per disegnare la chart
    let chart = new google.visualization.LineChart(document.getElementById('mars-data'));
    chart.draw(finalData,options);
//------------------------------------------------------
    // Aggiungi un listener per l'evento 'select'
    google.visualization.events.addListener(chart, 'select', function() {
        var selection = chart.getSelection();
        if (selection.length > 0) {
            var row = selection[0].row;
            var sol = finalData.getValue(row, 0);
            var minTemp = finalData.getValue(row, 1);
            var maxTemp = finalData.getValue(row, 2);
            console.log('Punto selezionato:', { sol, minTemp, maxTemp });
            // Puoi fare altre operazioni con le informazioni del punto selezionato
            // Trova i dati completi del giorno `sol` selezionato
            let selectedDayData = weatherData.find(data => data.sol === sol);
            // Visualizza i dati completi del giorno `sol` selezionato
            console.log('Dati completi del giorno selezionato:', selectedDayData);

            //creazione dati per Curiosity Today
let today = selectedDayData;
document.querySelector('#mars-today').innerHTML = `
<h2>Curiosity Today</h2>
<p>This is my ${today.sol} Martian day</p>
<p>Today the weather is ${today.atmo_opacity}</p>
<p>Terrestial Date is ${today.terrestrial_date}</p>
<p>Min Temp ${today.min_temp}</p>
<p>Max Temp ${today.max_temp}</p>
<p>sunrise ${today.sunrise}</p>
<p>sunset ${today.sunset}</p>


`





        }



    });
}
// .then(marsWeatherData => console.log(marsWeatherData))
// .then(data => console.log(data))                //undefined da solo arrivano i dati
// .then(data => console.log(marsWeatherData))     //funzione per stampare l'array
// console.log(marsWeatherData);                           // Array vuoto





