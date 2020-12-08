import React, { Component } from "react";
import CurrentDate from "./CurrentDate.js";
import Prompt from "./Prompt.js";
import Responses from "./Responses.js";
import "./WhatDidIDo.css";

class WhatDidIDo extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  setNewDate = (newDate) => {
    this.setState({ date: newDate });
  };

  incrementDate = () => {
    const today = this.state.date;
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow <= new Date()) {
      this.setState({ date: tomorrow });
    }
  };

  decrementDate = () => {
    const today = this.state.date;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    this.setState({ date: yesterday });
  };

  render() {
    return (
      <div className="WhatDidIDo-container">
        {this.props.userId ? (
          <>
            <CurrentDate
              date={this.state.date}
              setNewDate={this.setNewDate}
              incrementDate={this.incrementDate}
              decrementDate={this.decrementDate}
            />
            <div className="WhatDidIDo-prompt">What did you do today?</div>
            <Responses date={this.state.date} userId={this.props.userId} />
          </>
        ) : (
          <div className="WhatDidIDo-prompt">Please log in.</div>
        )}
      </div>
    );
  }
}

export default WhatDidIDo;
