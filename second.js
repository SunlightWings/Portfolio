import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

// // Torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const loader = new THREE.TextureLoader();
// const texture = loader.load('psp.jpg');
// const material = new THREE.MeshBasicMaterial({ map: texture });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 64, 128); // Increase the number of segments for smoother appearance
const loader = new THREE.TextureLoader();
const texture = loader.load('psp.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture }); // Use MeshStandardMaterial for lighting
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-45, 5, 45);
scene.add(torus);

// Earth Model
let earth;
const gltfLoader = new GLTFLoader();
gltfLoader.load('earth.glb', (gltf) => {
  earth = gltf.scene;
  earth.scale.set(0.052, 0.05, 0.05); // Adjust the scale of the earth model to make it slightly bigger
  earth.position.z = -5; // Adjust position of earth
  earth.position.setX(-25); // Adjust position of earth
  earth.rotation.y = Math.PI / 3; // Tilt the earth slightly
  scene.add(earth);
})
// Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);
moon.position.z = -20;
moon.position.setX(22);

// // Lights
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(-5, 25, 25);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30, 5, 35);
pointLight.intensity = 1.5; // Increase the intensity of the point light

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.5; // Increase the intensity of the ambient light
scene.add(pointLight, ambientLight);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  
Array(200).fill().forEach(addStar);
 
// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate);
//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.01;
//   moon.rotation.x += 0.005;
//   renderer.render(scene, camera);
// }

// animate();

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    if (earth) {
      earth.rotation.y += 0.001; // Rotate the earth continuously from west to east
    }
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    moon.rotation.x += 0.005;
    renderer.render(scene, camera);
  }
  
  animate();

// import './style.css';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// // Setup
// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 0, 50); // Adjust camera position

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg'),
// });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);

// // Torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const loader = new THREE.TextureLoader();
// const texture = loader.load('psp.jpg');
// const material = new THREE.MeshBasicMaterial({ map: texture });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// // Earth Model
// let earth;
// const gltfLoader = new GLTFLoader();
// gltfLoader.load('earth.glb', (gltf) => {
//   earth = gltf.scene;
//   earth.scale.set(0.01, 0.01, 0.01); // Adjust the scale of the earth model
//   earth.position.z = -10; // Adjust position of earth
//   earth.position.setX(-20); // Adjust position of earth
//   scene.add(earth);
// });

// // Moon
// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );
// scene.add(moon);
// moon.position.z = -20; // Adjust position of moon
// moon.position.setX(10); // Adjust position of moon

// // Lights
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);
// scene.add(pointLight);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjust ambient light intensity
// scene.add(ambientLight);

// // Scroll Animation
// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.05;
//   moon.rotation.y += 0.075;
//   moon.rotation.z += 0.05;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.rotation.y = t * -0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate);
//   torus.rotation.x += 0.01;
//   torus.rotation.y += 0.005;
//   torus.rotation.z += 0.01;
//   moon.rotation.x += 0.005;
//   renderer.render(scene, camera);
// }

// animate();
