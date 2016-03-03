### React Animation
A simple component specific animation library for react.

### Concept
* Make the component `Animatable`. Wrap around your existing component.
* Create component with properties/style with `ReactAnimation.Value` instance
* Create `Animation` object on `ReactAnimation.Value` with configurations -
  final value and duration.
* Start the `Animation`

### Example

1. First create an animatable component

`image.js`

```javascript
import React from 'react';
import ReactAnimation, {makeAnimatable} from 'react-animation';

/* Make a normal React Component Animatable */
const AnimatableImage = makeAnimatable(function(props) {
  const {x, y, href, ...other} = props;
  return <img src={href} {...other} style={{position: 'absolute', left:x-50, top: y-50}}/>
});

/* Use the animatable component with ReactAnimation.Value(s) */
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


```
2. The Application

`demo.js`

```javascript
/*
 * A simple demo that draws the image on the page and whenever the
 * moves, the logo moves with a timed Animation
 */
import React from 'react';
import { render, findDOMNode } from 'react-dom';
import Image from './image';

const logo = require("./logo.png");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imgX: 0,
      imgY: 0
    }
  }

  componentDidMount() {
    const node = findDOMNode(this);
    this.setState({
      imgX: node.clientWidth/2,
      imgY: node.clientHeight/2
    });
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }}
            onMouseMove={ this.relocate.bind(this) }>
        <Image x={this.state.imgX} y={this.state.imgY} width="100px" href={logo} />
      </div>
    );
  }

  relocate(evt) {
    console.log("Relocate to ", evt.clientX, evt.clientY);
    this.setState({
      imgX: evt.clientX,
      imgY: evt.clientY
    });
  }

}

render(<App />, document.getElementById("stage"));
```

### TODO
Checkout https://github.com/chenglou/react-motion/blob/master/src/stepper.js to
implement Spring Animation for more realistic animations.
