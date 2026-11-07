"use client";

import { useEffect, useRef } from "react";
import type { Mesh } from "three";

export function HeroScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (cancelled || !host.current) return;
      const container = host.current;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      container.appendChild(canvas);

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: window.devicePixelRatio < 2, powerPreference: "low-power" });
      } catch {
        canvas.remove();
        container.dataset.webgl = "unsupported";
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
      camera.position.set(0, 0, 5.4);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);

      const sculpture = new THREE.Group();
      scene.add(sculpture);
      const geometry = new THREE.IcosahedronGeometry(1.12, 3);
      const positions = geometry.attributes.position;
      for (let index = 0; index < positions.count; index += 1) {
        const x = positions.getX(index);
        const y = positions.getY(index);
        const z = positions.getZ(index);
        const length = Math.sqrt(x * x + y * y + z * z) || 1;
        const ripple = 1 + 0.055 * Math.sin(x * 7.1 + z * 3.7) * Math.cos(y * 6.4 - z * 2.3);
        positions.setXYZ(index, (x / length) * ripple, (y / length) * ripple, (z / length) * ripple);
      }
      geometry.computeVertexNormals();
      const stone = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xc9c3b8, roughness: 0.48, metalness: 0.12, flatShading: true }));
      sculpture.add(stone);

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 13), new THREE.LineBasicMaterial({ color: 0xd93636, transparent: true, opacity: 0.66 }));
      edges.scale.setScalar(1.004);
      sculpture.add(edges);

      const pointsGeometry = new THREE.BufferGeometry();
      const points = new Float32Array(geometry.attributes.position.array);
      pointsGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
      sculpture.add(new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0xf2a65a, size: 0.025, transparent: true, opacity: 0.88, sizeAttenuation: true })));

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xf2a65a, transparent: true, opacity: 0.44 });
      const ringA = new THREE.Mesh(new THREE.TorusGeometry(1.53, 0.006, 6, 150), ringMaterial);
      ringA.rotation.set(0.74, 0.2, 0.4);
      sculpture.add(ringA);
      const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.004, 6, 150), new THREE.MeshBasicMaterial({ color: 0xd93636, transparent: true, opacity: 0.36 }));
      ringB.rotation.set(-0.35, 0.6, -0.7);
      sculpture.add(ringB);

      scene.add(new THREE.AmbientLight(0x77736c, 2.3));
      const key = new THREE.PointLight(0xffd6a1, 44, 9);
      key.position.set(2.1, 2.4, 3.2);
      scene.add(key);
      const red = new THREE.PointLight(0xd93636, 26, 7);
      red.position.set(-2.2, -1.2, 2.4);
      scene.add(red);

      let width = 1;
      let height = 1;
      const resize = () => {
        const bounds = container.getBoundingClientRect();
        width = Math.max(1, bounds.width);
        height = Math.max(1, bounds.height);
        camera.aspect = width / height;
        camera.position.z = width < 560 ? 6.25 : 5.4;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const motionTarget = new THREE.Vector2(0, 0);
      const motionCurrent = new THREE.Vector2(0, 0);
      const onPointer = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const bounds = container.getBoundingClientRect();
        motionTarget.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 0.25, ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.18);
      };
      container.addEventListener("pointermove", onPointer, { passive: true });

      let frame = 0;
      let active = false;
      const render = (time: number) => {
        if (!active) return;
        if (!reduceMotion) {
          motionCurrent.lerp(motionTarget, 0.035);
          sculpture.rotation.y = time * 0.00012 + motionCurrent.x;
          sculpture.rotation.x = Math.sin(time * 0.00016) * 0.07 + motionCurrent.y;
          ringA.rotation.z += 0.0002;
          ringB.rotation.x -= 0.00014;
        }
        renderer.render(scene, camera);
        if (!reduceMotion) frame = requestAnimationFrame(render);
      };
      const setActive = (next: boolean) => {
        if (active === next) return;
        active = next;
        if (active) render(performance.now());
        else cancelAnimationFrame(frame);
      };
      const visibility = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting && !document.hidden), { threshold: 0.05 });
      visibility.observe(container);
      const onVisibility = () => setActive(!document.hidden && container.getBoundingClientRect().bottom > 0 && container.getBoundingClientRect().top < window.innerHeight);
      document.addEventListener("visibilitychange", onVisibility);
      container.dataset.webgl = "ready";

      cleanup = () => {
        active = false;
        cancelAnimationFrame(frame);
        visibility.disconnect();
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        container.removeEventListener("pointermove", onPointer);
        scene.traverse((item) => {
          const mesh = item as Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => material.dispose());
          }
        });
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      };
    };

    void boot();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div className="hero-scene" ref={host} aria-hidden="true"><span className="hero-scene__fallback" /></div>;
}


