import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { createStars } from "./creators/createStars";
import { useHelpers } from "./helpers/helpers";
import { loadAllModel } from "./loaders/loaders";

/**
 * Base
 */

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// helpers
useHelpers(scene);

const asyncLoader = async () => {
  const [texture, cubeTexture] = await loadAllModel();

  //stars
  const stars = createStars(texture, 50000);
  scene.add(stars);

  //skybox
  scene.background = cubeTexture;
};
asyncLoader();

/**
 * Test cube
 */

const testPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(50, 200, 200),
  new THREE.MeshStandardMaterial({ wireframe: true, color: "red" }),
);

scene.add(testPlanet);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight("white", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

const sunLight = new THREE.PointLight("orange", 0, 700);
gui.add(sunLight, "intensity").min(0).max(1000).step(0.001);

sunLight.position.set(0, 5, 0);
scene.add(sunLight);

const sphereSize = 2;
const pointLightHelper = new THREE.PointLightHelper(sunLight, sphereSize);

scene.add(pointLightHelper);

// const light = new THREE.AmbientLight("green", 1000, 100);
// light.position.set(50, 50, 50);
// scene.add(light);

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  2000,
);
camera.position.set(0, 200, 100);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
