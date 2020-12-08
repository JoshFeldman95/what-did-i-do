import React, { Component } from "react";
import "./Prompt.css";

class Prompt extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="Prompt">What did you do today?</div>;
  }
}

export default Prompt;
