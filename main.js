import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// --- Basic Three.js Setup ---
const scene = new THREE.Scene();
// Optional: Set a background color to help distinguish from blank white
scene.background = new THREE.Color(0xdddddd); // Light gray

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true // Enable antialiasing for smoother edges
});
renderer.setSize(window.innerWidth, window.innerHeight);
// Assuming your HTML has <div id="app"></div>
document.getElementById('app').appendChild(renderer.domElement);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Optional: adds inertia to camera movement

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft ambient light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Brighter directional light
directionalLight.position.set(5, 10, 7.5); // Position the light
scene.add(directionalLight);
// Optional: Add shadows if needed later (more complex setup)
// renderer.shadowMap.enabled = true;
// directionalLight.castShadow = true;

// --- Sky Setup (Using Skydome approach) ---

const skyGeometry = new THREE.SphereGeometry(
    500, // Radius: Needs to be large enough to contain your whole scene
    32,  // Width segments
    15   // Height segments
);

// Choose ONE of the following material options:

// Option B: Textured Sky (if you have a panoramic/equirectangular image)
// Make sure the image is in your /public folder
const skyTexture = new THREE.TextureLoader().load('/path/to/your/sky_panorama.jpg'); // <-- REPLACE PATH
const skyMaterial_Texture = new THREE.MeshBasicMaterial({
    map: skyTexture,
    side: THREE.BackSide // Render on the inside
});

// --- Select the material you want to use ---
const sky = new THREE.Mesh(skyGeometry, skyMaterial_Color); // Use Color
// const sky = new THREE.Mesh(skyGeometry, skyMaterial_Texture); // OR Use Texture

// Add the sky dome to the scene
scene.add(sky);

// --- GLTF Model Loading ---
const loader = new GLTFLoader();
let loadedModel; // Variable to hold the loaded model

loader.load(
    // *** THE KEY CHANGE IS HERE: Point to wolf.glb ***
    '/wolf.glb',

    // --- Success Callback (onLoad) ---
    (gltf) => {
        console.log('SUCCESS: wolf.glb loaded successfully!');
        loadedModel = gltf.scene;

        // Add the loaded model to the scene
        scene.add(loadedModel);

        // --- Optional: Adjust position, scale ---
        // Log initial position to see where it loads
        console.log('Wolf model initial position:', loadedModel.position);
        // Example: Center it if needed
        // loadedModel.position.set(0, 0, 0);
        // Example: Scale it if it's too big or small
        // loadedModel.scale.set(1, 1, 1);

        // Optional: Traverse the model if you need to interact with specific parts
        // loadedModel.traverse((child) => {
        //     if (child.isMesh) {
        //         // Example: Make all meshes cast shadows
        //         // child.castShadow = true;
        //     }
        // });
    },

    // --- Progress Callback (onProgress - Optional) ---
    (xhr) => {
        // console.log(`wolf.glb ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
    },

    // --- Error Callback (onError) ---
    (error) => {
        console.error('ERROR: An error happened loading wolf.glb:', error);
    }
);

// --- Camera Positioning ---
// Adjust as needed, especially after seeing where the model loads
camera.position.set(0, 2, 5); // Slightly adjusted position example
controls.target.set(0, 1, 0); // Optional: Point controls towards model center Y=1

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);

  // Update controls (needed for damping)
  controls.update();

  // Add any animations for your loadedModel here later
  // if (loadedModel) {
  //   loadedModel.rotation.y += 0.005; // Example slow rotation
  // }

  // Render the scene
  renderer.render(scene, camera);
}

// --- Window Resize Handling ---
window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Start the animation loop ---
animate();