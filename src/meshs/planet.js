import * as THREE from "three";
import * as dat from "dat.gui";

const createPlanet = ({
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

export { createPlanet };
