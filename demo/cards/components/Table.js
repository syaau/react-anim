import React from 'react';
import ReactAnimation, { Animated } from 'react-animation';
import Card from './Card';

console.log("Animated instance is ", Animated);

class Table extends React.Component {
  constructor(props) {
    super(props);

    let cards = [];
    for(let i=0; i<52; ++i) {
      cards.push({
        xyr: new ReactAnimation.Value([0, 0, 0]),
      });
    }

    this._players = [
      { x: 200, y: 0 }, { x: 180, y: 100 }, { x: 100, y: 180 }, { x: 0, y: 200 }
    ];

    this.state = {
      cards: cards
    }
  }

  componentDidMount() {
    let { cards } = this.state;
    // This is where the animation needs to start
    // ReactAnimation.timed(
    //   cards[0].x, { toValue: this._players[0].x }
    // ).start();
    // return;
    let anim = ReactAnimation.parallel();

    let delay = 0;
    for(let i=0; i<52; ++i) {

      let player = this._players[i % this._players.length];

      anim.push(ReactAnimation.delayed(delay, ReactAnimation.timed(
        cards[i].xyr, { toValue: [player.x, player.y, Math.random() * 3000], delay: 100 }
      )));
      delay += 50;
    }

    anim.start();
  }

  _renderCard(card, index) {
    //console.log("RenderCard ", card);
    //console.log("Render Card", index, card.xyr.val);
    return <Card key={index} x={card.xyr.val[0]} y={card.xyr.val[1]} orientation={card.xyr.val[2]%360} />;
  }

  _refresh() {
    this.setState({
      cards: this.state.cards
    });
  }

  render() {
    let cards = this.state.cards;
    return (
      <Animated onUpdate={this._refresh.bind(this)}>
        <svg width="400px" height="400px">
          {cards.map(this._renderCard.bind(this))}
        </svg>
      </Animated>
    );
  }
}

export default Table;
