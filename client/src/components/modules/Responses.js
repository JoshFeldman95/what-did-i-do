import React, { Component } from "react";
import Response from "./Response.js";
import "./Responses.css";
import { get, post, delete_req } from "../../utilities.js";

const RESPONSE_TYPES = {
  mainResponse: "mainResponse",
  commentary: "commentary",
};

class Responses extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = { responseIDs: [], focusedID: 0 };
  }

  getResponseTypeOfID = (ID) => {
    const index = this.state.responseIDs.indexOf(ID);
    if (index % 2 == 0) {
      return RESPONSE_TYPES.mainResponse;
    } else {
      return RESPONSE_TYPES.commentary;
    }
  };

  appendResponse = () => {
    const body = { date: this.props.date, userId: this.props.userId };
    post("/api/responses", body).then((res) => {
      const newID = res.responseID;
      this.setState((state) => {
        return {
          responseIDs: [...state.responseIDs, newID],
        };
      });
    });
  };

  deleteFullResponse = (mainResponseID) => {
    const mainResponseIndex = this.state.responseIDs.indexOf(mainResponseID);
    const commentaryIndex = mainResponseIndex + 1;
    const commentaryID = this.state.responseIDs[commentaryIndex];
    const body = { responseIDs: [mainResponseID, commentaryID] };
    delete_req("/api/responses", body).then((res) => {
      this.setState((state) => {
        return {
          responseIDs: state.responseIDs.filter((el, i) => {
            return i !== mainResponseIndex && i !== commentaryIndex;
          }),
        };
      });
    });
  };

  responseIsFilled = (ID) => {
    // if the last response is filled, add another
    const isMainResponse = this.getResponseTypeOfID(ID) == RESPONSE_TYPES.mainResponse;
    const isLast = this.state.responseIDs.indexOf(ID) == this.state.responseIDs.length - 1;
    if (isMainResponse & isLast) {
      this.appendResponse(); // add new commentary
      this.appendResponse(); // add new main responses
    }
  };

  responseIsEmpty = (ID) => {
    // if the response is not last, remove it
    const isMainResponse = this.getResponseTypeOfID(ID) == RESPONSE_TYPES.mainResponse;
    const isLast = this.state.responseIDs.indexOf(ID) == this.state.responseIDs.length - 1;
    if (isMainResponse & !isLast) {
      this.deleteFullResponse(ID);
    }
  };

  getResponses = () => {
    const body = { date: this.props.date, userId: this.props.userId };
    console.log(body);
    get("/api/responses", body).then((res) => {
      console.log(res.responseIDs);
      if (res.responseIDs.length == 0) {
        this.appendResponse();
      } else {
        this.setState({
          responseIDs: res.responseIDs,
        });
      }
    });
  };

  componentDidMount = () => {
    this.getResponses();
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.date != this.props.date) {
      this.setState({ responseIDs: [] });
      this.getResponses();
    }
  };

  assignFocus = (id) => {
    const focusedIdx = this.state.responseIDs.indexOf(id);
    this.setState({ focusedID: focusedIdx });
  };

  moveFocusUp = (id) => {
    const focusedIdx = this.state.responseIDs.indexOf(id);
    if (focusedIdx === this.state.focusedID) {
      const newFocusID = focusedIdx - 1;
      if ((newFocusID >= 0) & (newFocusID < this.state.responseIDs.length)) {
        this.setState({ focusedID: newFocusID });
      }
    }
  };

  moveFocusDown = (id) => {
    const focusedIdx = this.state.responseIDs.indexOf(id);
    if (focusedIdx === this.state.focusedID) {
      const newFocusID = focusedIdx + 1;
      if ((newFocusID >= 0) & (newFocusID < this.state.responseIDs.length)) {
        this.setState({ focusedID: newFocusID });
      }
    }
  };

  responseElement = (ID, indent, defaultText, className, isFocused) => {
    return (
      <div className={className}>
        <Response
          key={ID}
          responseID={ID}
          isFocused={isFocused}
          indent={indent}
          defaultText={defaultText}
          isEmpty={this.responseIsEmpty}
          hasContent={this.responseIsFilled}
          requestFocus={this.assignFocus}
          sendFocusDown={this.moveFocusDown}
          sendFocusUp={this.moveFocusUp}
        />
      </div>
    );
  };

  render() {
    const responses = this.state.responseIDs.map((ID, idx) => {
      const isFocused = idx === this.state.focusedID;
      if (idx % 2 === 0) {
        return this.responseElement(
          ID,
          1,
          "What else did you do?",
          "responses-mainResponse",
          isFocused
        );
      } else {
        return this.responseElement(ID, 2, "Any thoughts?", "responses-commentary", isFocused);
      }
    });
    return <div>{responses}</div>;
  }
}

export default Responses;
