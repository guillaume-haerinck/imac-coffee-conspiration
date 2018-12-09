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

/* Code */
window.addEventListener("resize", resize, false);
document.addEventListener('mousemove', parralax, false);
init();
animate();

/* Functions (tied to Managers) */
function init() { // MUST RUN
    camera.position.z = 8;

    fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
        let material: THREE.Material;
        let textGeo = new THREE.TextGeometry("SEEK THE THRUTH", {
            font: loadedFont,
            size: 1,
            height: 1,
        });

        let textMesh = new THREE.Mesh(textGeo, material);
        textMesh.name = "text";
        scene.add(textMesh);
    });

    gltfLoader.load("assets/three-models/test.glb", (loadedModel) => {
        loadedModel.scene.name = "test";
        const videoMaterial = loadVideoMaterial("hollande.mp4");
        loadedModel.scene.children[2].material = videoMaterial;
        scene.add(loadedModel.scene);
    });

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

function loadVideoMaterial(filename: string): THREE.MeshBasicMaterial {
    const video = document.createElement("video");
    video.src = environment.assetsUrl + "videos/" + filename;
    video.load();
    video.muted = true;
    video.play();
    window.addEventListener("click", () => {
        video.muted = false;
    }, {once: true});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    return new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: 1, side: THREE.DoubleSide });
}

/* Exports to access elements for inspector */
(window as any).scene = scene;
(window as any).THREE = THREE;
