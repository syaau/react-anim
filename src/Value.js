import AnimatorInstance from './Animator';

class Value {

  constructor(initialValue) {
    this._value = initialValue;
    this._attachments = [];
  }

  attach(owner, ref, prop, style) {
    this._attachments.push({
      animated: owner,
      ref: ref,
      prop: prop,
      style: style
    });
  }

  detach(animated) {
    this._attachments = this._attachments.filter( (item) => item.animated == animated);
  }

  set(value) {
    this._value = value;
  }

  update(frame, value) {
    if (this.val != value) {
      this.val = value;
      this._attachments.forEach( (item) => { frame.mark(item, value) } );
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
