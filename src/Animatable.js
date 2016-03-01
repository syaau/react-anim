import React from 'react';
import Value from './Value';

function makeAnimatable(Component, animation) {
  const Animatable = React.createClass({
    getInitialState() {
      // This is the constructor, convert all the Animation.Value to state
      this._values = [];
      return this._initState(this.props);
    },

    componentWillReceiveProps(nextProps) {
      // New properties received, keep track of the values
      this.setState(this._initState(nextProps));
    },

    _initState(props) {
      let state = {
        animatable: {
          style: { }
        }
      };

      let newValues = [], existingValues = [];
      for(let prop in props) {
        if (prop == 'children') {
          // ignore children
        } else if (prop == 'style') {
          for(let style in props[prop]) {
            this._checkProp(newValues, existingValues, state.animatable.style, props[prop], style);
          }
        } else {
          this._checkProp(newValues, existingValues, state.animatable, props, prop);
        }
      }

      if (this.isMounted) {
        // deregister any older values left
        this._values.forEach( v => { if (v != null) { v.deregister(this) }});
        // register new values added
        newValues.forEach(v => v.register(this));
      }

      // keep the existingValues and the new values
      this._values = existingValues.concat(newValues);

      return state;
    },

    _checkProp(newValues, existingValues, container, source, name) {
      const v = source[name];
      if (v instanceof Value) {
        // got one
        container[name] = v;
        let idx = this._values.indexOf(v);
        if (idx !== -1) {
          // An old value
          this._values[idx] = null;
          existingValues[idx] = v;
        } else {
          // record it as a new value
          newValues.push(v);
        }
      }
    },

    _getAnimState() {
      let res = {};
      for(let prop in this.state.animatable) {
        res[prop] = this.state.animatable[prop].val;
      }
      for(let prop in this.state.animatable.style) {
        if (!res.style) {
          res.style = {}
        }

        res.style[prop] = this.state.animatable.style[prop].val;
      }
      return res;
    },

    componentDidMount() {
      this.isMounted = true;
      // Register all the values for this component
      this._values.forEach( v => v.register(this) );
    },

    componentWillUnmount() {
      this._values.forEach( v => v.deregister(this) );
      this.isMounted = false;
    },

    render() {
      let newProps = this._getAnimState();
      return <Component {...this.props} {...newProps}>{this.props.children}</Component>;
    }

  });

  return Animatable;
}

export { makeAnimatable } ;
