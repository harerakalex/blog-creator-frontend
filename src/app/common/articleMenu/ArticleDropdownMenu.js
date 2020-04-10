/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import deleteArticle from '../../../feature/articles/deleteArticle/DeleteAction';
import ConfimAlertComponent from '../../confirmAlert/ConfirmAlertComponent';
import './ArticleDropdownMenu.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class ArticleDropdownMenu extends Component {
  confirmDelete = () => {
    const { slug, deleteArticle, author } = this.props;
    const userName = localStorage.getItem('username');
    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfimAlertComponent
          slug={slug}
          deleteArticle={deleteArticle}
          author={author}
          userName={userName}
          onClose={onClose}
        />
      )
    });
  };

  checkUser = () => {
    const { isAuthenticated, history, pathname } = this.props;
    isAuthenticated
      ? this.confirmDelete()
      : history.push(`/login?redirectTo=${pathname}`);
  };

  render() {
    const { slug } = this.props;
    return (
      <div className="main-wrapper">
        <ul className="dropdown__menu">
          <a href={`/article/${slug}/update`}>
            <li>Update</li>
          </a>
          <li onClick={this.checkUser}>Delete</li>
        </ul>
      </div>
    );
  }
}

const mapDispachtToProps = {
  deleteArticle
};
const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated,
  author: state.getSingleArticle.article.author
});

export default connect(
  mapStateToProps,
  mapDispachtToProps
)(withRouter(ArticleDropdownMenu));
