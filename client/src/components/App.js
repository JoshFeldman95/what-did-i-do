import React, { Component } from "react";
import WhatDidIDo from "./modules/WhatDidIDo.js";
import LoginButton from "./modules/LoginButton.js";
import "./App.css";
import "../utilities.css";
import { get, post } from "../utilities.js";

class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }
  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user.id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user.id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      console.log(user);
      this.setState({ userId: user.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <LoginButton
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <WhatDidIDo userId={this.state.userId} />
      </>
    );
  }
}

export default App;
