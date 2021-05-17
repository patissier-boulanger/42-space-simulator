import * as THREE from "three";

class Object {
  setShadow() {
    this.model.castShadow = true;
    this.model.receiveShadow = true;
  }

  setScale(scale) {
    this.model.scale.set(scale, scale, scale);
  }

  setPosition(x, y, z) {
    this.model.position.set(x, y, z);
  }

  setRotation(x, y, z) {
    this.model.rotation.set(x, y, z);
  }

  addToScene() {
    this.scene.add(this.model);
  }
}

export { Object };
