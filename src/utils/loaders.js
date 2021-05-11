import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = function () {
  console.log("Loading complete!");
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
};

loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};

const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader(loadingManager);

const _loadModel = (url, loader) => {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
};

const _promisyfyModels = () => {
  const loadStarTexture = _loadModel("/textures/stars/1.png", textureLoader);

  const loadPolymapTexture = _loadModel(
    "/textures/skybox/panorama.png",
    textureLoader,
  );

  const gltfUrls = [
    "/textures/astronaut/scene.gltf",
    "/textures/planets/sun.gltf",
    "/textures/planets/earth.gltf",
    "/textures/planets/saturn.gltf",
    "/textures/planets/jupiter.gltf",
    "/textures/planets/uranus.gltf",
    "/textures/planets/neptune.gltf",
    "/textures/planets/mecury.gltf",
    "/textures/planets/pluto.gltf",
    "/textures/planets/mars.gltf",
    "/textures/planets/venus.gltf",
  ];

  const gltfPromises = gltfUrls.map((url) => {
    return _loadModel(url, gltfLoader);
  });

  return [loadStarTexture, loadPolymapTexture, ...gltfPromises];
};

const loadAllModel = async () => {
  return Promise.all(_promisyfyModels());
};

export { loadAllModel };
