/**
 * Created by brenden on 10/31/2015.
 */
var TextureRenderer = function(options) {
    var self = this instanceof TextureRenderer ? this : Object.create(TextureRenderer.prototype);
    if(options.canvas == undefined) throw '"canvas" is undefined';
    self.canvas = options.canvas;

    //setup renderer
    self.renderer = new THREE.WebGLRenderer( {
        antialias: false,
        alpha : true,
        canvas : self.canvas
    });
    self.renderer.setPixelRatio( window.devicePixelRatio );
    //self.renderer.setClearColor(0xffffff,1);
    self.renderer.setSize( self.canvas.width, self.canvas.height );

    //the camera that we will this texture with
    self.camera = new THREE.OrthographicCamera(self.canvas.width / -2, self.canvas.width / 2, self.canvas.height / 2,self.canvas.height / -2, 1, 10);
    self.camera.position.z = 2;

    //the scene that will hold all the objects
    self.scene = new THREE.Scene();

    //the texture that we'll be rendering the scene to
    self.renderTexture = new THREE.WebGLRenderTarget(self.canvas.width, self.canvas.height,{
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat});

    //render to the texture
    self.render = function(){
        //self.renderer.render(self.scene,self.camera,self.renderTexture);
        //TODO WHY DO I NEED TO DO THIS? WHAT THE HECK IS GOING ON? I HAVE NO IDEA!
        self.renderer.render(self.scene,self.camera);
    };


    return self;
};
