import * as THREE from "three";

import Sizes from "./Sizes.js";
import Time from "../utils/Time.js";
import Scene from "./Scene.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "../world/World.js";

export default class Experience {
  constructor(canvas) {
    //singleton check
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new Scene();
    this.canvas = canvas;
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);

    //global resize handler
    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.update();
    this.world.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.instance.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    // disposer renderer
    this.renderer.instance.dispose();
    //clear singleton
    Experience.instance = null;
  }
}
