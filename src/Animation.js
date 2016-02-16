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
    this._value.update(
      this._toValue.map( (finalValue, index) => {
        this._algorithm(this._startValue, this._toValue, interval, this._duration)
      })
    );

    if (interval >= this._duration) {
      finish();
    }
  }

  calcValue(startValue, toValue, interval, duration) {
    console.error("Override this method to update the animated value");
  }
}

export default Animation;
