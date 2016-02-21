/**
 * An animator is responsible for managing all the animations within
 * the scope of the react.
 */

class AnimationFrame {
  constructor() {
    this._animated = [];
  }

  mark(animated) {
    this._animated.push(animated);
  }
}

class Animator {
  constructor() {
    this._animations = [];
    this._components = [];
  }

  addComponent(component) {
    this._components.push(component);
  }

  removeComponent(component) {
    let idx = this._components.indexOf(component);
    if (idx != -1) {
      this._components.splice(idx, 1);
    }
  }

  addAnimation(animation) {
    // make sure this is added only once
    this._animations.push(animation);
    if (this._animations.length == 1) {
      this.requestAnimationFrame();
    }
  }

  removeAnimation(animation) {
    //console.log("Remove Animation", this, animation);
    let idx = this._animations.indexOf(animation);
    if (idx != -1) {
      this._animations.splice(idx, 1);
    }
  }

  requestAnimationFrame() {
    this._requestHandle = window.requestAnimationFrame(this.onUpdate.bind(this));
  }

  mark(component) {

  }

  onUpdate() {
    let timestamp = Date.now();

    let frame = new AnimationFrame();
    //console.log("Run animation at ", timestamp, this._animations.length, this._components.length);
    // Run each animation to calculate the updated value
    this._animations.forEach( animation => { animation.updateValue(frame, timestamp) })

    frame._animated.forEach( (animated) => { animated.forceUpdate() });
    // This is where we can re-render the entire virtual DOM tree
    //this._components.forEach(component => { component.forceUpdate() });

    // Request another animation frame if needed
    if (this._animations.length > 0) {
      this.requestAnimationFrame();
    }
  }
}

/* Create the only instance of the Animator */
const AnimatorInstance = new Animator();

export default AnimatorInstance;
