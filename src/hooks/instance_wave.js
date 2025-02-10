import { useEffect, useRef } from "react";
import * as THREE from 'three';

let particles, count = 0;
const SEPARATION = 10, amountX = 100, amountY = 100;
const numParticles = amountX * amountY;
const positions = new Float32Array(numParticles * 3);

const Instance_wave = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const { current: mount } = mountRef;
        if (!mount) return;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-100, 0, -405);
        camera.lookAt(0, 0, 0);

        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0x00ffff));
        scene.add(new THREE.DirectionalLight(0xff0000, 2));

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial();

        const instancedMesh = new THREE.InstancedMesh(geometry, material , numParticles);
        scene.add(instancedMesh);

        const dummy = new THREE.Object3D();
        let index = 0;
        for( let ix = 0; ix < amountX; ix++){
            for( let iy = 0; iy < amountY; iy++){
                dummy.position.set(
                    ix * SEPARATION - ((amountX * SEPARATION) / 2),
                    0,
                    iy * SEPARATION - ((amountY * SEPARATION) / 2)
                );
                dummy.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
                dummy.updateMatrix();
                instancedMesh.setMatrixAt(index++, dummy.matrix);
            }
        }
        instancedMesh.instanceMatrix.needsUpdate = true;

        window.addEventListener('resize', onWindowResize);
        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        

        function animate(){
            requestAnimationFrame(animate);
            let index = 0;
            const count = Date.now() * 0.001;
            for(let ix = 0; ix < amountX; ix++){
                for(let iy = 0; iy < amountY; iy++){
                    dummy.position.set(
                        ix * SEPARATION - ((amountX * SEPARATION) / 2) + Math.sin((iy + count) * 0.3) * 10,
                        Math.sin((ix + count) * 0.3) * 10,
                        iy * SEPARATION - ((amountY * SEPARATION) / 2) + Math.sin((ix + count) * 0.3) * 10
                    );

                    const scale = (Math.sin((ix + count) * 0.3) + 1) * 0.5 + (Math.sin((iy + count) * 0.5) + 1) * 0.5;
                    dummy.scale.set(scale, scale, scale);

                    dummy.updateMatrix();
                    instancedMesh.setMatrixAt(index++, dummy.matrix);
                }
            }
            instancedMesh.instanceMatrix.needsUpdate = true;
            renderer.render(scene, camera);
        }
        animate();

    }, []);

    return mountRef;
}

export default Instance_wave;