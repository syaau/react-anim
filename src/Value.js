import AnimatorInstance from './Animator';

class Value {

  constructor(initialValue) {
    this._value = initialValue;
    this._attachedTo = null;
  }

  attach(animated) {
    this._attachedTo = animated;
  }

  set(value) {
    this._value = value;
  }

  update(frame, value) {
    if (this.val != value) {
      this.val = value;
      frame.mark(this._attachedTo);
    }
  }

  set val(value) {
    if (this._value instanceof Value) {
      this._value.val = value;
    } else {
      this._value = value;
    }
  }

  get val() {
    if (this._value instanceof Value) {
      return this._value.val;
    } else {
      return this._value;
    }
  }


  toString() {
    return this._value;
  }
}

export default Value;
