// import React, { useEffect, useRef } from 'react'
// import * as THREE from "three"
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// function ThreeScene() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const container = mountRef.current;
//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     // Scene setup
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf9f9f9); // light background

//     const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
//     camera.position.set(0, 0, 130);

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     container.appendChild(renderer.domElement);

//     // Light setup
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soften shadows & brighten dots
//     scene.add(ambientLight);

//     // Add subtle base sphere for globe (no wireframe, just color with transparent material)
//     const radius = 50;
//     const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
//     const globeMaterial = new THREE.MeshBasicMaterial({
//       color: 0xf9f9f9, // same as background for subtle effect
//       transparent: true,
//       opacity: 0.4, // subtle visibility
//       side: THREE.DoubleSide,
//     });
//     const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
//     scene.add(globeMesh);

//     // Canvas for map image processing
//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     const worldImage = new Image();
//     worldImage.crossOrigin = 'Anonymous';
//     worldImage.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Equirectangular-projection.jpg/1024px-Equirectangular-projection.jpg';

//     const pointsPositions = [];

//     worldImage.onload = () => {
//       canvas.width = worldImage.width;
//       canvas.height = worldImage.height;
//       ctx.drawImage(worldImage, 0, 0);
//       const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

//       for (let i = 0; i < imgData.length; i += 4) {
//         const r = imgData[i];
//         const g = imgData[i + 1];
//         const b = imgData[i + 2];

//         if (r + g + b > 200) { // land pixel threshold
//           const px = (i / 4) % canvas.width;
//           const py = Math.floor((i / 4) / canvas.width);

//           const lon = (px / canvas.width) * 360 - 180;
//           const lat = 90 - (py / canvas.height) * 180;

//           const phi = THREE.MathUtils.degToRad(90 - lat);
//           const theta = THREE.MathUtils.degToRad(lon);

//           const x = -radius * Math.sin(phi) * Math.cos(theta);
//           const y = radius * Math.cos(phi);
//           const z = radius * Math.sin(phi) * Math.sin(theta);

//           pointsPositions.push(x, y, z);
//         }
//       }

//       // Geometry for landmass dots
//       const geometry = new THREE.BufferGeometry();
//       geometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsPositions, 3));

//       const material = new THREE.PointsMaterial({
//         color: 0xffffff, // white dots for land
//         size: 2.2, // increased dot size
//         sizeAttenuation: true,
//         opacity: 0.95,
//         transparent: true,
//       });

//       const points = new THREE.Points(geometry, material);
//       scene.add(points);
//     };

//     // Orbit Controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.autoRotate = true;
//     controls.autoRotateSpeed = 0.3;
//     controls.enableZoom = false;
//     controls.enablePan = false;

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       const w = container.clientWidth;
//       const h = container.clientHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       controls.dispose();
//       renderer.dispose();
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div
//       ref={mountRef}
//       style={{
//         width: '600px',
//         height: '600px',
//         background: '#f9f9f9',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//       }}
//     />
//   );
// }

// export default ThreeScene;
