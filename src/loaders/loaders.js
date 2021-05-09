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
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);

const _loadModel = (url, loader) => {
  return new Promise((resolve) => {
    loader.load(url, resolve);
  });
};

// const loadGltf = () => {};

const _promisyfyModels = () => {
  const texturePromise = _loadModel("/textures/particles/3.png", textureLoader);
  const cubeTexturePromise = _loadModel(
    [
      "/textures/skybox/SkyboxX-.png",
      "/textures/skybox/SkyboxX+.png",
      "/textures/skybox/SkyboxY-.png",
      "/textures/skybox/SkyboxY+.png",
      "/textures/skybox/SkyboxZ-.png",
      "/textures/skybox/SkyboxZ+.png",
    ],
    cubeTextureLoader,
  );

  return [texturePromise, cubeTexturePromise];
};

const loadAllModel = async () => {
  return Promise.all(_promisyfyModels());
};

export { loadAllModel };
