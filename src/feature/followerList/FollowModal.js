/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FollowUnfollow from '../followUnfollow/FollowUnfollowComponent';
import avatar from '../../app/common/images/avatar.png';


export class FollowModal extends Component {
  clearState = () => {
    const { close } = this.props;
    close();
  }

  handleCloseClick = e => {
    const { close } = this.props;
    const { parentNode } = e.target;
    if (parentNode.classList.contains('follow-container') || parentNode.classList.contains('close-icon')) {
      close();
    }
  }

  render() {
    const { show, userLists, type } = this.props;
    return show ? (
      <div className="list-modal" onClick={this.handleCloseClick}>
        <div className="list-modal__modal-content">
          <div className="modal-header">
            <div className="close-icon">
              <i className="fa fa-times close" />
            </div>
            <h2>{type}</h2>
          </div>
          <div className="modal-body">
            {
              userLists.length !== 0 ? (
                userLists.map(user => (
                  <div className="body-card" key={user.id}>
                    <Link
                      to={`/profile/${user.username}`}
                      className="body-follow-user"
                      onClick={this.clearState}
                    >
                      <div className="body-image">
                        <img src={user.image || avatar} alt="user pic" />
                      </div>
                      <div className="body-info">
                        <p className="body-name">{user.username}</p>
                        <p>
                          {user.firstName}
                          {' '}
                          {user.lastName}
                        </p>
                      </div>
                    </Link>
                    <div className="follow-unfollow-container">
                      <FollowUnfollow
                        authorId={user.id}
                        username={user.username}
                      />
                    </div>
                  </div>
                ))) : null
            }
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default FollowModal;
