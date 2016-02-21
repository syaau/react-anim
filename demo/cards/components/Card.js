import React from 'react';
import ReactAnimation, { Animated } from 'react-animation';

const CARD_BACK = require('./card_back.png');
const CARD_WIDTH = 50;
const CARD_HEIGHT = 80;

class Card extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      x: new ReactAnimation.Value(props.x),
      y: new ReactAnimation.Value(props.y),
      orientation: new ReactAnimation.Value(props.orientation)
    }
    console.log("State is ", this.state);
  }

  componentWillReceiveProps(props) {
    this.setState({
      x: new ReactAnimation.Value(props.x),
      y: new ReactAnimation.Value(props.y),
      orientation: new ReactAnimation.Value(props.orientation)
    });
  }

  moveTo(x, y, orientation, duration) {
    let {sx, xy, sorientation} = this.state;
    ReactAnimation.timed([sx, sy, sorientation], {
      toValue: [ x, y, orientation ],
      duration: duration
    }).start();
  }

  render() {
    let {x, y, orientation} = this.state;

    return <Animated><image
        xlinkHref={CARD_BACK} x={x} y={y} width={CARD_WIDTH} height={CARD_HEIGHT}
        transform={`rotate(${orientation}, ${x+CARD_WIDTH/2}, ${y+CARD_HEIGHT/2})`} /></Animated>;
  }
}

Card.propTypes = {
  x: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
  y: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
  orientation: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
}

export default Card;
