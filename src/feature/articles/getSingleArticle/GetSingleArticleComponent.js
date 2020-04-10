/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import momemt from 'moment';
import ReactHtmlParser from 'react-html-parser';
import GetSingleArticle from './GetSingleArticleAction';
import LikeDislikeArticle from '../likeDislikeArticles/LikeDislikeComponent';
import StarRating from '../starRating/StarRatingComponent';
import AverageRating from '../averageRating/AverageRatingComponent';
import DisabledStar from '../starRating/DisabledStarComponent';
import DefaultAvatar from '../../../app/common/images/avatar.png';
import ellipsis from '../../../app/common/images/ellipsis.png';
import ShareArticle from '../shareArticle/ShareArticleComponent';
import FollowUnfollowComponent from '../../followUnfollow/FollowUnfollowComponent';
import CommentCountComponent from '../../../app/common/CommentCount/CommentCountComponent';
import ArticleMenuDropdown from '../../../app/common/articleMenu/ArticleDropdownMenu';
import deleteArticle from '../deleteArticle/DeleteAction';
import CommentComponent from '../../comment/CommentComponent';
import BookmarkComponent from '../../bookmark/BookmarkComponent';
import {
  getBookmarks,
  bookmarking,
  unbookmark
} from '../../bookmark/bookmarkAction';
import Tags from '../displayTags/TagsComponent';
import './GetSingleArticle.scss';

export class ViewSingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkState: 'bookmark',
      articleId: null,
      isArticleBookmarked: false,
      bookmarks: []
    };
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const { articleId } = this.state;
    const { bookmarks, article } = nextProps;
    this.setState(prevState => ({
      ...prevState,
      bookmarks: bookmarks || prevState.bookmarks,
      isArticleBookmarked: (bookmarks || prevState.bookmarks).filter(
        bookmark => Number(bookmark.articleId) === Number(articleId)
      )[0],
      articleId:
        (article && article.article && article.article.id) ||
        prevState.articleId
    }));
  };

  componentDidMount() {
    const { GetSingleArticle, getBookmarks } = this.props;
    const { slug } = this.props.match.params;
    GetSingleArticle(slug);
    window.scrollTo(0, 0);

    return localStorage.token
      ? getBookmarks()
      : this.setState(prevState => ({ ...prevState, buttonState: 'bookmark' }));
  }

  submitBookmark = () => {
    const { isAuthenticated } = this.props;

    return isAuthenticated.isAuthenticated;
  };

  handleBookmarkClick = (isBookmarked, articleId) => {
    const { location, history } = this.props;
    if (!this.submitBookmark()) {
      return history.push(`/login?redirectTo=${location.pathname}`);
    }
    const { slug } = this.props.match.params;
    const { bookmarking, unbookmark } = this.props;
    return !isBookmarked ? bookmarking(slug) : unbookmark(slug, articleId);
  };

  componentDidUpdate() {
    const { deleted } = this.props;
    if (deleted) {
      window.location.assign('/');
    }
  }

  closeMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  displayMenu = () => {
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  render() {
    const {
      article: {
        author = {},
        id,
        authorId,
        title,
        description,
        body,
        slug,
        likes,
        dislikes,
        createdAt,
        readTime,
        averageRatings,
        commentCount,
        tagList
      },
      currentUser: { user },
      bookmarkLoading,
      loading
    } = this.props;
    const { history, location } = this.props;
    const username = localStorage.getItem('username');
    const { userName, image } = author;
    const ownArticle = userName === user.username;
    const { displayMenu, bookmarks } = this.state;

    return (
      <div className="wrapper-commenting">
        {loading ? (
          <span className="loader">LOADING...</span>
        ) : (
          <>
            <div className="heading">
              <div className="heading__left">
                <span>
                  <div className="heading__follow">
                    <FollowUnfollowComponent
                      authorId={authorId}
                      username={userName}
                      pathname={this.props.location.pathname}
                    />
                  </div>
                </span>
                <Link
                  to={`/profile/${userName}`}
                  key={userName}
                  className="link"
                >
                  <div className="heading__image">
                    <img
                      src={image || DefaultAvatar}
                      className="heading__img"
                      alt="user"
                    />
                  </div>
                </Link>
                <div className="heading__user">
                  <Link
                    to={`/profile/${userName}`}
                    key={userName}
                    className="link"
                  >
                    <span className="heading__name">{userName}</span>
                  </Link>
                  <br />
                  <span className="heading__munite">
                    {momemt(createdAt)
                      .startOf('hour')
                      .fromNow()}
                  </span>
                  {'  '}
                  <span className="heading__munite">{readTime}</span>
                  <span>
                    <div className="heading__avarageRating">
                      <AverageRating avarageRatings={averageRatings} />
                    </div>
                  </span>
                </div>
              </div>
              <div className="heading__right">
                <div className="heading__right-item">
                  <div className="menu">
                    <BookmarkComponent
                      isAuthenticated={this.props.isAuthenticated.isAuthenticated}
                      loading={bookmarkLoading}
                      articleId={id}
                      bookmarks={bookmarks}
                      onClick={this.handleBookmarkClick}
                      pathname={this.props.location.pathname}
                      className="bookmarkIcon"
                    />
                    <span>
                      {username === userName || !username ? (
                        <img
                          src={ellipsis}
                          className="heading__menu"
                          alt=" "
                          onClick={this.displayMenu}
                        />
                      ) : (
                        ''
                      )}
                    </span>
                    {displayMenu ? (
                      <ArticleMenuDropdown
                        slug={slug}
                        pathname={this.props.location.pathname}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="body__title">
                <h2>{title}</h2>
              </div>
              <div className="body__description">
                <p className="body__description-content">{description}</p>
              </div>
              <div className="body__article-body">{ReactHtmlParser(body)}</div>
              <hr />
              <div className="status">
                <div className="status__stats">
                  <span>7 reads</span>
                </div>
                <div className="status__comment">
                  <CommentCountComponent
                    className="btn__commentCount"
                    count={commentCount}
                  />
                </div>
                <div className="status__like">
                  <span>
                    <LikeDislikeArticle
                      likes={likes}
                      dislikes={dislikes}
                      slug={this.props.match.params.slug}
                      pathname={this.props.location.pathname}
                    />
                  </span>
                </div>
                <div className="status__rate">
                  {ownArticle ? (
                    <span className="status__rate">
                      <DisabledStar />
                    </span>
                  ) : (
                    <span className="status__rate">
                      <StarRating
                        articleId={id}
                        pathname={this.props.location.pathname}
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="tags-share-container">
                <div className="tags">
                  <Tags tags={tagList} />
                </div>
                <div className="share-buttons">
                  <ShareArticle />
                </div>
              </div>
              <CommentComponent
                slug={this.props.match.params.slug}
                history={history}
                location={location}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ getSingleArticle, login, bookmarking }) => ({
  article: getSingleArticle.article,
  currentUser: login,
  isAuthenticated: login,
  deleted: getSingleArticle.deleted,
  bookmarks: bookmarking.bookmarks,
  loading: getSingleArticle.loading,
  bookmarkLoading: bookmarking.loading
});

const mapDispatchToProps = {
  GetSingleArticle,
  deleteArticle,
  getBookmarks,
  bookmarking,
  unbookmark
};

ViewSingleArticle.defaultProps = {
  location: {
    pathname: ''
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSingleArticle);
