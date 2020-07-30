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
    camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000);
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
    camera.position.set(0,0.4,2);
    camera.rotation.x = -0.14

    //Add Directional Light
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.6, 18);
    spotLight.position.set(0,3,1);
    spotLight.castShadow = true;
    spotLight.rotation.x = 1;
    scene.add(spotLight);

    // //Add Ambient Light
    // var ambientLight = new THREE.AmbientLight(0xEEEEEE, 1);
    // scene.add(ambientLight);

    //Add Stats to Scene
    stats = createStats();

    // //orientation Cube
    // var cubeGeometry = new THREE.BoxGeometry(.05,.05,.05);
    // var cubeMaterial = new THREE.MeshLambertMaterial( {color: 0x00FFFF} );
    // cube = new THREE.Mesh (cubeGeometry, cubeMaterial);
    // scene.add( cube );
    // cube.castShadow = true;
    // cube.position.set(0,0.05,0);

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('assets/MTL/cabinetStasis.mtl', function( cabinetStasisMTL ){

        cabinetStasisMTL.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(cabinetStasisMTL);

        objLoader.load('assets/OBJ/cabinetStasis.obj', function ( cabinetStasis ) {
            scene.add( cabinetStasis );
            cabinetStasis.scale.set (0.1,0.1,0.1)
            cabinetStasis.rotation.y = Math.PI * 1.5;
            cabinetStasis.position.y = 0.146;
        });

    });
    
    mtlLoader.load('assets/MTL/cabinetAnim.mtl', function( cabinetAnimMTL ){

        cabinetAnimMTL.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(cabinetAnimMTL);

        objLoader.load('assets/OBJ/cabinetAnim.obj', function ( cabinetAnim ) {
            scene.add( cabinetAnim );
            cabinetAnim.scale.set (0.1,0.1,0.1)
            cabinetAnim.rotation.y = Math.PI * 1.5;
            cabinetAnim.position.y = 0.146;
        });

    });


    document.body.appendChild( stats.domElement );
    document.body.appendChild(renderer.domElement);

    animate();

}

function animate(){

    // cube.rotation.y += 0.01;
    // cube.rotation.x += 0.01;

    stats.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

window.onload = init;