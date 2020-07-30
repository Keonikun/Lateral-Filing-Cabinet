var scene, camera, renderer;

function init(){

    //Basic setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(20, window.innerHeight/window.innerWidth, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    //setup renderer
    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //Create and Position Plane
    var planeGeometry = new THREE.PlaneGeometry(20, 20, 10, 10);
    var planeMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    plane = new THREE.Mesh (planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add( plane );
    plane.rotation.x -= Math.PI /2;

    //Position Three.js Camera
    camera.position.set(0, 2.4, -5);

    //Add Directional Light
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.6, 18);
    spotLight.position.set(-3,6,-3);
    spotLight.castShadow = true;
    scene.add(spotLight);

    //Add Ambient Light
    var ambientLight = new THREE.AmbientLight(0xEEEEEE, 1);
    scene.add(ambientLight);

}

function animate(){

}