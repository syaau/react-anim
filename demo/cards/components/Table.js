import React from 'react';
import ReactAnimation, { Animated } from 'react-animation';
import Card from './Card';

console.log("Animated instance is ", Animated);

class Table extends React.Component {

  constructor(props) {
    super(props);

    let cards = [];
    for(let i=0; i<22; ++i) {
      cards.push({
        x: new ReactAnimation.Value(200),
        y: new ReactAnimation.Value(200),
        orientation: new ReactAnimation.Value(0)
      });
    }

    this._players = [
      { x: 50, y: 50 }, { x: 350, y: 50 }, { x: 350, y: 350 }, { x: 50, y: 350 }
    ];

    this.state = {
      cards: cards
    }
  }

  componentDidMount() {
    let { cards } = this.state;
    let anim = ReactAnimation.parallel();

    let delay = 0;
    let c = 0;
    for(let i=0; i<22; ++i) {

      let player = this._players[i % this._players.length];

      anim.push(ReactAnimation.delayed(delay, ReactAnimation.timed(
        [cards[i].x, cards[i].y, cards[i].orientation] , { toValue: [player.x+c, player.y+c, 180], duration: 500 }
      )));
      delay += 250;
      c += 0.05;
    }

    anim.start();
  }

  _renderCard(card, index) {
    //console.log("RenderCard ", card);
    //console.log("Render Card", index, card.xyr.val);
    console.log("Card is ", card);
    return <Card key={index} x={card.x} y={card.y} orientation={card.orientation} />;
  }

  render() {
    let cards = this.state.cards;
    return (
      <Animated>
        <svg width="500px" height="500px">
          {cards.map(this._renderCard.bind(this))}
        </svg>
      </Animated>
    );
  }
}

export default Table;
