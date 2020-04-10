/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArticles } from './UserArticleAction';
import defaultImage from '../../../app/common/images/defaultImage.png';
import image from '../../../app/helpers/getImage';
import './UserArticles.scss';

export class UserArticles extends Component {
  UNSAFE_componentWillMount() {
    const { getArticles } = this.props;
    const user = window.location.pathname.split('/')[2];
    getArticles(user);
  }

  componentDidUpdate(prevProps) {
    const { getArticles, params: { userName } } = this.props;
    if (userName !== prevProps.params.userName) {
      getArticles(userName);
    }
  }

  handleArticleClick(slug) {
    const { history } = this.props;
    return history.push(`/articles/${slug}`);
  }

  render() {
    const user = window.location.pathname.split('/')[2];
    const { articles, loading } = this.props;
    return (
      <>
        <div className="user-articles-thread">
          <h4>
            {user}
            &apos;s articles :
          </h4>
          {loading ? <h2>Loading...</h2>
            : (
              <div>
                {articles.length
                  ? articles.map(article => (
                    <div
                      key={article.id}
                      className="user-articles-thread__div"
                      onClick={() => this.handleArticleClick(article.slug)}
                      onKeyPress={this.handleWriteComment}
                      tabIndex="0"
                      role="button"
                    >
                      <div className="user-articles-thread__div__img">
                        <img
                          className="user-articles-thread__div__img__default"
                          src={image(article.body) || defaultImage}
                          alt="article"
                        />
                      </div>
                      <div className="user-articles-thread__div__content">
                        <div className="user-articles-thread__div__content__title">
                          {article.description.length > 50
                            ? article.title.substring(0, 50)
                            : article.title}
                        </div>
                        <div className="user-articles-thread__div__content__desc">
                          {
                            article.description.length > 50
                              ? article.description.substring(0, 70)
                              : article.description
                            }
                        </div>
                        <div className="user-articles-thread__div__content__btn">
                          <span className="user-articles-thread__div__content__btn__like">
                            {article.likes}
                            <i
                              className="fa fa-thumbs-o-up"
                              id="dislikes"
                            />
                          </span>
                          <span className="user-articles-thread__div__content__btn__dislike">
                            {article.dislikes}
                            <i
                              className="fa fa-thumbs-o-down"
                              id="dislikes"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="no-articles">
                  You have writen no article yet
                    </div>
                  )}
              </div>
            )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.userArticles.articles,
  loading: state.userArticles.userArticleLoading,
});

const mapDispatchToProps = dispatch => ({
  getArticles: author => {
    dispatch(fetchArticles(author));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserArticles);
