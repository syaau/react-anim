import React from 'react';
import ReactAnimation, { Animated } from 'react-animation';
import Card, { SUITS } from './Card';

const CARD_COUNT = 21;
const WIDTH = 600;

class Hand extends React.Component {

  constructor(props) {
    super(props);

    let cardPositions = [];
    for(let i=0; i<CARD_COUNT; ++i) {
      cardPositions.push({
        x: new ReactAnimation.Value(this.calcX(WIDTH, CARD_COUNT, i)),
        y: new ReactAnimation.Value(0),
        orientation: new ReactAnimation.Value(0),
        rank: (i%13) + 1,
        suite: SUITS[parseInt(Math.random() * 4)]
      });
    }

    this.state = {
      cardPositions: cardPositions
    }
  }

  calcX(width, count, index) {
    return (width/count) * index;
  }

  _startDrag(index, x, y) {
    let card = this.refs['card' + index];
    this._dragging = {
      index: index,
      card: card,
      offsetX: (card.x - x),
      offsetY: (card.y - y)
    }
    //console.log(this._dragging);
    // Let's animate the rest of the cards
    let anim = ReactAnimation.parallel();
    let idx = 0;
    for(let i=0; i<CARD_COUNT; ++i) {
      if (this._dragging.index == i) {
        continue;
      } else {
        let cardPos = this.state.cardPositions[i];
        //let tmpCard = this.refs.
        anim.push(ReactAnimation.timed([cardPos.x, cardPos.y], {
          toValue: [ this.calcX(WIDTH, CARD_COUNT-1, idx), 0 ],
          duration: 150,
        }))
        idx += 1;
      }
    }
    anim.start();
  }

  _continueDrag(x, y) {
    if (this._dragging) {
      let newX = this._dragging.offsetX + x;
      let newY = this._dragging.offsetY + y;
      this._dragging.card.moveTo(
        newX, newY
      );

      // find the position within which the new card should be placed
      let newPosition = this._dragging.index;
      for(let i=1; i<=CARD_COUNT; ++i) {
        if (i == CARD_COUNT) {
          newPosition = i-1;
          break;
        }

        if (i == this._dragging.index) {
          continue;
        }
        let card = this.refs['card' + i];
        if (newX < card.x) {
          newPosition = i-1;
          break;
        }
      }

      // We have found a new position
      if (newPosition != this._dragging.index) {
        // swap the positions
        console.log("new Position is ", newPosition);
      }
    }
  }

  _stopDrag() {
    this._dragging = null;
  }

  _renderCard(cardPos, index) {
    return <Card key={index} ref={"card" + index} rank={cardPos.rank} suite={cardPos.suite}
          x={cardPos.x} y={cardPos.y} orientation={cardPos.orientation}
          onMouseDown={(e) => this._startDrag(index, e.clientX, e.clientY)}
          onTouchStart={(e) => {e.preventDefault(); this._startDrag(index, e.touches[0].clientX, e.touches[0].clientY)}}
          onTouchMove={(e) => {e.preventDefault(); this._continueDrag(e.touches[0].clientX, e.touches[0].clientY)}}
          onTouchEnd={(e) => this._stopDrag()}
          />;
  }

  render() {
    let cards = this.state.cardPositions;
    return (
      <Animated element="svg" width="800" height="600"
          onMouseMove={(e) => this._continueDrag(e.clientX, e.clientY)}
          onMouseUp={(e) => this._stopDrag.bind()}>
        {cards.map(this._renderCard.bind(this))}
      </Animated>
    )
  }
}

export default Hand;
