/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

const BookmarkComponent = ({
  bookmarks, isAuthenticated, loading, onClick, articleId
}) => {
  const isArticleInBookmarks = bookmarks.filter(
    (bookmark) => Number(bookmark.articleId) === Number(articleId)
  )[0];
  const [isBookmarked, setIsBookmarked] = useState(isArticleInBookmarks);

  useEffect(() => {
    setIsBookmarked(isArticleInBookmarks);
  }, [isArticleInBookmarks]);

  return loading && isAuthenticated.isAuthenticated ? (
    <span style={{
      display: 'inline-block', width: '30px', height: '30px', backgroundColor: '#ddd', borderRadius: '50%'
    }}
    />
  ) : (
    <span className="bookmark">
      <i
        style={{
          fontSize: '28px', position: 'relative', bottom: '4px', marginRight: '6px', cursor: 'pointer'
        }}
        className={isBookmarked ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}
        onClick={() => {
          onClick(isBookmarked, articleId);
          setIsBookmarked(!isBookmarked);
        }}
      />
    </span>
  );
};

export default (BookmarkComponent);
