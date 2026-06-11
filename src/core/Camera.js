import * as THREE from "three";
export default class Camera {
  constructor(experience) {
    this.experience = experience;
    this.sizes = experience.sizes;
    this.scene = experience.scene.instance;
    this.canvas = experience.canvas;

    //setup Camera
    this.setInstance();

    //resize event listener
    this.setResize();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75, //FOV
      this.sizes.width / this.sizes.height, //Aspect Ration
      0.1, //Near clipping plane
      100, //Far clipping plane
    );

    this.instance.position.set(0, 0, 3);
    this.scene.add(this.instance);
  }

  // resize handler
  setResize() {
    this.sizes.on("resize", () => {
      this.instance.aspect = this.sizes.width / this.sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  update() {}
}
