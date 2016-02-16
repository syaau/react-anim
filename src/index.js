import Value from './Value';
import Animation from './Animation';
import Animated from './Animated';

function timed(value, config) {
  return new Animation(value, config);
}

const ReactAnimation = {
  Value: Value,

  Animation: Animation,

  Animated: Animated,

  timed: timed
}

export default ReactAnimation;
export { Animated }
