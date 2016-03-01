import AnimatorInstance from './Animator';

class Value {

  constructor(initialValue) {
    this._value = initialValue;
    this._components = [];
  }

  _getComponents() {
    return this._components;
  }

  register(component) {
    if (this._components.indexOf(component) == -1) {
      this._components.push(component);
    }
  }

  deregister(component) {
    let idx = this._components.indexOf(component);
    if (idx !== -1) {
      this._components.splice(idx, 1);
    }
  }

  set(value) {
    this._value = value;
  }

  update(value) {
    if (this.val != value) {
      this.val = value;
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
