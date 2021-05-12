import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import * as dat from "dat.gui";

import { createStars } from "./meshs/stars";
import { createPlanet } from "./meshs/planet";
import { createGalaxy } from "./meshs/galaxy";
import { createObject } from "./meshs/object";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

useHelpers(scene);

const gui = new dat.GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const orbitMaterial = new THREE.MeshToonMaterial({
  color: "white",
  side: THREE.BackSide,
});

const main = async () => {
  //async load
  const [
    starTexture,
    polymapTexture,
    whaleModel,
    cubeMapModel,
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
    cloudModel,
  ] = await loadAllModel();

  //Create solarSystem
  const sun = createPlanet(scene, sunModel);
  sun.setShadow();
  sun.setScale(250000);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(orbitMaterial, 1.01);
  sun.realize();

  const mercury = createPlanet(scene, mecuryModel);
  mercury.realize();
  mercury.setShadow();
  mercury.setScale(800000);
  mercury.setOutLine(orbitMaterial, 1.01);
  mercury.setOrbit(100000, 50, 300, "indianred", Math.PI / 2 - 0.15);

  const venus = createPlanet(scene, venusModel);
  venus.realize();
  venus.setShadow();
  venus.setScale(1000000);
  venus.setOutLine(orbitMaterial, 1.01);
  venus.setOrbit(130000, 50, 300, "indianred", Math.PI / 2);

  const earth = createPlanet(scene, earthModel);
  earth.realize();
  earth.setShadow();
  earth.setScale(1000000);
  earth.setOutLine(orbitMaterial, 1.01);
  earth.setOrbit(160000, 50, 300, "indianred", Math.PI / 2);

  const mars = createPlanet(scene, marsModel);
  mars.realize();
  mars.setShadow();
  mars.setScale(1000000);
  mars.setOutLine(orbitMaterial, 1.01);
  mars.setOrbit(250000, 150, 300, "indianred", Math.PI / 2);

  const jupiter = createPlanet(scene, jupiterModel);
  jupiter.realize();
  jupiter.setShadow();
  jupiter.setScale(800000);
  jupiter.setOutLine(orbitMaterial, 1.01);
  jupiter.setOrbit(300000, 150, 300, "indianred", Math.PI / 2);

  const saturn = createPlanet(scene, saturnModel);
  saturn.realize();
  saturn.setShadow();
  saturn.setScale(800000);
  saturn.setOutLine(orbitMaterial, 1.01);
  saturn.setOrbit(350000, 150, 300, "indianred", Math.PI / 2);

  const uranus = createPlanet(scene, uranusModel);
  uranus.realize();
  uranus.setShadow();
  uranus.setScale(800000);
  uranus.setOutLine(orbitMaterial, 1.01);
  uranus.setOrbit(500000, 150, 300, "indianred", Math.PI / 2);

  const neptune = createPlanet(scene, neptuneModel);
  neptune.realize();
  neptune.setShadow();
  neptune.setScale(800000);
  neptune.setOutLine(orbitMaterial, 1.01);
  neptune.setOrbit(600000, 150, 300, "indianred", Math.PI / 2);

  const pluto = createPlanet(scene, plutoModel);
  pluto.realize();
  pluto.setShadow();
  pluto.setScale(1000000);
  pluto.setOutLine(orbitMaterial, 1.01);
  pluto.setOrbit(650000, 100, 300, "indianred", Math.PI / 2 - 50);

  const cloudGroup = new THREE.Group();
  scene.add(cloudGroup);

  createStars({
    scene,
    texture: starTexture,
    count: 80000,
    diffusionRate: 6000000,
    size: 2000,
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

  //create object
  const whale = createObject(scene, whaleModel);
  whale.realize();
  whale.setScale(1000, 1000, 1000);
  whale.setPosition(10000, 1200000, 0);
  whale.setShadow();
  whale.animate(0);

  const spaceShip = createObject(scene, spaceShipModel.scene);
  spaceShip.realize();
  spaceShip.setScale(3000, 3000, 3000);
  spaceShip.setPosition(180000, 30000, 0);
  spaceShip.setShadow();
  spaceShip.model.rotation.x = -Math.PI / 2;

  const cloud = cloudModel.scene.children[0].clone();
  cloud.receiveShadow = true;
  cloud.castShadow = true;
  cloud.scale.set(20, 20, 20);
  cloud.position.set(0, 0, 0);
  cloudGroup.add(cloud);

  const cloud2 = cloudModel.scene.children[0].clone();
  cloud2.receiveShadow = true;
  cloud2.castShadow = true;
  cloud2.scale.set(50, 50, 50);
  cloud2.position.set(0, 10000, 0);
  cloudGroup.add(cloud2);

  /**
   * test
   */

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-50000, 100000, -50000),
    new THREE.Vector3(50000, 100000, 50000),
    new THREE.Vector3(-50000, 100000, -50000),
  ]);

  let counter = 0;
  function moveModelAlongPath() {
    if (counter <= 1) {
      const axis = new THREE.Vector3();
      const up = new THREE.Vector3(0, 0, 0);

      cloudGroup.position.copy(curve.getPointAt(counter));
      const tangent = curve.getTangentAt(counter).normalize();
      axis.crossVectors(up, tangent).normalize();
      var radians = Math.acos(up.dot(tangent));
      cloudGroup.quaternion.setFromAxisAngle(axis, radians);
      counter += 0.00005;
    } else {
      counter = 0;
    }
  }
  /**
   * test
   */

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight("white", 0.324);
  scene.add(ambientLight);

  const sunLight = new THREE.PointLight("indianred", 4, 6000000);
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
    1000,
    20000000000000,
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
  renderer.setClearColor(new THREE.Color("#030303"));

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.6;

  const rt = new THREE.WebGLCubeRenderTarget(polymapTexture.image.height);
  rt.fromEquirectangularTexture(renderer, polymapTexture);
  // scene.background = rt.texture;
  // scene.background = cubeMapModel;

  /**
   * Post Processing
   */

  const effectComposer = new EffectComposer(renderer);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  effectComposer.setSize(sizes.width, sizes.height);

  const dotScreenPass = new DotScreenPass();
  const unrealBloomPass = new UnrealBloomPass();
  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);
  // effectComposer.addPass(dotScreenPass);
  effectComposer.addPass(unrealBloomPass);

  unrealBloomPass.strength = 0.819;
  unrealBloomPass.radius = 0.191;
  unrealBloomPass.threshold = 0.6;

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    if (whale.animationMixer) {
      whale.animationMixer.update(deltaTime / 10);
    }

    whale.rotate(0.0001, "y");
    spaceShip.rotate(0.005, "z");

    moveModelAlongPath();

    sun.rotate(0.0001);

    mercury.revolve(elapsedTime, 0.03, 20, 100000, 1300);
    mercury.rotate(0.003);

    venus.revolve(elapsedTime, 0.03, 42, 130000, 0);
    venus.rotate(0.003);

    earth.revolve(elapsedTime, 0.03, 23, 160000, 0);
    earth.rotate(0.003);

    mars.revolve(elapsedTime, 0.03, 53, 250000, 0);
    mars.rotate(0.003);

    jupiter.revolve(elapsedTime, 0.03, 13, 300000, 0);
    jupiter.rotate(0.003);

    saturn.revolve(elapsedTime, 0.03, 23, 350000, 0);
    saturn.rotate(0.003);

    uranus.revolve(elapsedTime, 0.03, 62, 500000, 0);
    uranus.rotate(0.003);

    neptune.revolve(elapsedTime, 0.03, 53, 600000, 0);
    neptune.rotate(0.003);

    pluto.revolve(elapsedTime, 0.08, 73, 650000, -20000);
    pluto.rotate(0.003);

    // Update controls
    controls.update();

    // Post processing Render
    effectComposer.render();

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

  gui.add(unrealBloomPass, "enabled");
  gui.add(unrealBloomPass, "strength").min(0).max(2).step(0.001);
  gui.add(unrealBloomPass, "radius").min(0).max(2).step(0.001);
  gui.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001);
};

main();
