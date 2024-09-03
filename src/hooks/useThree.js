import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const useThree = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const { current: mount } = mountRef;
    if (!mount) return;

    // Three.jsのシーン、カメラ、レンダラーのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // 立方体の作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return mountRef;
};

export default useThree;