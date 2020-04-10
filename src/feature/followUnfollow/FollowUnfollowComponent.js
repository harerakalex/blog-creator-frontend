/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearFollowing, getFollowing, followAuthor, unfollowAuthor
} from './followUnfollowAction';
import './followUnfollow.scss';

export class FollowUnfollowComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: 'Follow',
      unfollowButtonStyle: {
        backgroundColor: '#4887C2',
        color: 'white',
      }
    };
  }

  UNSAFE_componentWillMount = () => {
    const { props } = this;
    return localStorage.token
      ? props.getFollowing(localStorage.username)
      : this.setState(prevState => ({ ...prevState, buttonState: 'Follow' }));
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { following } = nextProps;
    const { username: authorUsername, authorId } = this.props;
    let buttonState = 'Follow';

    following.map(({ username, following }) => {
      if (username && username.toLowerCase() === (authorUsername || '').toLowerCase()) {
        buttonState = 'Unfollow';
      } else if (following && Number.parseInt(following, 10) === Number.parseInt(authorId, 10)) {
        buttonState = 'Unfollow';
      }
      return true;
    });

    return this.setState(prevState => ({
      ...prevState,
      buttonState
    }));
  }


  UNSAFE_componentWillUnmount = () => {
    const { props } = this;
    props.clearFollowing();
  };

  submitFollowOrUnFollow = () => {
    const {
      loggedInUser
    } = this.props;

    return !!loggedInUser.isAuthenticated;
  }

    handleClick = () => {
      const { pathname, history } = this.props;
      if (!this.submitFollowOrUnFollow()) {
        return history.push(`/login?redirectTo=${pathname}`);
      }
      const { buttonState } = this.state;
      const { followAuthor, unfollowAuthor, username } = this.props;
      this.setState(prevState => ({
        ...prevState,
        buttonState: buttonState.toLowerCase() === 'unfollow' ? 'Follow' : prevState.buttonState,
      }));
      return buttonState.toLowerCase() === 'follow' ? followAuthor(username) : unfollowAuthor(username);
    }

    render() {
      const { buttonState, unfollowButtonStyle } = this.state;

      return (
        <div>
          <div className="Follow__button">
            <button className="button" style={buttonState.toLowerCase() === 'unfollow' ? unfollowButtonStyle : {}} type="button" onClick={this.handleClick} value={buttonState}>{buttonState}</button>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  following: state.followAuthor.following,
  follow: state.followAuthor.follow,
  loggedInUser: state.login
});
const mapDispatchToprops = {
  clearFollowing,
  getFollowing,
  followAuthor,
  unfollowAuthor
};
export default connect(
  mapStateToProps, mapDispatchToprops
)(withRouter(FollowUnfollowComponent));
