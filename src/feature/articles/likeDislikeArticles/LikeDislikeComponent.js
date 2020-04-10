/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { likeArticle, dislikeArticle } from './LikeDislikeAction';
import './LikeDislike.scss';

export class LikeDislike extends Component {
  handleLike = () => {
    const {
      slug,
      likeArticle,
      isAuthenticated,
      history,
      pathname
    } = this.props;

    isAuthenticated
      ? likeArticle(slug)
      : history.push(`/login?redirectTo=${pathname}`);
  };

  handleDislike = () => {
    const {
      slug,
      dislikeArticle,
      isAuthenticated,
      history,
      pathname
    } = this.props;
    isAuthenticated
      ? dislikeArticle(slug)
      : history.push(`/login?redirectTo=${pathname}`);
  };

  render() {
    const { likes, dislikes } = this.props;

    return (
      <div className="likeDislike-box">
        <div className="likes">
          <i
            className="fa fa-thumbs-o-up"
            onClick={this.handleLike}
            id="likes"
          />
          <span className="likes__count">{likes}</span>
        </div>

        <div className="dislikes">
          <i
            className="fa fa-thumbs-o-down"
            onClick={this.handleDislike}
            id="dislikes"
          />
          <span className="dislikes__count">{dislikes}</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

const mapDispatchToProps = { likeArticle, dislikeArticle };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikeDislike));
