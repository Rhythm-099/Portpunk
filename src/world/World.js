export default class World {
  constructor(experience) {
    this.experience = experience;
    this.scene = experience.scene.instance;

    console.log("World initialized -> ready for content");
  }

  resize() {}

  update() {}
}
