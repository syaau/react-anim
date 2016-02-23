import Value from './Value';

/**
 * An animator is responsible for managing all the animations within
 * the scope of the react.
 */

class AnimationFrame {
  constructor() {
    this._animated = [];
  }

  mark(item, value) {
    let idx = this._animated.indexOf(item.animated);
    if (idx == -1) {
      this._animated.push(item.animated);
    }

    item.animated.updatePropertyValue(item.ref, item.prop, item.style, value);
  }
}

class Animator {
  constructor() {
    this._animations = [];
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

  onUpdate() {
    let timestamp = Date.now();

    let frame = new AnimationFrame();
    let start = Date.now();
    // console.log("Run animation at ", timestamp, this._animations.length, this._components.length);
    // Run each animation to calculate the updated value
    this._animations.forEach( animation => { animation.updateValue(frame, timestamp) })

    //console.log("Number of components to update on frame ", frame._animated.length);

    frame._animated.forEach( (animated) => { this._update(animated) });
    // This is where we can re-render the entire virtual DOM tree
    //this._components.forEach(component => { component.forceUpdate() });
    console.log("Time taken for updating animation", (Date.now() - start));

    // Request another animation frame if needed
    if (this._animations.length > 0) {
      this.requestAnimationFrame();
    }
  }

  _update(component) {
    component.forceUpdate();
  }

}



/* Create the only instance of the Animator */
const AnimatorInstance = new Animator();

export default AnimatorInstance;
