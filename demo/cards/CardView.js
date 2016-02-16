import React from 'react';

const CARD_BACK = require('./card_back.png');
const CARD_WIDTH = 50;
const CARD_HEIGHT = 80;

class CardView extends React.Component {

  constructor(id) {
    this._id = id;
  }

  render() {
    let {x, y, orientation} = this.props;

    return <image
        xlinkHref={CARD_BACK} x={x} y={y} width={CARD_WIDTH} height={CARD_HEIGHT}
        transform={`rotate(${orientation}, ${x+CARD_WIDTH/2}, ${y+CARD_HEIGHT/2})`} />;
  }
}

Card.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  orientation: React.PropTypes.number.isRequired
}

export default CardView;
