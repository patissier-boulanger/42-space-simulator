import * as THREE from "three";

const useHelpers = (scene) => {
  const axesHelper = new THREE.AxesHelper(5000);
  // const gridHelper = new THREE.GridHelper(500, 500);
  scene.add(axesHelper);
};

export { useHelpers };
