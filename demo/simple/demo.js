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
