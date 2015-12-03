/**
 * Created by bmorales on 12/3/2015.
 */
var SegmentTexture = function(options){
    var self = this instanceof  SegmentTexture ? this : Object.create(SegmentTexture.prototype);
    TextureRenderer.call(self,options);

    var width = 32;

    //make the texture
    var textureArray = new Float32Array(width * width * 4);
    //just fill it with zeros
    for(var i = 0; i < textureArray.length; i += 4){
        textureArray[i] = Math.round(Math.random() * window.innerWidth);
        textureArray[i + 1] = Math.round(Math.random() * window.innerHeight);
        textureArray[i + 2] = 0;
        textureArray[i + 3] = 1.0;
    }

    //make the texture
    var texture = new THREE.DataTexture(textureArray,width,width,THREE.RGBAFormat,THREE.FloatType);
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    texture.flipY = false;

    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            segments : {type : "t", value : texture}
        },
        vertexShader: document.getElementById("passThroughVertex").textContent,
        fragmentShader: document.getElementById("flowMapFragment").textContent,
        transparent : true
    });

    //the plane that we will render the spat on
    //TODO set the material to a custom shader gaussian creator thing
    self.plane = new THREE.Mesh(new THREE.PlaneGeometry(self.cameraWidth,self.cameraHeight,1,1),shaderMaterial);

    //add the plane to the scene
    self.scene.add(self.plane);

    self.getTexture = function(renderer){
        self.render(renderer);
        return self.renderTexture;
    };


};

SegmentTexture.prototype = Object.create(TextureRenderer.prototype);