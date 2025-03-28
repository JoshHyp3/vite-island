import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // <-- Added Import

// Scene setup (Scene, Camera, Renderer)
// ... (keep this setup) ...
document.getElementById('app').appendChild(renderer.domElement);

// Add OrbitControls
// ... (keep this) ...

// --- REMOVE CUBE CODE ---
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Add lights
// ... (keep the lights) ...

// --- LOAD GLTF MODEL ---
const loader = new GLTFLoader(); // <-- Instantiate Loader
let characterModel;

loader.load(
    '/silver_movie_eyes_fixed_sxsg.glb', // <-- *** REPLACE FILENAME ***
    (gltf) => {
        console.log('Character model loaded successfully!');
        characterModel = gltf.scene;
        scene.add(characterModel); // <-- Add model to scene
        // Adjust scale/position if needed here
    },
    undefined, // Optional progress callback can go here
    (error) => {
        console.error('An error happened loading the character model:', error); // <-- Error handling
    }
);


// Position camera (You might need to adjust this later based on model size)
camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // --- REMOVE CUBE ROTATION ---
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // You could add animations for your characterModel here later

  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
// ... (keep this) ...

animate();