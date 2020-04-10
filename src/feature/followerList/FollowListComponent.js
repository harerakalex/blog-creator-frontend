/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import Modal from './FollowModal';
import {
  clearFollowing, clearFollowers, getFollingList, getFollowers, clearFollowingList
} from '../followUnfollow/followUnfollowAction';
import './Follow.scss';

export class FollowListComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      lists: [],
      type: ''
    };
  }

  componentDidMount() {
    const {
      isAuthenticated,
      getFollingList,
      getFollowers,
      params
    } = this.props;
    if (isAuthenticated) {
      getFollowers(params.userName);
      getFollingList(params.userName);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      clearFollowingList,
      clearFollowing,
      clearFollowers,
      getFollingList,
      getFollowers,
      params: { userName }
    } = this.props;
    if (userName !== prevProps.params.userName) {
      clearFollowing();
      clearFollowers();
      clearFollowingList();
      getFollowers(userName);
      getFollingList(userName);
    }
  }

  openModal = (value, type) => {
    if (value.length !== 0) {
      this.setState({ modalIsOpen: true, lists: value, type });
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen, lists, type } = this.state;
    const { followList, isAuthenticated } = this.props;
    const { followingList, followers } = followList;
    return isAuthenticated ? (
      <div className="follow-container">
        <button
          type="button"
          onClick={() => { this.openModal(followers, 'Followers'); }}
          className="follow-container__follow-btn"
        >
          <span className="follow-number">{followers.length}</span>
          followers
        </button>
        <button
          type="button"
          onClick={() => { this.openModal(followingList, 'Following'); }}
          className="follow-container__follow-btn"
        >
          <span className="follow-number">{followingList.length}</span>
          following
        </button>
        <Modal
          show={modalIsOpen}
          userLists={lists}
          close={this.closeModal}
          type={type}
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  followList: state.followAuthor,
  isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = {
  getFollingList,
  getFollowers,
  clearFollowing,
  clearFollowers,
  clearFollowingList
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowListComponent);
