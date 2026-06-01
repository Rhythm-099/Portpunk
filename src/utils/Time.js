import EventEmitter from "./EventEmitter.js";
export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now(); //app starting timestamp
    this.current = this.start; //current timestamp
    this.elapsed = 0; //total time elapsed
    this.delta = 16; //time difference between frames

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now(); //get current time
    this.delta = currentTime - this.current; //difference
    this.current = currentTime; //set current time to now
    this.elapsed = this.current - this.start; //update elapsed time to now - start

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
