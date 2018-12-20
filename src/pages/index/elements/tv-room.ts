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
        this._light = new THREE.HemisphereLight(0x404040); // soft white light
        this._light.intensity = 0;
        this._bMoveCameraToTv = false;
    }

    /* Public methods */
    start() {
        this.init();
        this.animate();
        document.addEventListener('mousemove', this.parralax, false);
        window.addEventListener("resize", this.resize, true);
    }

    addMainScene(): Promise<any> {
        return new Promise((resolve, reject) => {
            // TODO bake lighting
            // TODO add bloom
            this.addProgressBar();
            this._gltfLoader.load("assets/three-models/tvroom.glb", (loadedModel) => {
                const text = this._scene.getObjectByName("loading-text");
                this._scene.remove(text);
                loadedModel.scene.name = "tvroom";
                this._scene.add(loadedModel.scene);

                this._cup = this._scene.getObjectByName("Cup");

                const videoMaterial = this.loadVideoMaterial("news.mp4");
                const tvScreen = this._scene.getObjectByName("TVScreenFlat");
                (tvScreen as any).material = videoMaterial;

                document.body.style.cursor = "url('/assets/images/icons/weed-cursor.cur'), auto";
                resolve();
                this.removeProgressBar();
            }, (xhr: ProgressEvent) => {
                this.updateProgressBar(Math.floor(xhr.loaded / 55602248 * 100) + "% loaded");
            });
        });
    }

    moveCameraToTv() {
        document.removeEventListener('mousemove', this.parralax);
        const tv = this._scene.getObjectByName("TV");
        this._camera.position.x = tv.position.x;
        this._camera.position.y = 1;
        this._camera.lookAt(tv.position);
        this._bMoveCameraToTv = true;
    }

    changeVideo(src: string) {
        this._video.muted = true;
        const videoMaterial = this.loadVideoMaterial(src);
        const tvScreen = this._scene.getObjectByName("TVScreenFlat");
        (tvScreen as any).material = videoMaterial;
    }

    /* Getters */
    get scene(): THREE.Scene { return this._scene; }
    get light(): THREE.AmbientLight { return this._light; }

    /* Setters */
    set light(light: THREE.AmbientLight) { this._light = light; }
    set videoMute(mute: boolean) { this._video.muted = mute; }

    /* Private methods */
    private init() {
        this.scene.add(this._light);
        this._fontLoader.load("assets/three-fonts/roboto_medium_regular.typeface.json", (loadedFont) => {
            let material: THREE.Material;
            let textGeo = new THREE.TextGeometry("You made the right choice.", {
                font: loadedFont,
                size: 0.8,
                height: 0.3,
            });

            let textMesh = new THREE.Mesh(textGeo, material);
            textMesh.position.x = -6;
            textMesh.position.z = -2;
            textMesh.name = "loading-text";
            this._scene.add(textMesh);
        });

        // Add to html
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
    }

    private animate = () => { // MUST RUN
        requestAnimationFrame(this.animate); // Do not change

        if (this._cup) {
            this._cup.rotation.y += 0.01;
        }

        if (this._bMoveCameraToTv) {
            this._camera.position.z -= 0.05;
            this._camera.position.y -= 0.005;
            if (this._camera.position.z <= -6) {
                this._bMoveCameraToTv = false;
            }
        }

        this._renderer.render(this._scene, this._camera); // Do not change
    }

    private addProgressBar() {
        this._progress = document.createElement("p");
        this._progress.style.top = "10px";
        this._progress.style.paddingLeft = "10px";
        this._progress.style.color = "white";
        document.body.append(this._progress);
    }

    private removeProgressBar() {
        this._progress.remove();
    }

    private updateProgressBar(text: string) {
        this._progress.innerHTML = text;
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
        this._video = document.createElement("video");
        this._video.src = environment.assetsUrl + "videos/" + filename;
        this._video.load();
        this._video.loop = true;
        this._video.muted = false;
        this._video.play();
        const videoTexture = new THREE.VideoTexture(this._video);
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
    private _light: THREE.AmbientLight;

    private _bMoveCameraToTv: boolean;
    private _video: HTMLVideoElement;
    private _cup: THREE.Object3D;
    private _progress: HTMLParagraphElement;
}