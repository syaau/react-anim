import Value from './Value';
import Animation from './Animation';
import SequencedAnimation from './SequencedAnimation';
import ParallelAnimation from './ParallelAnimation';
import DelayedAnimation from './DelayedAnimation';
import { makeAnimatable } from './Animatable';

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
  Value, Animation, timed, sequence, parallel, delayed, makeAnimatable
}

export default ReactAnimation;
export { makeAnimatable };
