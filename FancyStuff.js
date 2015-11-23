/**
 * Created by bmorales on 11/23/2015.
 */
var threeInitialized = false;

var renderer,stats,scene,camera;

var continueRender = false;

var totalTime = 0;
var startTime = Date.now();

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

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1),new THREE.MeshBasicMaterial({color:0xff0000}));
        scene.add(plane);

        threeInitialized = true;
    }

    continueRender = true;
    animate();

}

function stopRendering(){
    continueRender = false;
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
    renderer.render(scene,camera)
}
