import AnimatorInstance from './Animator';

class AnimatedValue {

  constructor(initialValue) {
    this._value = initialValue;
  }

  update(value) {
    this._value = value;
  }

  get val() {
    return this._value;
  }

  toString() {
    return this._value;
  }
}

class AnimatedValueXY {
  constructor(initialValue) {
    this._value = initialValue;
  }

  update(value) {
    this._value = value;
  }
}

export default AnimatedValue;
