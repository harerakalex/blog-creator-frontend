/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveProfile } from './ViewProfileAction';
import { updateUserProfile } from '../update_profile/UpdateProfileAction';
import visitedProfile from '../viewVisitedProfile/ViewVisitedProfileAction';
import FollowList from '../../followerList/FollowListComponent';
import './ViewProfileStyle.scss';
import notFound from '../img/no-image.jpeg';
import { UpdateProfileComponent } from '../update_profile/UpdateProfileComponent';
import UserArticlesComponent from '../userArticles/userArticlesComponent';

export class ViewProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    const {
      getVisitedProfile,

      match: {
        params: { userName }
      }
    } = this.props;
    if (userName) {
      getVisitedProfile(userName);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      getVisitedProfile,
      match: {
        params: { userName }
      }
    } = this.props;
    if (userName !== prevProps.match.params.userName) {
      getVisitedProfile(userName);
    }
  }

  displayModal = value => {
    this.setState({
      show: value
    });
  };

  render() {
    const {
      authenticated,
      updateProfile,
      visitedUserProfile,
      history,
    } = this.props;

    const { show } = this.state;
    let image;
    let bio;
    let user;

    if (visitedUserProfile.length !== 0) {
      user = visitedUserProfile.userName;
      image = visitedUserProfile.image ? visitedUserProfile.image : notFound;
      bio = visitedUserProfile.bio ? visitedUserProfile.bio : 'No Bio';
    }

    return user ? (
      <div>
        <h1 className="title">User Profile</h1>
        <div className="grid-container">
          <div className="grid-container__cover">
            <img src={image} alt="avatar" className="grid-container__avatar" />
          </div>
          <div className="grid-container__profile-info">
            <p className="grid-container__username">{`${user}`}</p>
            <p className="grid-container__bio">{`${bio}`}</p>
            <FollowList
              params={this.props.match.params}
            />
          </div>
          {user === authenticated.username ? (
            <button
              type="submit"
              className="grid-container__btn"
              onClick={() => {
                this.displayModal(true);
              }}
            >
              Edit Profile
            </button>
          ) : (
            ''
          )}
          <UpdateProfileComponent
            show={show}
            authenticated={authenticated}
            updateProfile={updateProfile}
            displayModal={this.displayModal}
            bio={bio}
          />
        </div>
        <div>
          <UserArticlesComponent
            history={history}
            params={this.props.match.params}
          />
        </div>
      </div>
    ) : (
      <p className="grid-container__loading">Loading...</p>
    );
  }
}

export const mapStateToProps = state => ({
  authenticated: state.login.user,
  profile: state.profile,
  visitedUserProfile: state.profile.visitedProfile
});

export const mapDispatchToProps = dispatch => ({
  getProfile: user => {
    dispatch(retrieveProfile(user));
  },
  getVisitedProfile: user => {
    dispatch(visitedProfile(user));
  },
  updateProfile: (user, profile, closeModal) => dispatch(updateUserProfile(user, profile, closeModal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfileComponent);
