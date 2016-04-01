import Value from './Value';

/**
 * An animator is responsible for managing all the animations within
 * the scope of the react.
 */

class AnimationFrame {
  constructor() {
    this._values = [];
    this._animatables = [];
  }

  add(value) {
    value._getComponents().forEach( component => {
      if (this._animatables.indexOf(component) == -1) {
        this._animatables.push(component);
      }
    })
  }
}

class Animator {
  constructor() {
    this._animations = [];
  }


  addAnimation(animation) {
    //console.log("Add animation ", animation);
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

  register(value, animatable) {
    value._add(animatable);
  }

  deregister(value, animatable) {
    value._remove(animatable);
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
    // Make a copy of the animations as, the animation is removed from the updateValue call
    let animations = this._animations.slice();
    animations.forEach( animation => { animation.updateValue(frame, timestamp) })

    //console.log("Number of components to update on frame ", frame._animated.length);

    frame._animatables.forEach( (animatable) => { animatable.forceUpdate() });
    // This is where we can re-render the entire virtual DOM tree
    //this._components.forEach(component => { component.forceUpdate() });
    //console.log("Time taken for updating animation", (Date.now() - start));

    // Request another animation frame if needed
    if (this._animations.length > 0) {
      this.requestAnimationFrame();
    }
  }

}



/* Create the only instance of the Animator */
const AnimatorInstance = new Animator();

export default AnimatorInstance;
