import AnimationInstance from './Animator';

class Animation {
  constructor(value, config) {
    this._value = value;
    this._toValue = config.toValue;
    this._duration = config.duration || 300;
  }

  start(finishCallback) {
    this._start = Date.now();
    this._startValue = this._value.val;
    this._finishCallback = finishCallback;

    AnimatorInstance.addAnimation(this);
  }

  finish() {
    AnimatorInstance.removeAnimation(this);
    this._finishCallback && this._finishCallback();
  }

  updateValue(timestamp) {
    let interval = timestamp - this._start;
    this._value.update(
      this.calcValue(this._startValue, this._toValue, interval, this._duration)
    );

    if (interval >= this._duration) {
      finish();
    }
  }

  calcValue(startValue, toValue, interval, duration) {
    console.error("Override this method to update the animated value");
  }
}
