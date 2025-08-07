import React, { useEffect, useRef } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


function ThreeScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        //Scene creation
        const scene = new THREE.Scene();

        //create camera
        const camera = new THREE.PerspectiveCamera(
            75,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 5;




        //create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
        mountRef.current.appendChild(renderer.domElement)

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // smoother dragging
        controls.dampingFactor = 0.05;

        //create a cube
        const loader = new THREE.TextureLoader();
        const geometry = new THREE.IcosahedronGeometry(1, 12);
        const material = new THREE.MeshStandardMaterial({
            map: loader.load("/875earth.jpg")
        })
        const earthMesh = new THREE.Mesh(geometry, material)
        scene.add(earthMesh)

        // ✅ Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        //Animation loop
        const animate = () => {
            requestAnimationFrame(animate)
            earthMesh.rotation.x += 0.001;
            earthMesh.rotation.y += 0.001;
            renderer.render(scene, camera)
        }
        animate()

        //cleanup unmount
        return () => {
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }

        }

    }, [])
    return (
        <div ref={mountRef} className='w-[90vh] h-[80vh] overflow-hidden border border-gray-300 rounded-md shadow-lg'>

        </div>
    )
}

export default ThreeScene
