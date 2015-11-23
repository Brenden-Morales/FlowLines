/**
 * Created by bmorales on 11/23/2015.
 */


function lineThicknessChanged(){
    var width = Number(document.getElementById("lineThickness").value);
    console.log(width);
    lineWidth = width;
}

var drawing = false;

function toggleDraw(){
    var button = document.getElementById("toggleDraw");
    if(button.innerText.indexOf("Not") !== -1){
        button.innerText = "Drawing";
        drawing = true;
    }
    else{
        button.innerText = "Not Drawing";
        drawing = false;
    }
}

var rendering = false;
function toggleRender(){
    var button = document.getElementById("toggleRender");
    if(button.innerText.indexOf("Not") !== -1){
        button.innerText = "Rendering";
        startRendering();
    }
    else{
        button.innerText = "Not Rendering";
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

        context.strokeStyle="rgb(" + r + "," + g + ",127)";
        context.lineWidth = lineWidth;
        context.beginPath();
        context.moveTo(points[0][0],points[0][1]);
        context.lineTo(points[1][0],points[1][1]);
        context.stroke();
        points = [];
    }
}

var canvas;
var context;
var lineWidth = 1;
function initialize(){
    console.log("INITIALIZE");
    canvas = document.getElementById("mainCanvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}