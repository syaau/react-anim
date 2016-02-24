import React from 'react';
import { Layer, Group, Text, Image, FontFace } from 'react-canvas';

class Card extends React.Component {
  render() {
    let {x, y} = this.props;
    let width = 50;
    let height = 80;
    return (
      <Group style={ this.getContainerStyle() }>
        <Text style={this.getTextStyle()}>A Card</Text>
      </Group>
    )
  }
  getContainerStyle() {
    return {
      position: 'absolute',
      left: this.props.x,
      top: this.props.y,
      width: 50,
      height: 80,
      borderRadius: 15,
      borderColor: 'green',
      borderWidth: 3,
      backgroundColor: 'red',
      flexDirection: 'column',
      border: 1,
    };
  }

  getTextStyle() {
    return {
      fontFace: FontFace('Georgia'),
      fontSize: 10,
      lineHeight: 28,
      height: 28,
      marginBottom: 10,
      color: '#333',
      textAlign: 'center'
    };
  }
}

export default Card;
