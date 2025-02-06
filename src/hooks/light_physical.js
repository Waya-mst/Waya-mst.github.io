import { useEffect, useRef } from "react";
import { Reflector } from 'three/addons/objects/Reflector.js'
import * as THREE from 'three';

const params = {
    shadows: true,
    exposure: 0.68,
    bulbPower: Object.keys(bulbLuminousPowers)[4],
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0]
}

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

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);

        const scene = new THREE.Scene();

        const bulbGeometry = new THREE.SphereGeometry(0.02, 16, 8);
        const bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);

        bulbMat = new THREE.MeshStandardMaterial({
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });
        bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
        bulbLight.position.set(0, 0, 0);
        bulbLight.castShadow = true;
        scene.add(bulbLight);

        function animate() {
            renderer.toneMappingExposure = Math.pow(0.94, 5.0);
            renderer.shadowMap.enabled = params.shadows;
            bulbLight.castShadow = params.shadows;

            if (params.shadows !== previousShadowMap) {
                previousShadowMap = params.shadows;
            }

            bulbLight.power = bulbLuminousPowers[params.bulbPower];

            const time = Date.now() * 0.0005;

        }
    })
};

export default Light_Physical;