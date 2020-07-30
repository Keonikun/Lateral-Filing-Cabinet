var scene, camera, renderer, cube;

//Create Stats
function createStats(){
    var stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';

    return stats;
}

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

    //Add Stats to Scene
    stats = createStats();

    //orientation Cube
    var cubeGeometry = new THREE.BoxGeometry(.05,.05,.05);
    var cubeMaterial = new THREE.MeshLambertMaterial( {color: 0x111111, transparent: true, opacity: 0} );
    cube = new THREE.Mesh (cubeGeometry, cubeMaterial);
    scene.add( cube );
    cube.position.set(-0.02, 1.2, 2);

    document.body.appendChild( stats.domElement );
    document.body.appendChild(renderer.domElement);

    animate();

}

function animate(){

    stats.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

window.onload = init;