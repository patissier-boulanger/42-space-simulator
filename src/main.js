import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { createStars } from "./meshs/stars";
import { createPlanet } from "./meshs/planet";
import { createGalaxy } from "./meshs/galaxy";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const main = async () => {
  useHelpers(scene);
  const gui = new dat.GUI();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const outlineMaterial1 = new THREE.MeshToonMaterial({
    color: "white",
    side: THREE.BackSide,
  });

  //async load
  const [
    starTexture,
    polymapTexture,
    astronautModel,
    sunModel,
    earthModel,
    saturnModel,
    jupiterModel,
    uranusModel,
    neptuneModel,
    mecuryModel,
    plutoModel,
    marsModel,
    venusModel,
    spaceShipModel,
    whaleModel,
  ] = await loadAllModel();

  console.log(spaceShipModel);
  const spaceShip = spaceShipModel.scene;
  spaceShip.scale.set(1000, 1000, 1000);
  spaceShip.position.set(0, 0, 0);
  scene.add(spaceShip);

  const sun = createPlanet(scene, sunModel);
  sun.setShadow();
  sun.setScale(25000);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(outlineMaterial1, 1.01);
  sun.realize();

  const mercury = createPlanet(scene, mecuryModel);
  mercury.realize();
  mercury.setShadow();
  mercury.setScale(80000);
  mercury.setOutLine(outlineMaterial1, 1.01);
  mercury.setOrbit(10000, 5, 300, "indianred", Math.PI / 2 - 0.15);

  const venus = createPlanet(scene, venusModel);
  venus.realize();
  venus.setShadow();
  venus.setScale(80000);
  venus.setOutLine(outlineMaterial1, 1.01);
  venus.setOrbit(13000, 5, 300, "indianred", Math.PI / 2);

  const earth = createPlanet(scene, earthModel);
  earth.realize();
  earth.setShadow();
  earth.setScale(80000);
  earth.setOutLine(outlineMaterial1, 1.01);
  earth.setOrbit(16000, 5, 300, "indianred", Math.PI / 2);

  const mars = createPlanet(scene, marsModel);
  mars.realize();
  mars.setShadow();
  mars.setScale(80000);
  mars.setOutLine(outlineMaterial1, 1.01);
  mars.setOrbit(25000, 15, 300, "indianred", Math.PI / 2);

  const jupiter = createPlanet(scene, jupiterModel);
  jupiter.realize();
  jupiter.setShadow();
  jupiter.setScale(40000);
  jupiter.setOutLine(outlineMaterial1, 1.01);
  jupiter.setOrbit(30000, 15, 300, "indianred", Math.PI / 2);

  const saturn = createPlanet(scene, saturnModel);
  saturn.realize();
  saturn.setShadow();
  saturn.setScale(50000);
  saturn.setOutLine(outlineMaterial1, 1.01);
  saturn.setOrbit(35000, 15, 300, "indianred", Math.PI / 2);

  const uranus = createPlanet(scene, uranusModel);
  uranus.realize();
  uranus.setShadow();
  uranus.setScale(50000);
  uranus.setOutLine(outlineMaterial1, 1.01);
  uranus.setOrbit(50000, 15, 300, "indianred", Math.PI / 2);

  const neptune = createPlanet(scene, neptuneModel);
  neptune.realize();
  neptune.setShadow();
  neptune.setScale(50000);
  neptune.setOutLine(outlineMaterial1, 1.01);
  neptune.setOrbit(60000, 15, 300, "indianred", Math.PI / 2);

  const pluto = createPlanet(scene, plutoModel);
  pluto.realize();
  pluto.setShadow();
  pluto.setScale(90000);
  pluto.setOutLine(outlineMaterial1, 1.01);
  pluto.setOrbit(65000, 10, 300, "indianred", Math.PI / 2 - 50);

  createStars({
    scene,
    texture: starTexture,
    count: 50000,
    diffusionRate: 400000,
    size: 200,
  });

  const galaxy = createGalaxy(
    scene,
    600,
    50,
    15,
    6,
    0.18,
    0.2,
    3,
    "indianred",
    "#ff6030",
  );
  galaxy.realize();
  galaxy.setPosition(600000, 70000, 0);
  galaxy.setScale(3000, 3000, 3000);
  galaxy.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  const galaxy2 = createGalaxy(
    scene,
    4000,
    40,
    150,
    5,
    0.2,
    0.2,
    3,
    "indianred",
    "indianred",
  );
  galaxy2.realize();
  galaxy2.setPosition(-5000000, 0, -20000);
  galaxy2.setScale(3000, 3000, 3000);
  galaxy2.setRotation(Math.PI / 2.5, 0, Math.PI / 2.5);

  const galaxy3 = createGalaxy(
    scene,
    5000,
    160,
    15,
    13,
    1.2,
    0.2,
    1,
    "#f79320",
    "#85301b",
  );
  galaxy3.realize();
  galaxy3.setPosition(300000, -400000, -30000);
  galaxy3.setScale(3000, 3000, 3000);
  galaxy3.setRotation(Math.PI / 3, 0, Math.PI / 3);

  /**
   * test
   */

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50000, 10000, -50000),
    new THREE.Vector3(50000, 10000, 50000),
    new THREE.Vector3(-50000, 10000, -50000),
  ]);

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(boxGeometry, boxMaterial);
  cube.position.set(80000, 0, 0);
  cube.scale.set(800, 800, 800);
  scene.add(cube);

  let mixer = null;

  const whale = whaleModel;
  whale.scale.set(1000, 1000, 1000);
  whale.position.set(10000, 1200000, 0);
  console.log(whale);
  whale.castShadow = true;
  whale.receiveShadow = true;
  scene.add(whale);

  mixer = new THREE.AnimationMixer(whale);
  const floating = mixer.clipAction(whale.animations[0]);
  floating.play();

  /**
   * test
   */

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("indianred", 7, 6000000);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);

  sunLight.position.set(1, 1, 1);
  scene.add(sunLight);

  const sphereSize = 2000;
  const pointLightHelper = new THREE.PointLightHelper(sunLight, sphereSize);
  scene.add(pointLightHelper);

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
    renderer.shadowMap.enabled = true;
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    100,
    200000000000,
  );
  camera.position.set(0, 200, 10000);
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 10));
  renderer.setClearColor(new THREE.Color("#042240"));

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.6;

  const rt = new THREE.WebGLCubeRenderTarget(polymapTexture.image.height);
  rt.fromEquirectangularTexture(renderer, polymapTexture);
  scene.background = rt.texture;

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (mixer) {
      mixer.update(deltaTime / 10);
    }

    whale.rotation.y += 0.0001;

    sun.rotate(0.0001);

    mercury.revolve(elapsedTime, 0.03, 20, 10000, 1300);
    mercury.rotate(0.003);

    venus.revolve(elapsedTime, 0.03, 42, 13000, 0);
    venus.rotate(0.003);

    earth.revolve(elapsedTime, 0.03, 23, 16000, 0);
    earth.rotate(0.003);

    mars.revolve(elapsedTime, 0.03, 53, 25000, 0);
    mars.rotate(0.003);

    jupiter.revolve(elapsedTime, 0.03, 13, 30000, 0);
    jupiter.rotate(0.003);

    saturn.revolve(elapsedTime, 0.03, 23, 35000, 0);
    saturn.rotate(0.003);

    uranus.revolve(elapsedTime, 0.03, 62, 50000, 0);
    uranus.rotate(0.003);

    neptune.revolve(elapsedTime, 0.03, 53, 60000, 0);
    neptune.rotate(0.003);

    pluto.revolve(elapsedTime, 0.08, 73, 65000, -20000);
    pluto.rotate(0.003);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  /**
   * Gui
   */

  const sunlightFolder = gui.addFolder("sunlight");
  sunlightFolder.add(sunLight, "intensity").min(0).max(100).step(1);

  const ambientLightFolder = gui.addFolder("ambientLight");
  ambientLightFolder.add(ambientLight, "intensity").min(0).max(1).step(0.001);
};

main();
