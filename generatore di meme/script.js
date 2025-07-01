let imageSelector = document.querySelector('#image-selection');
let textSelector = document.querySelector('#text-selection');
let btnBack = document.querySelector('#back');
let btnForward = document.querySelector('#forward');


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let topLine = document.querySelector('#top-line');
let bottomLine = document.querySelector('#bottom-line');
let downloadButton = document.querySelector('#download');


let topText = '';
let bottomText = '';
let canvasImage = '';



imageSelector.addEventListener('click', (e) => {
    // console.log(e.target)
    if(e.target.tagName === 'IMG') {
        selectImage(e.target);
    }
})

topLine.addEventListener('input', (e) => {
    // console.log(e)
    enableButton(btnBack);
    updateText(e.target.value, e.target.id)
})
bottomLine.addEventListener('input', (e) => {
    // console.log(e)
    enableButton(btnBack);
    updateText(e.target.value, e.target.id)
})

downloadButton.addEventListener('click', downloadCanvas)

function selectImage(image){
    canvasImage = image;
    enableButton(btnForward);
    redrawCanvas(canvasImage,topText,bottomText);
}

function updateText(text,id) {
// ctx.font = '30px Impact';
// ctx.fillStyle = 'white';
// ctx.strokeStyle = 'black';
// ctx.lineWidth = 2;
    if(id === 'top-line') {
       topText = text;
// ctx.fillText(text, 20, 40);
// ctx.strokeText(text,20 , 40);
    }else if(id === 'bottom-line') {
        bottomText = text;
        // ctx.fillText(text, 20, canvas.height - 30);
        // ctx.strokeText(text,20 , canvas.height - 30);
    }
    redrawCanvas(canvasImage,topText,bottomText);
}

function redrawCanvas(image, topText, bottomText) {
    // console.log(image, topText, bottomText);
    // Disegnare immagine
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //Scrivere testo superiore
    printTextToCanvas(topText, (canvas.width / 2), 40)
    // ctx.fillText(topText, 20, 40);
    // ctx.strokeText(topText,20 , 40);
    //Scrivere testo inferiore
    printTextToCanvas(bottomText, (canvas.width / 2), canvas.height - 30)
    // ctx.fillText(bottomText, 20, canvas.height - 30);
    // ctx.strokeText(bottomText,20 , canvas.height - 30);

}

function printTextToCanvas(text, x, y) {
    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.lineWidth = 2;
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

function downloadCanvas() {
    let dataURL = canvas.toDataURL('image/jpeg');
    downloadButton.href = dataURL;
}

/* UPLOAD IMMAGINE */

let fileInput = document.querySelector('#file-upload');

fileInput.addEventListener('change', function(e) {
    handleFileSelection(e)
    enableButton(btnForward);
})

function handleFileSelection(e) {
    // console.log(e)
    let file = e.target.files[0];
    // console.log(file)
//creiamo il nostro oggetto file reader
    let reader = new FileReader();
//reader ci inseriamo il file convertito in  base64
    reader.readAsDataURL(file);
// aggiungiamo un listner per creare un tag img ed inserirci il risulatato di reader
    reader.addEventListener('load', () => {
        let image = document.createElement('img');
        image.src = reader.result;
// aggiungiamo un listner per inserire l'immagine nel canvas
        image.addEventListener('load', () => {
        canvasImage = image;
//aggiorniamo     il canvas
        redrawCanvas(canvasImage,topText,bottomText);
        })
        // console.log(image)
    })
}

/*  STEP    */
btnForward.addEventListener('click', goForward);
btnBack.addEventListener('click', goBack);

function goForward() {
    imageSelector.style.display = 'none';
    textSelector.style.display = 'block';
}
function goBack() {
    imageSelector.style.display = 'block';
    textSelector.style.display = 'none';
}

function enableButton(button) {
    button.removeAttribute('disabled');
}