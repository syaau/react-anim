import Animation from './Animation';

class TimedAnimation extends Animation {
  calcValue(startValue, finalValue, interval, duration) {
    return startValue + interval * (finalValue - startValue)/duration;
  }
}

export default TimedAnimation;
