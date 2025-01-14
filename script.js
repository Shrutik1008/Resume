// script.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);
renderer.setClearColor( 0x000000, 0 ); // Set clear color to transparent

// Create a more interesting geometry (example: a group of cubes)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial({ wireframe: true });
const group = new THREE.Group();

for (let i = 0; i < 20; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    group.add(mesh);
}
scene.add(group);

camera.position.z = 30;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Animate the group
    group.rotation.y += 0.005;
    group.rotation.x += 0.002;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP animations (example: animate camera position)
gsap.to(camera.position, {
    duration: 5,
    z: 40,
    y: 5,
    repeat: -1,
    yoyo: true, // Makes the animation go back and forth
    ease: "power1.inOut"
});

gsap.to(group.rotation, {duration: 10, y: Math.PI*2, repeat: -1, ease: "none"})