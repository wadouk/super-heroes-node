import {default as React, Component} from 'react';

class Route extends Component {
  static defaultprops = {
    path: /^$/,
    currentPath: ""
  };

  constructor(props) {
    super(props)
  }

  render() {
    return this.props.children;
  }
}

class Router extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>{this.props.children}</div>);
  }
}

export {Router, Route}