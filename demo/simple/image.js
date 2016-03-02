import React from 'react';
import ReactAnimation, {makeAnimatable} from 'react-animation';

const AnimatableImage = makeAnimatable(function(props) {
  const {x, y, href, ...other} = props;
  return <img src={href} {...other} style={{position: 'absolute', left:x-50, top: y-50}}/>
});

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new ReactAnimation.Value(props.x),
      y: new ReactAnimation.Value(props.y)
    }
    this._anim = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.x != this.props.x || nextProps.y != this.props.y) {
      // Stop any previously running animation
      this._anim && this._anim.finish();

      // Create a new animation
      this._anim = ReactAnimation.timed([this.state.x, this.state.y], {
        toValue: [nextProps.x, nextProps.y],
        duration: 100
      });

      // Run the Animation
      this._anim.start();
    }
  }

  render() {
    const { x, y } = this.state;
    return(
      <AnimatableImage {...this.props} x={x} y={y} />
    )
  }
}

export default Image;
