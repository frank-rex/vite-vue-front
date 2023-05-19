import * as THREE from 'three'
import NSTC from '../assets/font/NotoSansTC-Regular.otf?url'
import { Text } from 'troika-three-text'
//import { RAPIER } from '@dimforge/rapier3d-compat'
import raaglb from '../assets/place/restaurant.glb?url'
//import server from '../assets/people/server(nodding).fbx?url'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'

const restaurant = () => {
    const loader = new GLTFLoader();
    const floader = new FBXLoader(); //for 載入人物
    let camera, controls, scene, renderer;
    var clock = new THREE.Clock(); // 時間物件 for 更新第一人稱視角控制 
    var mixer, action //for 人物動畫
    
    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcccccc);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(-20, 30, 0);

        // // controls

        controls = new OrbitControls(camera, renderer.domElement);
        controls.listenToKeyEvents(window); // optional

        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;

        controls.screenSpacePanning = false;

        controls.minDistance = 100;
        controls.maxDistance = 500;

        controls.maxPolarAngle = Math.PI / 2;

        // controls = new FirstPersonControls(camera, renderer.domElement); // 第一人稱視角(相機,繪製輸出的Canvas物件)
        // controls.lookSpeed = 0.012; //環視速度(預設為0.005)
        // controls.movementSpeed = 5; //移動速度(預設為1)
        // controls.lookVertical = false; //垂直環視
        // controls.constrainVertical = false; //垂直限制

        // lights

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(1, 1, 1);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(- 1, - 1, - 1);
        scene.add(dirLight2);

        // const ambientLight = new THREE.AmbientLight( 0x222222 );
        // scene.add( ambientLight );

        //加入地板
        const planeGeometry = new THREE.PlaneGeometry(600, 600)
        const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 })
        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.rotation.x = -0.5 * Math.PI // 使平面與 y 軸垂直，並讓正面朝上
        plane.position.set(0, 0, 0)
        scene.add(plane)

        const axesHelper = new THREE.AxesHelper(100);
        scene.add(axesHelper);

        window.addEventListener('resize', onWindowResize);

    }

    const myText = new Text()
    function textInteraction() {
        myText.font = NSTC
        myText.text = ' 我想下班'
        myText.fontSize = 2
        myText.position.set(-5, 35, -5)
        myText.color = 0x9966FF
        scene.add(myText)
    }
    import('@dimforge/rapier3d-compat').then(RAPIER => {
        // Use the RAPIER module here.
        let gravity = { x: 0.0, y: -9.81, z: 0.0 };
        let world = new RAPIER.World(gravity);

        // Create the ground
        let groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.1, 10.0);
        world.createCollider(groundColliderDesc);

        // Create a dynamic rigid-body.
        let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(0.0, 1.0, 0.0);
        let rigidBody = world.createRigidBody(rigidBodyDesc);

        // Create a cuboid collider attached to the dynamic rigidBody.
        let colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
        let collider = world.createCollider(colliderDesc, rigidBody);

        // Game loop. Replace by your own game loop system.
        let gameLoop = () => {
            // Ste the simulation forward.  
            world.step();

            // Get and print the rigid-body's position.
            let position = rigidBody.translation();
            console.log("Rigid-body position: ", position.x, position.y, position.z);

            setTimeout(gameLoop, 16);
        };

        gameLoop();
    })

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function loadmodles() {
        loader.load(raaglb, (gltf) => {
            gltf.scene.scale.set(5, 5, 5);//設定大小
            gltf.scene.position.set(0, 7, 25);//設定位置
            scene.add(gltf.scene)
        })
        // floader.load(server, (obj) => {
        //     mixer = new THREE.AnimationMixer(obj)
        //     //action = obj.mixer.clipAction(obj.animations[0])
        //     //action.play()
        //     obj.scale.set(0.01, 0.01, 0.01)
        //     obj.position.set(0, 8.3, -8.7)
        //     scene.add(obj)

        // })

    }
    function animate() {

        requestAnimationFrame(animate);

        //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        //controls.update(clock.getDelta());

        if (mixer) mixer.update(clock.getDelta()) //for 人物動畫

        render();

    }
    function render() {

        renderer.render(scene, camera);

    }
    return { init, textInteraction, loadmodles, animate }
}
export default restaurant