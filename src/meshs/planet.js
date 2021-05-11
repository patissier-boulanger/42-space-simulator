import * as THREE from "three";
import * as dat from "dat.gui";

const createCustomPlanet = ({
  scene,
  x,
  y,
  z,
  radius,
  axisFromParent,
  widthSegment,
  heightSegment,
}) => {
  const planetGeometry = new THREE.SphereGeometry(
    radius,
    widthSegment,
    heightSegment,
  );
  const planetMaterial = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  planet.position.set(x, y, z);
  scene.add(planet);

  return planet;
};

const addPlanetModel = (scene, model, position, scale, distanceFromAxis) => {
  const { x, y, z } = position;
  const planetModel = model.scene;

  planetModel.scale.set(scale, scale, scale);
  planetModel.position.set(x + distanceFromAxis, y, z);
  planetModel.castShadow = true;
  planetModel.receiveShadow = true;

  scene.add(planetModel);
  return planetModel;
};

export { createCustomPlanet, addPlanetModel };
