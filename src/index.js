import Value from './Value';
import Animation from './Animation';
import Animated from './Animated';
import SequencedAnimation from './SequencedAnimation';
import ParallelAnimation from './ParallelAnimation';
import DelayedAnimation from './DelayedAnimation';

function timed(value, config) {
  return new Animation(value, config);
}

function sequence() {
  return new SequencedAnimation();
}

function parallel() {
  return new ParallelAnimation();
}

function delayed(delay, animation) {
  return new DelayedAnimation(delay, animation);
}

const ReactAnimation = {
  Value: Value,

  Animation: Animation,

  Animated: Animated,

  timed: timed,

  sequence: sequence,

  parallel: parallel,

  delayed: delayed,
}

export default ReactAnimation;
export { Animated }
