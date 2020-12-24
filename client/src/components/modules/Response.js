import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import { get, put } from "../../utilities";
import "./Response.css";

class Response extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = { text: this.props.defaultText };
  }

  handleChange = (evt) => {
    const newValue = evt.target.value;
    this.saveContents(newValue);
    if (newValue === "") {
      this.setState({ text: this.props.defaultText });
      this.props.isEmpty(this.props.responseID);
    } else {
      this.setState({ text: newValue });
      this.props.hasContent(this.props.responseID);
    }
  };

  isDefault = () => {
    return this.state.text === this.props.defaultText;
  };

  isEmpty = () => {
    return this.state.text === "";
  };

  saveContents = (textToSave) => {
    const body = {
      responseID: this.props.responseID,
      text: textToSave,
    };
    put("/api/response/text", body);
  };

  onBlur = (evt) => {
    if (this.isEmpty()) {
      this.setState({ text: this.props.defaultText });
    }
  };

  onFocus = (evt) => {
    if (this.isDefault()) {
      this.setState({ text: "" });
    }
  };

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.focusElement();
    } else {
      this.blurElement();
    }
  }

  componentDidMount() {
    if (this.props.isFocused) {
      this.focusElement();
    } else {
      this.blurElement();
    }
    const body = {
      responseID: this.props.responseID,
    };
    get("/api/response/text", body).then((res) => {
      this.handleChange({ target: { value: res.text ? res.text : "" } });
    });
  }

  focusElement = () => {
    this.contentEditable.current.focus();
    this.onFocus();
  };

  blurElement = () => {
    this.contentEditable.current.blur();
    this.onBlur();
  };

  handleClick = () => {
    this.props.requestFocus(this.props.responseID);
  };

  handleKeyPress = (evt) => {
    if (evt.key == "ArrowDown") {
      this.props.sendFocusDown(this.props.responseID);
    }
    if (evt.key == "ArrowUp") {
      this.props.sendFocusUp(this.props.responseID);
    }
  };

  render() {
    const textBodyClass = this.isDefault() ? "Text-body Text-default" : "Text-body";
    return (
      <div className={`${this.props.className} Text-container u-flex`}>
        <div className="Text-bullet">{"#".repeat(this.props.indent)}</div>
        <ContentEditable
          className={textBodyClass}
          innerRef={this.contentEditable}
          html={this.state.text}
          disabled={false}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.handleKeyPress}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default Response;
