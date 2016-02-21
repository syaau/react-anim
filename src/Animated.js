import React from 'react';
import AnimatorInstance from './Animator';
import Value from './Value';

class Animated extends React.Component {

  _cloneElement(element) {
    let props = element.props;
    let valueProps = {};
    let children = [];

    for(let prop in props) {
      if (prop == 'children') {
        let oldChildren = props[prop];
        oldChildren.forEach( (child) => {
          //TODO it might be efficient to handle a special case where the child is an instance of an Animated component
          children.push(this._cloneElement(child))
        });
      } else if (prop == 'style') {
        // style consists of an object
        let newStyle = {};
        let isDyanmic = false;
        for(let styleProp in props[prop]) {
          let value = props[prop][styleProp];
          if (value instanceof Value) {
            value.attach(this);
            newStyle[styleProp] = value.val;
            isDyanmic = true;
          }
        }

        if (isDyanmic) {
          // The style properties are also merged (React.cloneElement), so we
          // are only putting the dynamic styles in the property list
          valueProps[prop] = newStyle;
        }
      } else {
        let value = props[prop];
        if (value instanceof Value) {
          value.attach(this);
          valueProps[prop] = value.val;
        }
      }
    }

    return React.cloneElement(element, valueProps, children);
  }


  render() {
    // Clone the child element to convert all the Value instances to
    // element properties/style. This is recursive and works through all the
    // children contained within as well
    return this._cloneElement(React.Children.only(this.props.children));
  }
}

Animated.propTypes = {
  element: React.PropTypes.object
};

export default Animated;
