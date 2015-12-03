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

var noise1;
var noise2;

var checkerboard = THREE.ImageUtils.loadTexture( "checkerboard.o.jpg");
var water = THREE.ImageUtils.loadTexture( "water.BMP");
var tex;

function startRendering(){

    console.log("start Rendering");
    if(!threeInitialized){

        //setup renderer
        renderer = new THREE.WebGLRenderer( {
            antialias: false,
            alpha : true,
            canvas : document.getElementById("renderCanvas")
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        //renderer.setClearColor(0xffffff,1);
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


        var noiseSize = 256;
        var size = noiseSize * noiseSize;
        var data = new Uint8Array(4 * size);
        for(var i = 0; i < size * 4; i ++){
            data[i] = Math.random() * 255 | 0;
        }
        var dt1 = new THREE.DataTexture(data,noiseSize,noiseSize,THREE.RGBAFormat);
        dt1.magFilter = THREE.NearestFilter;
        dt1.minFilter = THREE.NearestFilter;
        dt1.wrapS = THREE.RepeatWrapping;
        dt1.wrapT = THREE.RepeatWrapping;
        dt1.needsUpdate = true;

        var data2 = new Uint8Array(4 * size);
        for(var i = 0; i < size * 4; i ++){
            data2[i] = Math.random() * 255 | 0;
        }
        var dt2 = new THREE.DataTexture(data2,noiseSize,noiseSize,THREE.RGBAFormat);
        dt2.magFilter = THREE.NearestFilter;
        dt2.minFilter = THREE.NearestFilter;
        dt2.wrapS = THREE.RepeatWrapping;
        dt2.wrapT = THREE.RepeatWrapping;
        dt2.needsUpdate = true;

        var segTexture = new SegmentTexture({width:32});


        shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth,window.innerHeight) },
                segments : {type : "t", value : segTexture.getTexture()}
            },
            vertexShader: document.getElementById("passThroughVertex").textContent,
            fragmentShader: document.getElementById("flowMapFragment").textContent,
            transparent : true
        });

        var plane = new THREE.Mesh(new THREE.PlaneGeometry(window.innerWidth,window.innerHeight,1,1),shaderMaterial);
        scene.add(plane);

        threeInitialized = true;
    }

    tex = new THREE.Texture(document.getElementById("mainCanvas"));
    tex.repeat.set( 1000, 1000 );
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    continueRender = true;
    document.getElementById("renderCanvas").style.display = null;
    animate();

}

function stopRendering(){
    continueRender = false;
    document.getElementById("renderCanvas").style.display = "none";
}


//we just keep looping through this function forever
function animate(){
    if(!continueRender)
        return;
    requestAnimationFrame(animate);
    render();
}

function updateTime(value){
    shaderMaterial.uniforms.time.value = value;
}

//the actual render function
function render(){
    var delta = Date.now() - startTime;
    totalTime += delta;
    startTime = Date.now();
    var uniformTime = (totalTime % 60000) / 2500;
    stats.update();
    renderer.clear();
    renderer.render(scene,camera);
}
