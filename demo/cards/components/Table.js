import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);

    let cards = [];
    for(let i=0; i<52; ++i) {
      cards.push({
        x: new ReactAnimation.Value(0),
        y: new ReactAnimation.Value(0),
        orientation: new ReactAnimation.Value(0)
      });
    }

    this._players = [
      { x: 200, y: 50 }, { x: 180, y: 100 }, { x: 150, y: 150 }, { x: 100, y: 180 }, { x: 50, y: 200 }
    ];

    this.state = {
      cards: cards
    }
  }

  componentDidMount() {
    // This is where the animation needs to start
    let anim = ReactAnimation.sequence();

    for(let i=0; i<50; ++i) {

      let player = i % this._players.length;

      anim.push(new ReactAnimation.timed(
        cards[i].x, { toValue: player.x }
      ));

      anim.push(new ReactAnimation.timed(
        cards[i].y, { toValue: player.y }
      ));

      anim.push(new ReactAnimation.timed(
        cards[i].orientation, { toValue: Math.random() * 3000 }
      ));
    }

    anim.start();
  }

  _renderCard(card, index) {
    return <Card key={index} x={card.x} y={card.y} orientation={card.orientation} />;
  }

  render() {
    cards = this.state.cards;
    return (
      <svg width="100%" height="100%">
        {cards.map(this._renderCard.bind(this))}
      </svg>
    );
  }
}

export default Table;
