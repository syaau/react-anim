import React from 'react';
import ReactAnimation, { makeAnimatable} from 'react-animation';

export const SUITS = [
  'spade', 'diamond', 'club', 'heart'
];
// {
//    'spade': '}',
//    'diamond': '[',
//    'club': ']',
//    'heart': '{'
// }

export const RANKS = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '=',
  11: 'J',
  12: 'Q',
  13: 'K',
}

const CARDS = { };

for(let i=1; i<=13; ++i) {
  for(let s of SUITS ) {
    let name = i + '_' + s;
    CARDS[ name ] = require('../img/' + name + '.png');
  }
}


const CARD_BACK = require('./card_back.png');
const CARD_WIDTH = 50;
const CARD_HEIGHT = 80;

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y
    }
    // this.state = {
    //   x: new ReactAnimation.Value(props.x),
    //   y: new ReactAnimation.Value(props.y),
    //   orientation: new ReactAnimation.Value(props.orientation)
    // }
    //console.log("State is ", this.state);
  }

  componentWillReceiveProps(props) {
    this.setState({
      x: props.x,
      y: props.y
    });
  }

  moveTo(x, y) {
    this.props.x.val = x;
    this.props.y.val = y;

    this.setState({
      x: x,
      y: y
    })
  }

  get x() {
    return this.state.x;
  }

  get y() {
    return this.state.y;
  }

  render() {
    let {x, y, rank, suite, orientation, ...other} = this.props;
    // x = this.state.x;
    // y = this.state.y;
    let file = rank + "_" + suite;
    //console.log("Rendering " + file + " at " + x + "," + y);
    return <image
        xlinkHref={CARDS[file]} x={x} y={y} width={CARD_WIDTH} height={CARD_HEIGHT}
        transform={`rotate(${orientation}, ${x+CARD_WIDTH/2}, ${y+CARD_HEIGHT/2})`} {...other} />;
  }
}

Card.propTypes = {
  //x: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
//  y: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
//  orientation: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.instanceOf(ReactAnimation.Value)]).isRequired,
}

export default makeAnimatable(Card);
