import React from 'react';
import './CommentCount.scss';

export default function CommentCount({ count }) {
  return (
    <div className="commentCount-box">
      <div className="comment">
        <span className="comment_count">
          {count}
          {count === 1 ? ' comment' : ' comments'}
        </span>
      </div>
    </div>
  );
}
