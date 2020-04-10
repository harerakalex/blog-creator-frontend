import React from 'react';
import './Comment.scss';

const ConfirmAlert = (props) => {
  const {
    onClose,
    commentDelete,
    articleSlug,
    id,
  } = props;
  return (
    <div className="custom-ui">
      <h1>DELETE COMMENT?</h1>
      <p>Are you sure you want to delete this comment?</p>
      <button type="button" onClick={onClose}>Go Back</button>
      <button
        type="button"
        className="btn-delete"
        onClick={() => {
          commentDelete(articleSlug, id);
          onClose();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ConfirmAlert;
