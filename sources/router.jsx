import {default as React, Component} from 'react';

class Route extends Component {
  static defaultprops = {
    path: Route.getDefaultPath(),
    currentPath: ""
  };

  static getDefaultPath() {
    return /^$/;
  }

  constructor(props) {
    super(props)
  }

  getPath() {
    return this.props.path || Route.getDefaultPath();
  }

  match() {
    return this.getPath().test(this.props.currentPath);
  }

  getArgs() {
    return this.getPath().exec(this.props.currentPath);
  }

  renderChild() {
    return React.createElement(this.props.children.type, {args: this.getArgs()});
  }

  render() {
    return this.match() ? this.renderChild() : null;
  }
}

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = Router.computeState(window.location.hash);
    history.replaceState(null, "", window.location.hash);
    window.addEventListener("popstate", this.onPopState.bind(this))
  }

  onPopState() {
    this.setState(Router.computeState(window.location.hash));
  }

  static afterSetState() {
    history.pushState(null, "", window.location.hash);
  }

  static getCurrentPath(pathMatch) {
    var extractPath = /##(.*)/;
    if (extractPath.test(pathMatch)) {
      return extractPath.exec(pathMatch)[1]
    }
    return "";
  }

  static computeState(hash) {
    return {
      currentPath: Router.getCurrentPath(hash)
    };
  }

  onClick(e) {
    if (e.target.nodeName === "A") {
      this.setState(Router.computeState(e.target.hash), Router.afterSetState);
      e.preventDefault();
    }
  }

  renderChild(child) {
    return React.createElement(child.type, {
      currentPath: this.state.currentPath,
      children: child.props.children,
      path: child.props.path
    })
  }

  renderChildren() {
    return React.Children.map(this.props.children, this.renderChild.bind(this))
  }

  render() {
    return (<div onClick={this.onClick.bind(this)}>{this.renderChildren()}</div>);
  }
}

export {Router, Route}