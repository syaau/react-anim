import AnimatorInstance from './Animator';

const DEFAULT_ALGORITHM = function(start, final, interval, duration) {
  return start + interval * (final - start) / duration;
}

class Animation {
  constructor(value, config, algorithm) {
    this._value = value;
    this._algorithm = algorithm || DEFAULT_ALGORITHM;
    this._toValue = config.toValue;
    this._duration = config.duration || 300;
  }

  start(finishCallback) {
    this._start = Date.now();
    this._startValue = this._value.constructor === Array ? this._value.map(v => v.val) : this._value.val;
    this._finishCallback = finishCallback;

    AnimatorInstance.addAnimation(this);
  }

  finish() {
    AnimatorInstance.removeAnimation(this);
    this._finishCallback && this._finishCallback();
  }

  updateValue(frame, timestamp) {
    let interval = timestamp - this._start;
    //console.log(interval, this._duration);

    if (interval >= this._duration) {
      if (this._value.constructor === Array) {
        this._value.forEach( (value, index) => value.update(frame, this._toValue[index]))
      } else {
        this._value.update(frame, this._toValue);
      }
      this.finish();
    } else {
      if (this._toValue.constructor === Array) {
        this._value.forEach( (value, index) => {
          value.update(frame, this._algorithm(this._startValue[index], this._toValue[index], interval, this._duration))
        })
      } else {
        this._value.update(frame,
          this._algorithm(this._startValue, this._toValue, interval, this._duration)
        );
      }
    }
  }

}

export default Animation;
