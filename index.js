var canvas=document.getElementById("canva");
canvas.height=512;
canvas.width=512;
//canvas.style.background="white";
var context=canvas.getContext("2d");
context.fillStyle="white";
context.fillRect(0,0,canvas.width,canvas.height);

// FOR DRAWING:
var color="black";
var pen_width="2";
var drawing="false";//to tell if drawing or not

//FOR UNDO:-
let arr=[];
let index=-1;

canvas.addEventListener("touchstart",start,false);
canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

//to stop the DRAWING
canvas.addEventListener("touchend",stop,false);
canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);

function start(event){
  drawing=true;
  context.beginPath();
  context.moveTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
  event.preventDefault();
}
function draw(event){
  if(drawing==true){
    context.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
    context.strokeStyle="color";
    context.lineWidth="pen_width";
    context.lineCap="round";
    context.lineJoin="round";//without interruptions
    context.stroke();
  }
  event.preventDefault();
}
function stop(event){
  if(drawing==true){
    context.stroke();
    context.closePath();
    drawing=false;
  }
  event.preventDefault();
  if(event!='mouseout'){
    arr.push(context.getImageData(0,0,canvas.width,canvas.height));
    index++;
  }
}

//BUTTONS:-
function clear_canvas(){
  context.fillStyle=="white";
  context.clearRect(0,0,canvas.width,canvas.height);
  context.fillRect(0,0,canvas.width,canvas.height);
  arr=[];
  index=-1;
}
function undo_canvas(){
  if(index<=0){
    clear_canvas();
  }
  else{
    index-=1;
    arr.pop();
    context.putImageData(arr[index],0,0);
  }
}
