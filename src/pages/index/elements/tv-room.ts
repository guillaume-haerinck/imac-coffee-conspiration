/* 3rd party */
import * as THREE from "three";
import { environment } from "../../../../environment.js";
const GLTFfLoader = require("three-gltf-loader");

/* Three.js */
export class TVRoom {
    camera: THREE.PerspectiveCamera;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    fontLoader: THREE.FontLoader;
    gltfLoader: THREE.GLTFLoader;

    constructor() {
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 8;
        this.gltfLoader = new GLTFfLoader();
        this.scene = new THREE.Scene();
        this.scene.name = "scene";
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.fontLoader = new THREE.FontLoader();
    }

    init() {
        this.fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
          let material: THREE.Material;
          let textGeo = new THREE.TextGeometry("SEEK THE\nTRUTH", {
            font: loadedFont,
            size: 1,
            height: 1,
          });
      
          let textMesh = new THREE.Mesh(textGeo, material);
          textMesh.name = "text";
          this.scene.add(textMesh);
        });
      
        this.gltfLoader.load("assets/three-models/test.glb", (loadedModel) => {
          loadedModel.scene.name = "test";
          const videoMaterial = this.loadVideoMaterial("hollande.mp4");
          loadedModel.scene.children[2].material = videoMaterial;
          this.scene.add(loadedModel.scene);
        });
      
        // Add to html
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
      }
      
      animate = () => { // MUST RUN
        requestAnimationFrame(this.animate); // Do not change
        this.renderer.render(this.scene, this.camera); // Do not change
      }
      
      resize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
      
      parralax = (event: MouseEvent) => {
        const mouseX = event.clientX - window.innerWidth / 2;
        const mouseY = event.clientY - window.innerHeight / 2;
        this.camera.position.x = (mouseX - this.camera.position.x) * 0.01;
        this.camera.position.y = (mouseY - this.camera.position.y) * 0.01;
        this.camera.lookAt(this.scene.position);
      };
      
      private loadVideoMaterial(filename: string): THREE.MeshBasicMaterial {
        const video = document.createElement("video");
        video.src = environment.assetsUrl + "videos/" + filename;
        video.load();
        video.loop = true;
        video.muted = true;
        video.play();
        window.addEventListener("click", () => {
          // video.muted = false;
        }, { once: true });
      
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
      
        return new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: 1, side: THREE.DoubleSide });
      }    
}