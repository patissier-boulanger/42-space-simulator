import * as THREE from "three";

const parameters = {
  count: 1000,
  size: 0.02,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  ousideColor: "#ff6030",
};

const createGalaxy = (
  scene,
  count,
  size,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  insideColor,
  ousideColor,
  model = null,
) => {
  return {
    scene,
    count,
    size,
    radius,
    branches,
    spin,
    randomness,
    randomnessPower,
    insideColor,
    ousideColor,
    model,

    realize() {
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial({
        size: this.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });
      const positions = new Float32Array(this.count * 3); // each vertex have 3 value for x y z
      const colors = new Float32Array(this.count * 3);
      const colorInside = new THREE.Color(this.insideColor);
      const colorOutside = new THREE.Color(this.ousideColor);

      for (let i = 0; i < this.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * this.radius; //x radius 0 to 5
        const spinAngle = radius * this.spin;
        const branchAngle = ((i % this.branches) / this.branches) * Math.PI * 2; // 왜 / this.branches 하나면 정규화하기 위해
        const randomX =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;
        const randomY =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;
        const randomZ =
          Math.pow(Math.random(), this.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          this.randomness *
          radius;

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX; // x
        positions[i3 + 1] = 0 + randomY; // y
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ; // z

        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      ); //3은 how many value per vertex
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particles = new THREE.Points(geometry, material);

      this.model = particles;
      this.scene.add(particles);
    },
    setScale(x, y, z) {
      this.model.scale.set(x, y, z);
    },

    setPosition(x, y, z) {
      this.model.position.set(x, y, z);
    },

    setRotation(x, y, z) {
      this.model.rotation.set(x, y, z);
    },
  };
};

export { createGalaxy };
