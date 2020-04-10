/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import registerUser from './SignUpAction';
import Social from '../socialLogin/SocialComponent';
import './SignUpStyle.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { createUser } = this.props;
    createUser(this.state);
  };

  render() {
    return (
      <div className="signup-main-wraper">
        <div className="signup-main-wraper__heading">
          <h1>Sign Up</h1>
          <p>
            Already have an account? &nbsp;
            <span>
              <a href="/login" className="sign-in-link">
                Log In
              </a>
            </span>
          </p>
        </div>
        <div className="signup-main-container">
          <div className="signup-main-container__form-body">
            <form className="form-container" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  placeholder="Firstname"
                  onChange={this.handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Lastname"
                  required
                  onChange={this.handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="userName"
                  placeholder="Username"
                  required
                  onChange={this.handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={this.handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  onChange={this.handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  onChange={this.handleChange}
                  className="form-input"
                />
              </div>
              <button type="submit" className="signup-btn">
                Sign Up
              </button>
            </form>
          </div>
          <div className="signup-main-container__social-container">
            <Social />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(registerUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
