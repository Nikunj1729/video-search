import React, { Component } from "react";
import debounce from "lodash/debounce";

export default (ComposedComponent) =>
  class extends Component {
    constructor() {
      super();
      this.state = {
        width: window.innerWidth || 0,
        height: window.innerHeight || 0,
      };
    }

    componentDidMount() {
      // bind window resize listeners
      this._handleResize = debounce(this.handleResize, 200);
      this._handleResize();
      window.addEventListener("resize", this._handleResize);
    }

    componentWillUnmount() {
      // clean up listeners
      window.removeEventListener("resize", this._handleResize);
    }

    handleResize = () => {
      // set initial state
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    render() {
      // pass window dimensions as props to wrapped component
      return (
        <ComposedComponent
          ref="component"
          {...this.props}
          windowWidth={this.state.width}
          windowHeight={this.state.height}
        />
      );
    }
  };
