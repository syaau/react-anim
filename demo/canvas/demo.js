"use strict";

import React from 'react';
import { render } from 'react-dom';
import { Surface, Layer, Group } from 'react-canvas';
import Card from './Card';
import ReactAnimation, { Animated } from 'react-animation';

class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    let cards = [];
    for(let i=0; i<52; ++i) {
      cards.push({
        x: new ReactAnimation.Value(200),
        y: new ReactAnimation.Value(200)
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
    for(let i=0; i<52; ++i) {

      let player = this._players[i % this._players.length];

      anim.push(ReactAnimation.delayed(delay, ReactAnimation.timed(
        [cards[i].x, cards[i].y] , { toValue: [player.x+c, player.y+c], duration: 500 }
      )));
      delay += 20;
      c += 0.05;
    }

    anim.start();
  }

  _renderCard(card, index) {
    return <Card key={index} x={card.x} y={card.y} />;
  }

  render() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cards = this.state.cards;

    return (

      <Surface width={width} height={height} left={0} top={0} enableCSSLayout={true}>
        <Animated>
          <Group style={ {} }>
          { cards.map(this._renderCard.bind(this)) }
          </Group>
        </Animated>
      </Surface>

    );
  }
}

render(<DemoComponent />, document.getElementById("stage"));
