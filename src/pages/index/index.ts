/* 3rd party */
import * as THREE from "three";
const GLTFfLoader = require("three-gltf-loader");

/* custom */
import { environment } from "../../../environment.js";
import "./index.scss";

/* Managers */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
scene.name = "scene";
const renderer = new THREE.WebGLRenderer({ antialias: true });
const fontLoader = new THREE.FontLoader();
const gltfLoader: THREE.GLTFLoader = new GLTFfLoader();

/* Objects, TODO use object oriented programming to nest material, mesh and geo */
let material: THREE.Material;
let cubeGeo: THREE.Geometry;
let cubeMesh: THREE.Mesh;
let textGeo: THREE.TextGeometry;
let textMesh: THREE.Mesh;

/* Code */
window.addEventListener("resize", resize, false);
document.addEventListener('mousemove', parralax, false);
init();
animate();

/* Functions (tied to objects) */
function init() { // MUST RUN
    camera.position.z = 8;

    fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
        textGeo = new THREE.TextGeometry("SEEK THE THRUTH", {
            font: loadedFont,
            size: 1,
            height: 1,
        });

        textMesh = new THREE.Mesh(textGeo, material);
        textMesh.name = "text";
        scene.add(textMesh);
    });


    const video = document.createElement("video");
    video.src = environment.assetsUrl + "videos/hollande.mp4";
    video.load();
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: 1, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	// 		movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( 16, 9, 4, 4 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    scene.add(movieScreen);

    gltfLoader.load("assets/three-models/test.glb", (loadedModel) => {
        scene.add(loadedModel.scene);
    });


    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // Add to html
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function animate() { // MUST RUN
    requestAnimationFrame(animate); // Do not change
    renderer.render(scene, camera); // Do not change
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function parralax(event: MouseEvent) {
    const mouseX = event.clientX - window.innerWidth / 2;
    const mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x = (mouseX - camera.position.x) * 0.01;
    camera.position.y = (mouseY - camera.position.y) * 0.01;
    camera.lookAt(scene.position);
};

/* Exports to access elements for inspector */
(window as any).scene = scene;
(window as any).THREE = THREE;
