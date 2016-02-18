import React from 'react';
import AnimatorInstance from './Animator';

class Animated extends React.Component {
  componentDidMount() {
    AnimatorInstance.addComponent(this);
  }

  componentWillUnmount() {
    AnimatorInstance.removeComponent(this);
  }

  update() {
    this.props.onUpdate && this.props.onUpdate();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default Animated;
