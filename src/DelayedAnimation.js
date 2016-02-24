class DelayedAnimation {
  constructor(delay, animation) {
    this._delay = delay;
    this._animation = animation;
  }

  start(timestamp, callback) {
    this._finishCallback = callback;
    this._timer = setTimeout(this._delayedStart.bind(this), this._delay);
  }

  _delayedStart() {
    this._animation.start(Date.now(), this._onFinish.bind(this));
  }

  _onFinish() {
    this.finish();
  }

  finish() {
    this._finishCallback && this._finishCallback();
  }
}

export default DelayedAnimation;
