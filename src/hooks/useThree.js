import { useEffect, useRef }  from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vert.glsl"
import fragmentShader from "./shader/frag.glsl"

const useThree = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const {current: mount} = mountRef;
        if(!mount) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        camera.position.set(0.25, -0.25, 1);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

        const count = geometry.attributes.position.count;
        const randoms = new Float32Array(count);
        for(let i = 0; i < count; i++){
            randoms[i] = Math.random();
        }

        geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
        console.log(geometry);
        

        // マテリアル
        const material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        // メッシュ
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const clock = new THREE.Clock();
        let animationId;
        const animation = () => {

            const elapsedTime = clock.getElapsedTime();
            controls.update();

            // レンダリング
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animation);
        }
        animation();

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            mount.removeChild(renderer.domElement);
        }

    }, []);

    return mountRef;
};

export default useThree;