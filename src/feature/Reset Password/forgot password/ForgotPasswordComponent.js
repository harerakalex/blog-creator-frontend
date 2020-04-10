/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import forgotPasswordAction from './forgotPasswordAction';
import '../resetPassword.scss';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { forgotPasswordAction } = this.props;
    forgotPasswordAction(email);
  }

  render() {
    const { email } = this.state;
    return (
      <div className="form">
        <br />
        <div className="reset">
          <h1>
            Reset Password
          </h1>
          <p>
            Please provide your email address. You will receive a link to reset your password.
          </p>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="inputForm">
            <input id="email" type="email" name="email" placeholder="Email" onChange={this.onChange} value={email} />
          </div>
          <div className="formButton">
            <button type="submit" className="send">Send</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.email,
});
export default connect(mapStateToProps, { forgotPasswordAction })(ForgotPassword);
