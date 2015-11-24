/**
 * Created by bmorales on 11/23/2015.
 */


function lineThicknessChanged(){
    var width = Number(document.getElementById("lineThickness").value);
    console.log(width);
    lineWidth = width;
}

var drawing = true;

var rendering = false;
function toggleRender(){
    var button = document.getElementById("toggleRender");
    if(button.innerText.indexOf("Not") !== -1){
        button.innerText = "Rendering";
        mainCanvas.style.display = "none";
        startRendering();
    }
    else{
        button.innerText = "Not Rendering";
        mainCanvas.style.display=null;
        stopRendering();


    }
}


var points = [];
function canvasClick(event){
    if(!drawing)
        return;
    var clickArray = [event.clientX, event.clientY];
    points.push(clickArray);
    if(points.length === 2){
        console.log("DRAW LINE");

        //get the unit vector of the two points
        var xDelta = (points[0][0] - points[1][0]);
        var yDelta = (points[0][1] - points[1][1]);
        var length = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta))
        xDelta /= length;
        yDelta /= length;

        //convert to r and g
        var r = Math.round((xDelta * 128) + 128);
        var g = Math.round((yDelta * 128) + 128);

        context.strokeStyle="rgb(" + r + "," + g + ",0)";
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(points[0][0],points[0][1]);
        context.lineTo(points[1][0],points[1][1]);
        context.stroke();
        points = [];
    }
}

var mainCanvas;
var context;
var lineWidth = 20;
function initialize(){
    console.log("INITIALIZE");
    mainCanvas = document.getElementById("mainCanvas");
    context = mainCanvas.getContext("2d");
    mainCanvas.width = window.innerWidth;
    mainCanvas.height = window.innerHeight;
}