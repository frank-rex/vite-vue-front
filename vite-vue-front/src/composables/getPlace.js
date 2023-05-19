import { ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const getPlace = (place) => {
    const loader = new GLTFLoader();
    let camera, controls, scene, renderer;
    var clock =new THREE.Clock(); // 時間物件 for 更新第一人稱視角控制 
    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcccccc);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(2, 1, 0);

        // controls

        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.listenToKeyEvents(window); // optional

        // //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

        // controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        // controls.dampingFactor = 0.05;

        // controls.screenSpacePanning = false;

        // controls.minDistance = 100;
        // controls.maxDistance = 500;

        // controls.maxPolarAngle = Math.PI / 2;

        controls = new FirstPersonControls(camera, renderer.domElement); // 第一人稱視角(相機,繪製輸出的Canvas物件)
        controls.lookSpeed = 0.009; //環視速度(預設為0.005)
        controls.movementSpeed = 10; //移動速度(預設為1)
        controls.lookVertical = false; //垂直環視
        controls.constrainVertical = false; //垂直限制

        // lights

        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(1, 1, 1);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xffffff);
        dirLight2.position.set(- 1, - 1, - 1);
        scene.add(dirLight2);

        // const ambientLight = new THREE.AmbientLight( 0x222222 );
        // scene.add( ambientLight );

        //

        window.addEventListener('resize', onWindowResize);

    }
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    function loadmodles() {
        loader.load(place, (gltf) => {
            gltf.scene.scale.set(1, 1, 1);//設定大小
            gltf.scene.position.set(0, 0, 0);//設定位置
            scene.add(gltf.scene)
        })
    }
    function animate() {

        requestAnimationFrame(animate);

        //controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        controls.update(clock.getDelta());
        render();

    }
    function render() {

        renderer.render(scene, camera);

    }
    return { init, loadmodles, animate }
}
export default getPlace


