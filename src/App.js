import React, { Component } from "react";
import { Navigate } from "react-router-dom";
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
    };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    // You can add your authentication logic here
    const { username, password } = this.state;

    if (username != null && password != null) {
      this.setState({ isLoggedIn: true });
      localStorage.setItem("username", "username");
      // Navigate or perform further actions after successful login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      // Navigate to UniversityList with username as a parameter
      return (
        <Navigate
          replace
          to={`/UniversityList?username=${this.state.username}`}
        />
      );
    }

    return (
      <div>
        <h2>Login Page</h2>
        <div>
          <span>Username</span>
          <input
            type="text"
            placeholder="Demo"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <br />
        <div>
          <span>Username</span>
          <input
            type="password"
            placeholder="Demo"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <br />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default LoginPage;
