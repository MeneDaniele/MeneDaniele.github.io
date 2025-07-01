let myCanvas = document.querySelector('#my-canvas');
let ctx = myCanvas.getContext('2d');

//linea
ctx.moveTo(0,0);
ctx.lineTo(100,100);
ctx.stroke();

//cerchio
ctx.beginPath();
ctx.arc(150,150,50,0,2*Math.PI);
ctx.stroke();

//scritta
ctx.font = '30px Arial';
ctx.fillText('Hello World', 100, 100);

// riempimento
ctx.fillStyle = 'red';
ctx.fillRect(30,30,150,50);