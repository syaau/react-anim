import AnimatorInstance from './Animator';

class Value {

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

export default Value;
