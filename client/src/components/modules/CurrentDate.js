import React, { Component } from "react";
import DateButton from "./DateButton.js";
import "./CurrentDate.css";

class CurrentDate extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {};
  }

  dateToString = (today) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = String(today.getDate());
    const month = months[today.getMonth()];
    const year = String(today.getFullYear());
    return `${month} ${day}, ${year}`;
  };

  clicked = () => {
    console.log("clicked");
  };

  render() {
    return (
      <div className="u-flex u-flex-alignCenter">
        <DateButton
          direction="left"
          incrementDate={this.props.incrementDate}
          decrementDate={this.props.decrementDate}
        />
        <div className="CurrentDate">{this.dateToString(this.props.date)}</div>
        <DateButton
          direction="right"
          incrementDate={this.props.incrementDate}
          decrementDate={this.props.decrementDate}
        />
      </div>
    );
  }
}

export default CurrentDate;
