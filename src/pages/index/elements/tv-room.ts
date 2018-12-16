/* 3rd party */
import * as THREE from "three";
import { environment } from "../../../../environment.js";
const GLTFfLoader = require("three-gltf-loader");

/* Three.js */
export class TVRoom {
    constructor() {
        this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        this._camera.position.z = 12;
        this._gltfLoader = new GLTFfLoader();
        this._scene = new THREE.Scene();
        this._scene.name = "scene";
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._fontLoader = new THREE.FontLoader();

        this.init();
        this.animate();
        document.addEventListener('mousemove', this.parralax, false);
        window.addEventListener("resize", this.resize, true);
    }

    /* Getters */
    get scene(): THREE.Scene { return this._scene; }

    /* Private methods */
    private init() {
        this._fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
            let material: THREE.Material;
            let textGeo = new THREE.TextGeometry("LOADING...", {
                font: loadedFont,
                size: 1,
                height: 1,
            });

            let textMesh = new THREE.Mesh(textGeo, material);
            textMesh.position.x = -3;
            textMesh.name = "loading-text";
            this._scene.add(textMesh);
        });

        var light = new THREE.HemisphereLight(0x404040); // soft white light
        light.intensity = 50;
        this.scene.add(light);

        this._gltfLoader.load("assets/three-models/tvroom.glb", (loadedModel) => {
            const text = this._scene.getObjectByName("loading-text");
            this._scene.remove(text);
            loadedModel.scene.name = "tvroom";
            this._scene.add(loadedModel.scene);

            const videoMaterial = this.loadVideoMaterial("hollande.mp4");
            const tvScreen = this._scene.getObjectByName("TVScreenFlat");
            (tvScreen as any).material = videoMaterial;
        });

        // Add to html
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
    }

    private animate = () => { // MUST RUN
        requestAnimationFrame(this.animate); // Do not change
        this._renderer.render(this._scene, this._camera); // Do not change
    }

    private resize = () => {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private parralax = (event: MouseEvent) => {
        const mouseX = event.clientX - window.innerWidth / 2;
        const mouseY = event.clientY - window.innerHeight / 2;
        this._camera.position.x = (mouseX - this._camera.position.x) * 0.01;
        this._camera.position.y = (mouseY - this._camera.position.y) * 0.01;
        if (this._camera.position.y < -1.5) {
            this._camera.position.y = -1.5;
        }
        this._camera.lookAt(this._scene.position);
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

    /* private members */
    private _camera: THREE.PerspectiveCamera;
    private _scene: THREE.Scene;
    private _renderer: THREE.WebGLRenderer;
    private _fontLoader: THREE.FontLoader;
    private _gltfLoader: THREE.GLTFLoader;
}