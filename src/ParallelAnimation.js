class ParallelAnimation {
  constructor() {
    this._animations = [];
    this._running = 0;
  }

  push(animation) {
    this._animations.push(animation);
  }

  start(callback) {
    this._finishCallback = callback;
    this._running = this._animations.length;
    this._animations.forEach( animation => { animation.start(this._onFinish.bind(this))});
  }
  _onFinish() {
    this._running -= 1;
    if (this._running == 0) {
      this.finish();
    }
  }

  finish() {
    this._animations.forEach( animation => { animation.finish() });
    this._running = 0;
    this._finishCallback && this._finishCallback();
  }

}

export default ParallelAnimation;
