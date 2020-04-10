import dotenv from 'dotenv';
import { connect } from 'react-redux';
import React from 'react';
import { BACKEND_URL } from '../../../app/common/config/appConfig';
import './Social.scss';
import { social } from './SocialAction';

dotenv.config();

/**
 * @description This component describes the look and feel of Social login buttons
 * @returns {Object} Google, Facebook and Twitter buttons
 */
export const SocialLogin = (props) => (
  <>
    <div className="social-login-div">
      <button
        type="button"
        className="social-btn btn-google"
        name="google"
        onClick={() => {
          const { social: redirectURL } = props;
          redirectURL(`${BACKEND_URL}/auth/google`);
        }}
      >
        <i className="fa fa-google icon" />
        <span>Log in with Google</span>
      </button>
      <button
        type="button"
        className="social-btn btn-facebook"
        name="google"
        onClick={() => {
          const { social: redirectURL } = props;
          redirectURL(`${BACKEND_URL}/auth/facebook`);
        }}
      >
        <i className="fa fa-facebook icon" />
        <span>Log in with Facebook</span>
      </button>
      <button
        type="button"
        className="social-btn btn-twitter"
        name="google"
        onClick={() => {
          const { social: redirectURL } = props;
          redirectURL(`${BACKEND_URL}/auth/twitter`);
        }}
      >
        <i className="fa fa-twitter  icon" />
        <span>Log in with Twitter</span>
      </button>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  success: state.social.success,
});

const SocialAuth = connect(
  mapStateToProps,
  { social }
)(SocialLogin);


export default SocialAuth;
