export default class EventEmitter {
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  // On - Subscribe to an event
  on(_names, callback) {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("EventEmitter: no event name provided");
      return false;
    }

    if (typeof callback === "undefined") {
      console.warn("EventEmitter: no callback provided");
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const name = this.resolveName(_name);
      if (!(this.callbacks[name.namespace] instanceof Object)) {
        this.callbacks[name.namespace] = {};
      }

      if (!(this.callbacks[name.namespace][name.value] instanceof Array)) {
        this.callbacks[name.namespace][name.value] = [];
      }
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  //Off - Unsubscribe from an event
  off(_names) {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("EventEmitter: no event name provided");
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (
        this.callbacks[name.namespace] instanceof Object &&
        this.callbacks[name.namespace][name.value] instanceof Array
      ) {
        delete this.callbacks[name.namespace][name.value];
      }
    });

    return this;
  }

  // Trigger - Fire an event
  trigger(_name, _args) {
    if (typeof _name === "undefined" || _name === "") {
      console.warn("EventEmitter: no event name provided");
      return false;
    }

    let finalResult = null;
    let result = null;

    const args = !(_args instanceof Array) ? [] : _args;

    let names = this.resolveNames(_name);
    let name = this.resolveName(names[0]);

    for (const namespace in this.callbacks) {
      if (
        this.callbacks[namespace] instanceof Object &&
        this.callbacks[namespace][name.value] instanceof Array
      ) {
        this.callbacks[namespace][name.value].forEach((callback) => {
          result = callback.apply(this, args);
          if (typeof result !== "undefined") {
            finalResult = result;
          }
        });
      }
    }

    return finalResult;
  }

  //Helper - resolveNames
  resolveNames(_names) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    names = names.split(" ");
    return names;
  }

  //Helper - resolveName
  resolveName(name) {
    const newName = {};
    const parts = name.split(".");

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = parts.length > 1 && parts[1] !== "" ? parts[1] : "base";

    return newName;
  }
}
