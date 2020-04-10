/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getBookmarks, unbookmark } from './bookmarkAction';
import './bookmarks.scss';

export class BookmarksListComponent extends Component {
  componentDidMount() {
    const { getBookmarks } = this.props;
    getBookmarks();
    window.scrollTo(0, 0);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { bookmarks } = nextProps;
    this.setState(prevState => ({
      ...prevState,
      bookmarks: bookmarks.prevState
    }));
  }

  componentDidUpdate(prevProps) {
    const { bookmarks } = prevProps;
    if ((bookmarks.length === this.props.bookmarks.length)
    && (this.props.bookmarks.length !== 0)) {
      const { getBookmarks } = this.props;
      getBookmarks();
    }
  }

  RemoveBookmarkClick = (event) => {
    const { unbookmark } = this.props;
    const slug = event.target.name;
    unbookmark(slug);
  }

  render() {
    const { bookmarks, loading } = this.props;

    return (
      <>
        <div className="bookmarks-header">
          <h1>
              Bookmarks
            {' '}
            <hr />
          </h1>

        </div>
        {loading ? (
          <span className="bookmark-loader">LOADING...</span>
        ) : (
          <div>
            { bookmarks.length !== 0 ? (
              bookmarks.map(bookmark => (
                <div className="bookmarks">
                  <div className="bookmarks__card">
                    <Link
                      to={`/articles/${bookmark.Article.slug}`}
                      key={bookmark.Article.slug}
                      className="bookamarks__link"
                    >
                      <h3>{bookmark.Article.title}</h3>

                      <p>
                        {bookmark.Article.description}
                      </p>
                    </Link>
                  </div>
                  <button type="submit" name={bookmark.Article.slug} className="bookmark-button" onClick={this.RemoveBookmarkClick}>Remove</button>

                </div>
              ))
            ) : (
              <div className="bookmark__error">
                <h1>
              No Bookmarks Found At The Moment.
                </h1>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ bookmarking, getAllArticles }) => ({
  bookmarks: bookmarking.bookmarks,
  loading: bookmarking.loading,
  articles: getAllArticles.articles,
});

const mapDispatchToProps = {
  getBookmarks,
  unbookmark
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarksListComponent);
