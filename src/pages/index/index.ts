/* 3rd party */
import * as THREE from "three";
const GLTFfLoader = require("three-gltf-loader");

/* custom */
import { environment } from "../../../environment.js";
import "./index.scss";

/* Three.js Managers */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
scene.name = "scene";
const renderer = new THREE.WebGLRenderer({ antialias: true });
const fontLoader = new THREE.FontLoader();
const gltfLoader: THREE.GLTFLoader = new GLTFfLoader();

/* Snoopa vision Managers */
const snoopaContainer = document.createElement("div");
let snoopaImage: HTMLImageElement;
let snoopaPosition: ClientRect | DOMRect;

/* Three.js */
function init() {
    camera.position.z = 8;

    fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
        let material: THREE.Material;
        let textGeo = new THREE.TextGeometry("SEEK THE\nTRUTH", {
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
    video.loop = true;
    video.muted = true;
    video.play();
    window.addEventListener("click", () => {
        // video.muted = false;
    }, {once: true});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    return new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: 1, side: THREE.DoubleSide });
}

/* Snoopa vision */
function initSnoop() {
    snoopaContainer.className = "snoopa-vision";
    snoopaContainer.innerHTML = `<img src=${ environment.assetsUrl }images/snoopa-vision.png>`;
    snoopaImage = snoopaContainer.firstElementChild as HTMLImageElement;
    placeSnoopAtRandom();
    snoopaContainer.style.opacity = "0";
    document.body.appendChild(snoopaContainer);
    snoopaPosition = snoopaContainer.getBoundingClientRect();
}

function placeSnoopAtRandom() {
    snoopaContainer.style.position = "absolute";
    snoopaContainer.style.width = "150px";
    snoopaImage.style.width = "150px";
    snoopaImage.style.maxHeight = "200px";
    const posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 150));
    const posY = Math.floor(Math.random() * Math.floor(window.innerHeight - 200));
    snoopaContainer.style.left = posX.toString() + "px";
    snoopaContainer.style.top = posY.toString() + "px";
}

const updateSnoopHints = (event: MouseEvent) => {
    // TODO client x and y and snoopa container position
    //console.log("snoopposition: " + snoopaPosition.right);
    //console.log("mouseX: " + event.clientX);
}

const revealSnoop = () => {
    const audio = new Audio(environment.assetsUrl + "/audio/snoopa-vision.mp3");
    audio.play();
    snoopaContainer.style.opacity = "100";
    document.removeEventListener("mousemove", updateSnoopHints);
}

const openFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
        document.documentElement.msRequestFullscreen();
    }
}

function blockWebsite(isActivated: boolean) {
    console.log("DO NOT EXIT");
}

/* Event listenners and function calls */
init();
animate();
initSnoop();

snoopaContainer.addEventListener("mouseenter", revealSnoop, {once: true});
snoopaContainer.addEventListener("click", openFullscreen, {once: true});
const isFullScreen = matchMedia("all and (display-mode: fullscreen");
isFullScreen.onchange = (event: Event) => {
    if (!isFullScreen.matches) {
        blockWebsite(true);
    } else {
        // blockWebsite(false);
    }
};
document.addEventListener("mousemove", updateSnoopHints);
document.addEventListener('mousemove', parralax, false);
document.addEventListener("resize", resize, false);

/* Exports to access elements for inspector */
(window as any).scene = scene;
(window as any).THREE = THREE;
