"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeImage({ url }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      35,
      el.clientWidth / el.clientHeight,
      0.1,
      100
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load(url);
    const geometry = new THREE.PlaneGeometry(4, 2.3);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    // Premium soft hover motion
    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
      mesh.rotation.x = Math.cos(Date.now() * 0.0004) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      el.removeChild(renderer.domElement);
    };
  }, [url]);

  return <div ref={mountRef} className="w-full h-80 md:h-96 lg:h-[420px]" />;
}
