import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shader/vert.glsl"
import fragmentShader from "./shader/frag.glsl"

const useThree = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const { current: mount } = mountRef;
        if (!mount) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const modelmaterial = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uColor: { value: new THREE.Color(0x008080) },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uTime: { value: 0.0 },
            }
        });

        let rot = 0;
        let mouseX = 0;
        let mouseY = 0;

        // レンダラーを作成
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // シーンを作成
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xadd8e6);

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        camera.position.set(10, 10, 10);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const loader = new GLTFLoader();
        loader.load("/model/saru.glb", (gltf) => {
            const model = gltf.scene;
            model.scale.set(4, 4, 4);
            scene.add(model);

            model.traverse((child) => {
                console.log(child); 
                if (child.isMesh) {
                    const geometry = child.geometry;
                    const count = geometry.attributes.position.count;

                    const sarurandoms = new Float32Array(count);
                    for (let i = 0; i < count; i++) {
                        sarurandoms[i] = Math.random();
                    }
                    geometry.setAttribute("saruRandom", new THREE.BufferAttribute(sarurandoms, 1));

                    console.log(material.uniforms.uMouse);
                    child.material = modelmaterial;
                }
            });
        });

        const geometry = new THREE.SphereGeometry(1, 14, 20);
        const positionAttribute = geometry.attributes.position;

        const count = geometry.attributes.position.count;
        const randoms = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            randoms[i] = Math.random();
        }

        geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));


        // マテリアル
        const material = new THREE.RawShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uColor: { value: new THREE.Color(0x000000) },
                uMouse: { value: new THREE.Vector2(0, 0) }, // 初期値は(0, 0)
                uTime: { value: 0.0 },
            }
        });

        // メッシュ
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        window.addEventListener("mousemove", (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = (event.clientY / window.innerHeight) * 2 - 1;

            material.uniforms.uMouse.value.set(mouseX, mouseY);
            modelmaterial.uniforms.uMouse.value.set(mouseX, mouseY);
        })

        const clock = new THREE.Clock();
        let animationId;
        const animation = () => {

            const targetRot = (mouseX / window.innerWidth) * 360;
            rot += (targetRot - rot) * 0.02;

            const radian = rot * Math.PI / 180;
            // camera.position.x = 10 * radian;
            // camera.position.y = 10 * Math.cos(radian);

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