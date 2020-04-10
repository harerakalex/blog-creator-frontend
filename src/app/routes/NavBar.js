/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveProfile } from '../../feature/profile/view_profile/ViewProfileAction';
import { login } from '../../feature/auth/login/LoginAction';
import { social, authUser } from '../../feature/auth/socialLogin/SocialAction';
import DropDown from './MenuDropDown';
import Notifications from './NotificationDropDown';
import DefaultAvatar from '../common/images/avatar.png';
import NotificationAvatar from '../common/images/notification.png';

export class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      showNotification: false
    };
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    this.currentUserProfile();
  }

  componentDidUpdate(prevProps) {
    const loggingIn = prevProps.currentUser.isAuthenticated;
    return loggingIn ? null : this.currentUserProfile();
  }

  displayMenu = () => {
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  displayNotification = () => {
    this.setState({ showNotification: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  currentUserProfile = () => {
    const { currentUser, retrieveProfile } = this.props;
    const {
      user: { username },
      isAuthenticated
    } = currentUser;
    return isAuthenticated ? retrieveProfile(username) : null;
  };

  redirectURL = () => {
    window.location.replace('/');
  };

  closeMenu() {
    this.setState({ showMenu: false, showNotification: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    const { search } = window.location;
    if (search) {
      if (search.includes('token')) {
        const token = search.replace('?token=', '');
        this.props.authUser(token);
        this.redirectURL();
      }
    }

    const {
      currentUser: { isAuthenticated },
      success,
      profile: { profile }
    } = this.props;
    const { showMenu, showNotification } = this.state;
    return (
      <nav className="nav-wrapper">
        <div className="logo-container">
          <Link to="/" className="logo">
            Authors Haven
          </Link>
        </div>
        {!(isAuthenticated || success) ? (
          <div className="right">
            <ul>
              <li>
                <Link to="/search">
                  <i className="fa fa-search" title="search" />
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/Signup">SignUp</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="right" id="right">
            <ul>
              <li>
                <Link to="/search">
                  <i className="fa fa-search" />
                </Link>
              </li>
              <div className="notification-dropdown">
                <li className="img-list-item notification-container">
                  <span className="notification-counter">10</span>
                  <img
                    src={NotificationAvatar}
                    className="right__img nav-user-notification"
                    alt="notification"
                    onClick={this.displayNotification}
                  />
                </li>
                {showNotification ? (
                  <div className="notification-content">
                    <Notifications />
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="dropdown">
                <li className="img-list-item">
                  <img
                    src={profile.image || DefaultAvatar}
                    className="right__img nav-user-image"
                    alt="user"
                    onClick={this.displayMenu}
                  />
                </li>
                {showMenu ? (
                  <div className="dropdown-content">
                    <DropDown user={profile} />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </ul>
          </div>
        )}
      </nav>
    );
  }
}

// Login store
/* login {
  user: {},
  isAuntenticated: beolem
}
*/
const mapStateToProps = state => ({
  currentUser: state.login,
  success: state.social.success,
  profile: state.profile
});

const mapDispatchToProps = {
  login,
  social,
  authUser,
  retrieveProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
