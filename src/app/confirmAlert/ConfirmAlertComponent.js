/* eslint-disable no-unused-expressions */
import React from 'react';

export default function ConfirmAlertComponent(props) {
  const {
    slug, deleteArticle, onClose, userName, author
  } = props;
  return (
    <div className="custom-ui modal-body">
      <h1>Are you sure</h1>
      <p>You want to delete this article?</p>
      <button className="modal-btn btn__cancel" type="button" onClick={onClose}>
        Cancel
      </button>
      <button
        className="modal-btn btn__delete"
        type="button"
        onClick={() => {
          userName === author.userName ? (deleteArticle(slug), onClose()) : '';
        }}
      >
        Yes, Delete it!
      </button>
    </div>
  );
}
