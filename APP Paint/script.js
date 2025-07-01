let canvas =document.querySelector("#my-canvas");
let ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);


let penColor = document.querySelector("#pen-color");
let penWidth = document.querySelector("#pen-width");
let saveButton = document.querySelector("#save");
let clearButton = document.querySelector("#clear");
let output = document.querySelector("#output");


let mouseLocation = {
    canDraw: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0
}

canvas.addEventListener("mousemove",(e) => {
    mouseLocation.lastX = mouseLocation.x;
    mouseLocation.lastY = mouseLocation.y;
    mouseLocation.x = e.offsetX
    mouseLocation.y = e.offsetY;
    draw();
})
canvas.addEventListener("mousedown",(e) => {
    mouseLocation.canDraw = true;
    console.log("mousedown");
})
canvas.addEventListener("mouseup",(e) => {
    mouseLocation.canDraw = false;
    console.log("mouseup");
})
canvas.addEventListener("mouseout",(e) => {
    mouseLocation.canDraw = false;
    console.log("mouseout");
})


saveButton.addEventListener("click", saveImg);
clearButton.addEventListener("click", clearCanvas);




function draw(){
    ctx.beginPath();
    if(mouseLocation.canDraw){
    ctx.moveTo(mouseLocation.lastX,mouseLocation.lastY);
    ctx.lineTo(mouseLocation.x,mouseLocation.y);
    ctx.strokeStyle = penColor.value;
    ctx.lineWidth = penWidth.value;
    ctx.stroke();
    ctx.closePath();
    }
}

function saveImg(){
// let dataURL = canvas.toDataURL();
    let dataURL = canvas.toDataURL('image/jpeg');
    console.log(dataURL);

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("saved-item-conatainer");

    let img= document.createElement("img");
    img.src = dataURL;
    imgContainer.append(img)

    let imgDownload = document.createElement("a");
    imgDownload.textContent = "Download";
    imgDownload.href = dataURL;
    imgDownload.setAttribute("download", "my-painting.jpg");
    imgContainer.append(imgDownload);
    imgContainer.addEventListener("click",() => {
        imgContainer.remove();
    })

    output.prepend(imgContainer);
}

function clearCanvas(){
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
}