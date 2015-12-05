/**
 * Created by brenden on 12/5/2015.
 */
var FlowTexture = function(options){
    var self = this instanceof  FlowTexture ? this : Object.create(FlowTexture.prototype);
    if(options === undefined)throw "must pass in options";
    TextureRenderer.call(self,options);

    if(options.lines === undefined) throw '"lines" is undefined';
    var lines = options.lines;
    var segments = [];
    for(var i = 0; i < lines.length; i ++){
        var line = lines[i];
        for(var j = 0; j < line.length - 1; j ++){
            segments.push([line[j], line[j + 1]])
        }
    }


    //the width of the textue we use to store line segments
    var width = 32;

    //make the texture
    var textureArray = new Float32Array(width * width * 4);
    //just fill it with zeros
    for(var i = 0; i < textureArray.length; i +=4){
        textureArray[i] = Math.round(Math.random() * self.canvas.width);
        textureArray[i + 1] = Math.round(Math.random() * self.canvas.height);
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

    //the plane that we will render on
    self.plane = new THREE.Mesh(new THREE.PlaneGeometry(self.canvas.width,self.canvas.height,1,1),shaderMaterial);

    //add the plane to the scene
    self.scene.add(self.plane);

    self.getTexture = function(){
        self.render();
    };


};

FlowTexture.prototype = Object.create(TextureRenderer.prototype);