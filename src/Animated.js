import React from 'react';
import AnimatorInstance from './Animator';
import Value from './Value';

class Animated extends React.Component {
  constructor(props) {
    super(props);

    /* Keep track of all the children properties that have `Animated.Value` as Value */
    this._dynamicChildProps = {};

    /* List of values which affect this Animated object */
    this._dependentValues = [];

    /* Traverse all the children to find out the props and styles that are
       dependent on the `Animated.Value` */
    this._traverseChildren(props.children);
  }

  componentWillReceiveProps(nextProps) {
    /* The structure of the component may change so update the `Animated.Value` again */
    this._traverseChildren(nextProps.children);
  }

  /* Method invoked from Animator when Animated Value changes */
  updatePropertyValue(key, prop, style, value) {
    // if this the first time some changes are requested on the child component
    if (!this._dynamicChildProps.hasOwnProperty([key])) {
      this._dynamicChildProps[key] = {};
    }

    // if this is a style part, we have one more level of object
    if (style) {
      if (!this._dynamicChildProps[key].hasOwnProperty(prop)) {
        this._dynamicChildProps[key][prop] = {};
      }
      this._dynamicChildProps[key][prop][style] = value;
    } else {
      this._dynamicChildProps[key][prop] = value;
    }
  }

  /* Keep track of the `Animated.Value` that this component is listening */
  _collectValue(value) {
    let idx = this._dependentValues.indexOf(value);
    if (idx == -1) {
      this._dependentValues.push(value);
    }
  }

  /**
   * Method that traverses through all the children of this component to find out
   * property and style that are dependent on `Animated.Value` and
   * updates the `Animated.Value` with the component properties that needs
   * to be updated during animation */
  _traverseChildren(children) {
    // Detach all the existing values;
    this._dependentValues.forEach( value => { value.detach(this); } );

    // Get the list of the children that needs to be removed
    this._iterateChildren(children, 0, '');
  }

  /* Helper method to recursively go through all the children */
  _iterateChildren(children, level, prefix) {
    React.Children.forEach(children, (child, index) => {
      // A somewhat React id type id, but doesn't require a key since this is only
      // applicable within one structural object.
      let id = prefix + "." + index;

      let props = child.props;
      for(let prop in props) {
        if (prop == 'children') {
          // recursively iterate through all the children
          this._iterateChildren(props[prop], level+1, id);
        } else if (prop == 'style') {
          // Go through all the styles provided
          for(let style in props[prop]) {
            let value = props[prop][style];
            if (value instanceof Value) {
              value.attach(this, id, prop, style);
              this._collectValue(value);
            }
          }
        } else {
          let value = props[prop];
          if (value instanceof Value) {
            value.attach(this, id, prop);
            this._collectValue(value);
          }
        }
      }
    });
  }

  _cloneChildren(children, level, prefix) {
    return React.Children.map(children, (child, index) => {
      let id = prefix + "." + index;
      let props = child.props;
      let nestedChildren = null;
      if (props.children) {
        nestedChildren = this._cloneChildren(props.children, level+1, id);
      }

      return React.cloneElement(child, this._dynamicChildProps[id], nestedChildren);
    });
  }

  render() {
    let { element, children, ...other } = this.props;

    // Render the children utilizing the props that have changed due to Animation */
    let res = React.createElement(element, other, this._cloneChildren(children, 0, ''));

    // Clear for next round
    this._dynamicChildProps = {};

    return res;
  }
}

Animated.propTypes = {
  element: React.PropTypes.any
};

Animated.defaultProps = {
  element: 'div'
};

export default Animated;
