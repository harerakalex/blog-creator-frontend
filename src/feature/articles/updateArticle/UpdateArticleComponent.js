/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import updateArticle from './UpdateArticleAction';
import GetSingleArticle from '../getSingleArticle/GetSingleArticleAction';
import editorConfigs from '../../../app/common/config/ckeditorConfig';
import 'react-toastify/dist/ReactToastify.css';
import '../createArticle/createArticle.scss';

export class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: '',
      category: '',
      body: ''
    };
  }

  componentDidMount = async () => {
    const {
      match: {
        params: { slug }
      },
      GetSingleArticle
    } = this.props;
    await GetSingleArticle(slug);
    const {
      article: {
        title, description, tagList, category, body
      }
    } = this.props;
    this.setState({
      title,
      description,
      tags: tagList,
      category,
      body
    });
  };

  componentDidUpdate() {
    const {
      article: { slug },
      updated
    } = this.props;
    if (updated) {
      window.location.assign(`/articles/${slug}`);
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate = event => {
    event.preventDefault();
    const {
      title, description, tags, category, body
    } = this.state;
    const {
      updateArticle,
      article: { slug }
    } = this.props;
    const test = !title || !description || !body;
    const message = 'Please fill in Title, Description and Body  to Update the article';
    return test
      ? toast.error(message, { position: toast.POSITION.TOP_CENTER })
      : updateArticle(
        {
          title,
          description,
          tags,
          category,
          body
        },
        slug
      );
  };

  render() {
    const {
      title, description, tags, category, body
    } = this.state;
    return (
      <div className="mainDiv">
        <div className="input input--form">
          <input
            className="input input__title"
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
            required
            placeholder="Enter title ...."
          />
        </div>
        <div className="input input--form">
          <input
            className="input input__description"
            type="text"
            name="description"
            value={description || ''}
            onChange={this.onChange}
            required
            placeholder="Give a descriptive summary"
          />
        </div>
        <div className="input input--form">
          <input
            className="input input__category"
            type="text"
            name="category"
            value={category || ''}
            onChange={this.onChange}
            placeholder="Give a Category"
          />
        </div>
        <div className="input input--form">
          <CKEditor
            className="input input__body"
            editor={ClassicEditor}
            data={body}
            required
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({ body: data });
            }}
            config={editorConfigs}
          />
          <div className=" input input--form">
            <input
              className="input input__tags"
              type="text"
              name="tags"
              value={tags || ' '}
              onChange={this.onChange}
              placeholder="Enter tags for your Article"
            />
          </div>
          <div className="btn btn--submit">
            <button
              className="btn btn__create"
              type="submit"
              onClick={this.handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ getSingleArticle }) => ({
  article: getSingleArticle.article,
  updated: getSingleArticle.updated
});

export default connect(
  mapStateToProps,
  { updateArticle, GetSingleArticle }
)(UpdateArticle);
