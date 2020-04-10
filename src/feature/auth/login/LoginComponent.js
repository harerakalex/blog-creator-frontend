/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueryString from 'query-string';
import { login } from './LoginAction';
import Social from '../socialLogin/SocialComponent';
import './Login.scss';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount = () => {
    this.setState(prevState => ({ ...prevState }));
  };

  componentDidUpdate = () => {
    this.redirectOnSuccess();
  };

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  redirectOnSuccess = () => {
    const { isAuthenticated, location } = this.props;
    const { redirectTo } = QueryString.parse(location.search);
    return isAuthenticated ? this.props.history.push(redirectTo || '/') : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-main-wraper">
        <div className="login-main-wraper__heading">
          <h1>Log In</h1>
          <p>
            New to Authors Haven? &nbsp;
            <span>
              <a href="/signup" className="sign-up-link">
                Sign Up
              </a>
            </span>
          </p>
        </div>
        <div className="login-main-container">
          <div className="login-main-container__form-body">
            <form onSubmit={this.handleSubmit} className="form-container">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="login-botton-control">
                <div className="login-btn-container">
                  <button type="submit" className="loginBtn">
                    Login
                  </button>
                </div>
                <div className="reset-link-container">
                  <a href="/forgot" className="reset-link">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div className="login-main-container__social-container">
            <Social />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

Login.defaultProps = {
  location: {
    search: ''
  }
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
