import React from 'react';
import { Router, Route, Link } from 'react-router';
import { Animated } from 'react-animation';

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="">Home</Link>
        <Link to="page1">Page 1</Link>
        <Animated>
          <div>
            {this.props.children}
          </div>
        </Animated>
      </div>
    );
  }
}
