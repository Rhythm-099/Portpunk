import * as THREE from "three";
export default class Scene {
  constructor() {
    this.instance = new THREE.Scene();
    this.instance.fog - new THREE.FogExp2("#0a0a0f", 0.035);
  }
}
