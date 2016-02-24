class SequencedAnimation {
  constructor() {
    this._animations = [];
    this._current = -1;
  }

  push(animation) {
    this._animations.push(animation);
  }

  start(timestamp, callback) {
    this._finishCallback = callback;
    this._continue(timestamp);
  }

  _continue(timestamp) {
    timestamp = timestamp || Date.now();
    this._current += 1;
    if (this._current < this._animations.length) {
      this._animations[this._current].start(timestamp, this._continue.bind(this));
    } else {
      this._current = -1;
      this.finish();
    }
  }

  finish() {
    if (this._current != -1) {
      this._animations[this._current].finish();
      this._current = -1;
    }
    this._finishCallback && this._finishCallback();
  }
}

export default SequencedAnimation;
