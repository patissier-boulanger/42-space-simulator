import * as THREE from "three";
const createStars = (texture, count) => {
  const starGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 400;
  }

  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  const starMaterial = new THREE.PointsMaterial({
    alphaMap: texture,
    transparent: true,
    depthWrite: false,
  });
  starMaterial.size = 0.2;
  starMaterial.sizeAttenuation = true;

  const stars = new THREE.Points(starGeometry, starMaterial);

  return stars;
};

export { createStars };
