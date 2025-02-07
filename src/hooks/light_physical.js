import { useEffect, useRef } from "react";
import { Reflector } from 'three/addons/objects/Reflector.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three';
import { request } from "http";

const bulbLuminousPowers = {
    '110000 lm (1000W)': 110000,
    '3500 lm (300W)': 3500,
    '1700 lm (100W)': 1700,
    '800 lm (60W)': 800,
    '400 lm (40W)': 400,
    '180 lm (25W)': 180,
    '20 lm (4W)': 20,
    'Off': 0
};

const hemiLuminousIrradiances = {
    '0.0001 lx (Moonless Night)': 0.0001,
    '0.002 lx (Night Airglow)': 0.002,
    '0.5 lx (Full Moon)': 0.5,
    '3.4 lx (City Twilight)': 3.4,
    '50 lx (Living Room)': 50,
    '100 lx (Very Overcast)': 100,
    '350 lx (Office Room)': 350,
    '400 lx (Sunrise/Sunset)': 400,
    '1000 lx (Overcast)': 1000,
    '18000 lx (Daylight)': 18000,
    '50000 lx (Direct Sun)': 50000
};

const params = {
    shadows: true,
    exposure: 0.68,
    bulbPower: Object.keys(bulbLuminousPowers)[4],
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0]
}


let previousShadowMap = false;

const Light_Physical = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const { current: mount } = mountRef;
        if (!mount) return;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setAnimationLoop(animate);
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        mount.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5);

        const scene = new THREE.Scene();

        const bulbGeometry = new THREE.SphereGeometry(0.05, 16, 8);
        const bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);

        const bulbMat = new THREE.MeshStandardMaterial({
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });
        bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
        bulbLight.position.set(0, 0, 0);
        bulbLight.castShadow = true;
        scene.add(bulbLight);

        const floorMat = new THREE.MeshStandardMaterial({
            roughness: 0.8,
            color: 0xffffff,
            metalness: 0.2,
            bumpScale: 1
        });

        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = -Math.PI / 2.0;
        scene.add(floorMesh);

        const mirrorGeometry = new THREE.PlaneGeometry(5, 5);
        const mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0x889999
        });
        mirror.rotateY(-Math.PI / 2.5);
        mirror.position.set(1, 0, 1);
        
        scene.add(mirror);

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 1, 0);
        controls.enableDamping = true;
        
        




        let animationId;
        function animate() {
            //requestAnimationFrame(animate);

            renderer.toneMappingExposure = Math.pow(0.94, 5.0);
            renderer.shadowMap.enabled = params.shadows;
            bulbLight.castShadow = params.shadows;

            if (params.shadows !== previousShadowMap) {
                previousShadowMap = params.shadows;
            }

            bulbLight.power = bulbLuminousPowers[params.bulbPower];

            const time = Date.now() * 0.0005;
            bulbLight.position.y = Math.cos(time) * 0.75 + 1.25;

            controls.update();
            renderer.render(scene, camera);
            //animationId = requestAnimationFrame(animate);
        }
        animate();

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onWindowResize);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return mountRef;
};

export default Light_Physical;