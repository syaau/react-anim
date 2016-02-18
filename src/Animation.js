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
    //console.log(interval, this._duration);

    if (interval >= this._duration) {
      this._value.update(this._toValue);
      this.finish();
    } else {
      if (this._toValue.constructor === Array) {
        this._value.update(
          this._toValue.map( (finalValue, index) =>
            this._algorithm(this._startValue[index], finalValue, interval, this._duration)
          )
        );
      } else {
        this._value.update(
          this._algorithm(this._startValue, this._toValue, interval, this._duration)
        );
      }
    }
  }

}

export default Animation;
