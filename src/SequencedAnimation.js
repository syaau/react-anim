class SequencedAnimation {
  constructor() {
    this._animations = [];
    this._current = -1;
  }
  
  push(animation) {
    this._animations.push(animation);
  }

  start(callback) {
    this._finishCallback = callback;
    this._continue();
  }

  _continue() {
    this._current += 1;
    if (this._current < this._animations.length) {
      this._animations[this._current].start(this._continue.bind(this));
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
