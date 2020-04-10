/* eslint-disable no-shadow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import resetPasswordAction from './resetPasswordAction';
import '../resetPassword.scss';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = this.state;
    const {
      match: { params: { token } }, resetPasswordAction
    } = this.props;
    resetPasswordAction(password, confirmPassword, token, this.props);
  };

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <div className="form">
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="reset">
            <h1>
            Reset Password
            </h1>
            <p>
            Enter your new password and confirm it, then hit Reset
            </p>
          </div>
          <div className="inputForm">
            <input id="password" type="password" name="password" placeholder="New Password" onChange={this.onChange} value={password} />
            <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Retype New Password" onChange={this.onChange} value={confirmPassword} />
          </div>
          <div className="formButton">
            <button type="submit" className="send">Reset</button>
          </div>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
};
export default connect(null, { resetPasswordAction })(ResetPassword);
