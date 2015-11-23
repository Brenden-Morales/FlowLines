/**
 * Created by bmorales on 11/23/2015.
 */
var threeInitialized = false;

var renderer;

function startRendering(){
    console.log("start Rendering");
    if(!threeInitialized){
        console.log("initialize three.js");

        //setup renderer
        renderer = new THREE.WebGLRenderer( {
            antialias: false,
            alpha : true,
            canvas : document.getElementById("renderCanvas")} );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xffffff,0);
        renderer.setSize( window.innerWidth, window.innerHeight );


        threeInitialized = true;
    }
}

function stopRendering(){
    console.log("stop rendering");
}