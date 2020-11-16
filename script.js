import * as THREE from './vendor/three.js-master/build/three.module.js';
import Stats from "./vendor/three.js-master/examples/jsm/libs/stats.module.js";
import {OrbitControls} from "./vendor/three.js-master/examples/jsm/controls/OrbitControls.js";

const Scene = {
    vars: {
        container: null,
        scene: null,
        renderer: null,
        camera: null,
        stats: null,
        controls: null
    },
    init: () => {
        Scene.vars.container = document.createElement('div');
        Scene.vars.container.classList.add('fullscreen');
        document.body.appendChild(Scene.vars.container);

        // Création de la scène
        Scene.vars.scene = new THREE.Scene();
        Scene.vars.scene.background = new THREE.Color(0xa0a0a0);

        Scene.vars.renderer = new THREE.WebGLRenderer({antialias: true});
        Scene.vars.renderer.setPixelRatio(window.devicePixelRatio);
        Scene.vars.renderer.setSize(window.innerWidth, window.innerHeight);
        Scene.vars.container.appendChild(Scene.vars.renderer.domElement);

        //Création de la caméra
        Scene.vars.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        Scene.vars.camera.position.set(-1.5, 210, 572);
        let light = new THREE.HemisphereLight(0xFFFFFF, 0x444444, .5);
        light.position.set(0, 700, 0);
        Scene.vars.scene.add(light);

        //Création du sol
        let mesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2000, 2000),
            new THREE.MeshLambertMaterial({color: new THREE.Color(0x888888)})
        );
        mesh.rotation.x = -Math.PI / 2;
        Scene.vars.scene.add(mesh);

        let grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
        grid.material.opacity = .2;
        grid.material.transparent = true;
        Scene.vars.scene.add(grid);

        //Création de la bulle
        let material = new THREE.MeshPhongMaterial({color: new THREE.Color(0xffffff)});
        material.side = THREE.DoubleSide;
        let sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1000, 32, 32)
        );
        Scene.vars.scene.add(sphere);

        window.addEventListener('resize', Scene.onWindowResize, false);

        // Mise en place des controls et limites
        Scene.vars.controls = new OrbitControls(Scene.vars.camera, Scene.vars.renderer.domElement);
        // Scene.vars.controls.minDistance = 300;
        // Scene.vars.controls.maxDistance = 600;
        // Scene.vars.controls.minPolarAngle = Math.PI / 4;
        // Scene.vars.controls.maxPolarAngle = Math.PI / 2;
        // Scene.vars.controls.minAzimuthAngle = Math.PI / 4;
        // Scene.vars.controls.maxAzimuthAngle = Math.PI / 4;

        Scene.vars.controls.target.set(0, 100, 0);
        Scene.vars.controls.update();

        Scene.vars.stats = new Stats();
        Scene.vars.container.appendChild(Scene.vars.stats.dom);
        // Retrait du loader
        let loader = document.querySelector("#loading");
        loader.parentNode.removeChild(loader);

        Scene.animate();
    },
    onWindowResize: () => {
        Scene.vars.camera.aspect = window.innerWidth / window.innerHeight;
        Scene.vars.camera.updateProjectionMatrix();
        Scene.vars.renderer.setSize(window.innerWidth / window.innerHeight);
    },
    animate: () => {
        Scene.render();
        requestAnimationFrame(Scene.animate);
    },
    render: () => {
        Scene.vars.renderer.render(Scene.vars.scene, Scene.vars.camera);
    }
};
Scene.init();