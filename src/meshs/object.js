import * as THREE from "three";

const createObject = (scene, model, animationMixer = null) => {
  return {
    scene,
    model,
    animationMixer,

    setShadow() {
      this.model.castShadow = true;
      this.model.receiveShadow = true;
    },

    setScale(scale) {
      this.model.scale.set(scale, scale, scale);
    },

    setPosition(x, y, z) {
      this.model.position.set(x, y, z);
    },

    rotate(rotateSpeedRate, rotateAxis) {
      this.model.rotation[rotateAxis] += rotateSpeedRate;
    },

    animate(animationNumber) {
      this.animationMixer = new THREE.AnimationMixer(this.model);
      const animation = this.animationMixer.clipAction(
        this.model.animations[animationNumber],
      );
      animation.play();
    },

    realize() {
      this.scene.add(this.model);
    },
  };
};

export { createObject };
