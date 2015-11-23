/**
 * Created by bmorales on 11/23/2015.
 */
var threeInitialized = false;

var renderer,stats,scene,camera;

var continueRender = false;

var totalTime = 0;
var startTime = Date.now();

var canvas;

var shaderMaterial;


var checkerboard = THREE.ImageUtils.loadTexture( "checkerboard.o.jpg");

function startRendering(){

    console.log("start Rendering");
    if(!threeInitialized){

        console.log("initialize three.js");
        canvas = document.getElementById("renderCanvas");

        //setup renderer
        renderer = new THREE.WebGLRenderer( {
            antialias: false,
            alpha : true,
            canvas : canvas} );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xffffff,1);
        renderer.setSize( window.innerWidth, window.innerHeight );

        //setup camera
        camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 20);
        camera.position.z = 10;

        //setup scene
        scene = new THREE.Scene();

        //setup stats
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        document.getElementById("overlay").appendChild( stats.domElement );

        var tex = new THREE.Texture(document.getElementById("mainCanvas"));
        tex.needsUpdate = true;

        shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
                canvas: { type: "t", value: tex },
                checkerboard : {type : "t", value: checkerboard},
                resolution2 : {type : "v2", value : new THREE.Vector2(256,256)},
                time : {type : "f", value : 0}
            },
            vertexShader: document.getElementById("passThroughVertex").textContent,
            fragmentShader: document.getElementById("canvasFragment").textContent,
            transparent : true
        });

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1),shaderMaterial);
        scene.add(plane);

        threeInitialized = true;
    }

    continueRender = true;
    canvas.style.display = null;
    animate();

}

function stopRendering(){
    continueRender = false;
    canvas.style.display = "none";
}


//we just keep looping through this function forever
function animate(){
    if(!continueRender)
        return;
    requestAnimationFrame(animate);
    render();
}

//the actual render function
function render(){
    var delta = Date.now() - startTime;
    totalTime += delta;
    startTime = Date.now();
    var uniformTime = (totalTime % 5000) / 5000;
    console.log(uniformTime);
    shaderMaterial.uniforms.time.value = uniformTime;
    renderer.render(scene,camera)
}
