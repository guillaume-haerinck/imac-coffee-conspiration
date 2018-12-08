/* 3rd party */
import * as THREE from "three";

/* custom */
import "./index.scss";

/* Managers */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
scene.name = "scene";
const renderer = new THREE.WebGLRenderer({ antialias: true });
const loader = new THREE.FontLoader();

/* Global variables */
let material: THREE.Material;
let cubeGeo: THREE.Geometry;
let cubeMesh: THREE.Mesh;
let textGeo: THREE.TextGeometry;

/* Code */
window.addEventListener("resize", resize, false);
init();
animate();

/* Functions (tied to global variables) */
function init() { // MUST RUN
    camera.position.z = 1;

    loader.load( "assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
        textGeo = new THREE.TextGeometry( "TEST", {
            font: loadedFont,
            size: 0.1,
            height: 0.1,
        });

        const textMesh = new THREE.Mesh(textGeo, material);
        textMesh.name = "text";
        scene.add(textMesh);
    });

    cubeGeo = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshNormalMaterial();
    cubeMesh = new THREE.Mesh(cubeGeo, material);
    cubeMesh.name = "cube";
    scene.add(cubeMesh);

    // Add to html
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() { // MUST RUN
    requestAnimationFrame(animate); // Do not change

    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.02;

    renderer.render(scene, camera); // Do not change
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/* Exports to access elements for inspector */
(window as any).scene = scene;
(window as any).THREE = THREE;
