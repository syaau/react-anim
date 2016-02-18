class DelayedAnimation {
  constructor(delay, animation) {
    this._delay = delay;
    this._animation = animation;
  }

  start(callback) {
    this._finishCallback = callback;
    this._timer = setTimeout(this._delayedStart.bind(this), this._delay);
  }

  _delayedStart() {
    this._animation.start(this._onFinish.bind(this));
  }

  _onFinish() {
    this.finish();
  }

  finish() {
    this._finishCallback && this._finishCallback();
  }
}

export default DelayedAnimation;
