import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./LoginButton.css";

const GOOGLE_CLIENT_ID = "599096101333-ac1hkglf93lut5s3k6jgvd9m4noge9ci.apps.googleusercontent.com";

class LoginButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let button;
    if (this.props.userId) {
      button = (
        <div className="logoutButton">
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        </div>
      );
    } else {
      button = (
        <div className="loginButton">
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        </div>
      );
    }
    return button;
  }
}

export default LoginButton;
