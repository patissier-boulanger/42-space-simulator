import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

import { createStars } from "./meshs/stars";
import { createPlanet } from "./meshs/planet";

import { moveMesh } from "./controller/meshController";

import { useHelpers } from "./utils/helpers";
import { loadAllModel } from "./utils/loaders";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const main = async () => {
  useHelpers(scene);
  const gui = new dat.GUI();

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
  ] = await loadAllModel();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const outlineMaterial1 = new THREE.MeshToonMaterial({
    color: "white",
    side: THREE.BackSide,
  });

  const sun = createPlanet(scene, sunModel);
  sun.setShadow();
  sun.setScale(15000);
  sun.setPosition(0, 0, 0, 0);
  sun.setOutLine(outlineMaterial1, 1.01);
  sun.realize();

  const mercury = createPlanet(scene, mecuryModel);
  mercury.setShadow();
  mercury.setScale(30000);
  mercury.setPosition(0, 0, 0, 10000);
  mercury.setOutLine(outlineMaterial1, 1.01);
  mercury.setOrbit(10000, 5, 300, "indianred", Math.PI / 2 - 0.15);
  mercury.realize();

  const venus = createPlanet(scene, venusModel);
  venus.setShadow();
  venus.setScale(30000);
  venus.setPosition(0, 0, 0, 13000);
  venus.setOutLine(outlineMaterial1, 1.01);
  venus.setOrbit(13000, 5, 300, "indianred", Math.PI / 2);
  venus.realize();

  const earth = createPlanet(scene, earthModel);
  earth.setShadow();
  earth.setScale(30000);
  earth.setPosition(0, 0, 0, 16000);
  earth.setOutLine(outlineMaterial1, 1.01);
  earth.setOrbit(16000, 5, 300, "indianred", Math.PI / 2);
  earth.realize();

  const mars = createPlanet(scene, marsModel);
  mars.setShadow();
  mars.setScale(30000);
  mars.setPosition(0, 0, 0, 25000);
  mars.setOutLine(outlineMaterial1, 1.01);
  mars.setOrbit(25000, 15, 300, "indianred", Math.PI / 2);
  mars.realize();

  const jupiter = createPlanet(scene, jupiterModel);
  jupiter.setShadow();
  jupiter.setScale(30000);
  jupiter.setPosition(0, 0, 0, 30000);
  jupiter.setOutLine(outlineMaterial1, 1.01);
  jupiter.setOrbit(30000, 15, 300, "indianred", Math.PI / 2);
  jupiter.realize();

  const saturn = createPlanet(scene, saturnModel);
  saturn.setShadow();
  saturn.setScale(40000);
  saturn.setPosition(0, 0, 0, 35000);
  saturn.setOutLine(outlineMaterial1, 1.01);
  saturn.setOrbit(35000, 15, 300, "indianred", Math.PI / 2);
  saturn.realize();

  const uranus = createPlanet(scene, uranusModel);
  uranus.setShadow();
  uranus.setScale(40000);
  uranus.setPosition(0, 0, 0, 50000);
  uranus.setOutLine(outlineMaterial1, 1.01);
  uranus.setOrbit(50000, 15, 300, "indianred", Math.PI / 2);
  uranus.realize();

  const neptune = createPlanet(scene, neptuneModel);
  neptune.setShadow();
  neptune.setScale(40000);
  neptune.setPosition(0, 0, 0, 60000);
  neptune.setOutLine(outlineMaterial1, 1.01);
  neptune.setOrbit(60000, 15, 300, "indianred", Math.PI / 2);
  neptune.realize();

  const pluto = createPlanet(scene, plutoModel);
  pluto.setShadow();
  pluto.setScale(40000);
  pluto.setPosition(0, 0, 0, 65000);
  pluto.setOutLine(outlineMaterial1, 1.01);
  pluto.setOrbit(65000, 10, 300, "indianred", Math.PI / 2 - 50);
  pluto.realize();

  createStars({
    scene,
    texture: starTexture,
    count: 50000,
    diffusionRate: 400000,
    size: 200,
  });

  // /**
  //  * Test cube
  //  */
  // const rotatePlanetParameter = {
  //   scene,
  //   x: 100,
  //   y: 0,
  //   z: 0,
  //   radius: 100,
  //   axisFromParent: 0,
  //   widthSegment: 200,
  //   heightSegment: 200,
  // };
  // const rotatePlanet = createCustomPlanet(rotatePlanetParameter);

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
    20000000000,
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

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //move planet
    // moveMesh(rotatePlanet, elapsedTime);

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
