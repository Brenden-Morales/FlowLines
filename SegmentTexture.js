/**
 * Created by bmorales on 12/3/2015.
 */
var SegmentTexture = function(options){
    var self = this instanceof  SegmentTexture ? this : Object.create(SegmentTexture.prototype);

    if(options.width === undefined){
        throw "texture width is not defined";
    }
    if(options.width !== 32){
        throw "shader is hardcoded to texture size of 32";
    }
    var width = options.width;

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

    self.getTexture = function(){
        return texture;
    };

    self.getResolution = function(){
        return new THREE.Vector2(width,width);
    };

};