/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConfirmAlert from './ConfirmAlert';
import {
  fetchComments,
  publish,
  commentUpdate,
  commentDelete,
} from './CommentAction';
import './Comment.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import editIcon from '../../app/common/images/edit-icon.png';
import deleteIcon from '../../app/common/images/delete-icon.png';
import likeIcon from '../../app/common/images/thumbs-up-dark-skin-tone.png';
import unlikeIcon from '../../app/common/images/thumbs-down-dark-skin-tone.png';
import profileIcon from '../../app/common/images/placeholder-man.png';

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      input: '',
      isCollapsed: false,
      buttonTxt: 'Read more...',
      userWriteToggle: 'Write a comment...',
      commentBtn: 'Comment',
      commentId: null,
      page: 1,
      limit: 2,
      display: false,
    };
    this.inputRef = React.createRef();
    this.dropDownRef = React.createRef();
    this.commentRef = React.createRef();
    this.updateRef = React.createRef();
    this.handleTextareaInput = this.handleTextareaInput.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleCommentsFetch = this.handleCommentsFetch.bind(this);
  }

  componentDidMount() {
    this.handleCommentsFetch();
  }

  handleWriteComment = () => {
    const {
      user, isAuthenticated, history, location
    } = this.props;

    if (!isAuthenticated) {
      return history.push(`/login?redirectTo=${location.pathname}`);
    }

    this.setState({
      isEditing: true,
      userWriteToggle: user,
    });
    setTimeout(() => this.inputRef.current.focus(), 100);
  }

  handleBlur = () => {
    if (!this.state.input || this.state.input.trim().length < 1) {
      this.setState({
        isEditing: false,
        userWriteToggle: 'Write a comment...'
      });
    }
  }

  handleUpdate = (id, comment) => {
    this.inputRef.current.value = comment;
    this.handleWriteComment();
    this.setState({
      commentBtn: 'Update',
      commentId: id,
    });
  }

  handleDelete = (id) => {
    const {
      slug,
    } = this.props;
    const callDelete = this.props.commentDelete;
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmAlert
          onClose={onClose}
          id={id}
          commentDelete={callDelete}
          articleSlug={slug}
        />
      )
    });
  }

  handleTextareaInput(e) {
    this.setState({ input: e.target.value });
  }

  handleCollapse() {
    if (this.state.isCollapsed) {
      this.setState({
        isCollapsed: false,
        buttonTxt: 'Read more...',
      });
    } else {
      this.setState({
        isCollapsed: true,
        buttonTxt: 'Read less...'
      });
    }
  }

  handlePublish() {
    const {
      input,
      commentBtn,
      commentId
    } = this.state;
    const { slug, user } = this.props;
    if (commentBtn === 'Comment') {
      this.props.publish(input, slug);
      this.setState({
        isEditing: false,
        display: user,
      });
      this.inputRef.current.value = '';
    } else {
      this.props.commentUpdate(input, slug, commentId);
      this.setState({
        isEditing: false,
        commentBtn: 'Comment',
        userWriteToggle: 'Write a comment...',
        input: '',
      });
      this.inputRef.current.value = '';
    }
  }

  handleCommentsFetch() {
    const { limit, page } = this.state;
    let nextPage = page;
    const { fetchComment, slug } = this.props;
    fetchComment(slug, nextPage, limit);
    nextPage = page + 1;
    this.setState({ page: nextPage });
  }


  render() {
    const { user, comments } = this.props;

    const readStyle = this.state.isCollapsed
      ? {}
      : {
        height: '45px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        diplay: 'flex-box',
        WebkitLineClamp: '3',
      };
    const style = this.state.isEditing
      ? {
        height: '100%',
      }
      : { display: 'none' };
    return (
      <>
        <div className="comment">
          <div className="comments-thread">
            <div className="comments-thread__wrapper">
              <span className="comments-thread__wrapper__comments">Comments:</span>
              <div className="comments-thread__wrapper__input">
                <div
                  className="comments-thread__wrapper__input__commentator"
                  onClick={this.handleWriteComment}
                  onKeyPress={this.handleWriteComment}
                  tabIndex="0"
                  role="button"
                >
                  <img
                    src={this.props.image
                      ? this.props.image
                      : profileIcon}
                    alt="Commentator"
                  />
                  <button type="button">
                    { this.state.userWriteToggle }
                  </button>
                </div>
                <div
                  style={style}
                  onBlur={this.handleBlur}
                  className="comments-thread__wrapper__input__publish"
                >
                  <textarea
                    ref={this.inputRef}
                    onChange={this.handleTextareaInput}
                    id="write-comment-ta"
                    rows="3"
                    placeholder="Write your comment here..."
                  />
                  <button
                    type="button"
                    className="comments-thread__wrapper__input__publish__btn"
                    onClick={this.handlePublish}
                  >
                    {this.state.commentBtn}
                  </button>
                </div>
              </div>
              <div className="comments-thread__wrapper__fetch">
                <InfiniteScroll
                  dataLength={comments && comments.length}
                  next={this.handleCommentsFetch}
                  hasMore={this.props.hasMoreComments}
                  loader={<h4>Loading...</h4>}
                >
                  {(comments.length !== 0 ? (
                    comments.map(comment => (
                      <div
                        ref={this.commentRef}
                        key={comment.id}
                        className="comments-thread__wrapper__fetch__div"
                      >
                        <div className="comments-thread__wrapper__fetch__div__commentator">
                          <img
                            src={comment.Commenter.image
                              ? comment.Commenter.image
                              : profileIcon}
                            alt="Commentator"
                            className="comments-thread__wrapper__fetch__div__commentator__profile"
                          />
                          <button
                            type="button"
                            className="comments-thread__wrapper__fetch__div__commentator__username"
                          >
                            {comment.Commenter.userName
                              ? comment.Commenter.userName
                              : user}
                          </button>
                          <span className="comments-thread__wrapper__fetch__div__commentator__time">
                            {
                          moment(comment.createdAt)
                            .startOf('minute')
                            .fromNow()
                          }
                          </span>
                          <div
                            style={(comment.Commenter.userName === user
                            || this.state.display)
                              ? {}
                              : { display: 'none' }}
                            className="comments-thread__wrapper__fetch__div__commentator__div"
                          >
                            <input
                              type="image"
                              src={editIcon}
                              alt="Edit"
                              onClick={() => this.handleUpdate(comment.id, comment.comment)}
                              className="comments-thread__wrapper__fetch__div__commentator__div__img"
                            />
                            <input
                              type="image"
                              src={deleteIcon}
                              alt="Delete"
                              onClick={() => this.handleDelete(comment.id)}
                              className="comments-thread__wrapper__fetch__div__commentator__div__img"
                            />

                          </div>
                        </div>
                        <div style={readStyle} className="comments-thread__wrapper__fetch__div__text">
                          {comment.comment}
                        </div>
                        {comment.comment.length > 200
                          ? (
                            <div className="read-more">
                              <button
                                type="button"
                                className="read-more__btn"
                                onClick={() => this.handleCollapse()}
                              >
                                { this.state.buttonTxt }
                              </button>
                            </div>
                          )
                          : (<div />)}

                        <div className="comments-thread__wrapper__fetch__div__footer">
                          {comment.likes}
                          <img

                            className="comments-thread__wrapper__fetch__div__footer__img-like-btn"
                            src={likeIcon}
                            alt="like"
                          />
                          {comment.dislikes}
                          <img
                            className="comments-thread__wrapper__fetch__div__footer__img"
                            src={unlikeIcon}
                            alt="unlike"
                          />
                        </div>
                      </div>
                    ))

                  ) : (
                    <div className="comments-thread__wrapper__fetch__div">
                    No comments found
                    </div>
                  ))}
                  {' '}
                </InfiniteScroll>
              </div>

            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comment.comments,
  hasMoreComments: state.comment.hasMoreComments,
  commentLoading: state.comment.commentLoading,
  user: state.login.user.username,
  image: state.profile.profile.image,
  isAuthenticated: state.login.isAuthenticated,
  article: state.getSingleArticle.article,
});

const mapDispatchToProps = {
  fetchComment: fetchComments,
  publish,
  commentUpdate,
  commentDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
