import * as THREE from "three";
export default class Renderer {
  constructor(experience) {
    this.experience = experience;
    this.canvas = experience.canvas;
    this.sizes = experience.sizes;
    this.scene = experience.scene.instance;
    this.camera = experience.camera.instance;
    this.time = experience.time;

    // renderer
    this.setInstance();

    // resize listener
    this.setResize();

    // render loop
    this.setTick();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canva,
      antialias: true,
      alpha: true,
    });

    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.0;

    this.instance.outputColorSpace = THREE.SRGBColorSpace;

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  // window resize handler
  setResize() {
    this.sizes.on("resize", () => {
      this.instance.setSize(this.sizes.width, this.sizes.height);
      //pixel ratio
      this.instance.setPixelRatio(this.sizes.pixelRatio);
    });
  }

  setTick() {
    this.time.on("tick", () => {
      this.render();
    });
  }

  render() {
    this.instance.render(this.scene, this.camera);
  }
}
