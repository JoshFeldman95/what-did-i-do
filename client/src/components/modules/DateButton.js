import React, { Component } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import "./DateButton.css";

class DateButton extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = { color: "var(--light)" };
  }
  makeDark = () => {
    this.setState({ color: "var(--dark)" });
  };

  makeLight = () => {
    this.setState({ color: "var(--light)" });
  };

  render() {
    if (this.props.direction == "left") {
      return (
        <AiFillCaretLeft
          color={this.state.color}
          onMouseOver={this.makeDark}
          onMouseLeave={this.makeLight}
          size="3em"
          className="CurrentDate-button"
          onClick={this.props.decrementDate}
        />
      );
    } else if (this.props.direction == "right") {
      return (
        <AiFillCaretRight
          color={this.state.color}
          onMouseOver={this.makeDark}
          onMouseLeave={this.makeLight}
          onClick={this.props.incrementDate}
          size="3em"
          className="CurrentDate-button"
        />
      );
    }
  }
}

export default DateButton;
