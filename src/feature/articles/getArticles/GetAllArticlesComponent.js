import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import momemt from 'moment';
import backgroundImage from '../../../app/common/images/backgroundImage.jpg';
import getImage from '../../../app/helpers/getImage';
import defautImage from '../../../app/common/images/defaultImage.png';
import avatar from '../../../app/common/images/avatar.png';
import getAllArticles from './GetAllArticlesAction';
import LikeDilsikeArticle from '../likeDislikeArticles/LikeDislikeComponent';
import CommentCountComponent from '../../../app/common/CommentCount/CommentCountComponent';
import Pagination from '../../../app/common/pagination/PaginationComonent';
import './GetAllArticles.scss';

export class GetAllArticles extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 1
    };
  }

  componentDidMount() {
    const { activePage } = this.state;
    this.props.getAllArticles(activePage);
    const { getAllArticles } = this.props;
    getAllArticles();
  }

  render() {
    const { articles, loading } = this.props;
    return (
      <div className="mainDiv">
        <div className="main--banner">
          <div className="main--banner__text">
            <h1 className="heading__3">
              Authors <br />
              Haven
            </h1>
            <h3 className="heading__4">Create and Read Articles</h3>
          </div>
          <img className="main--banner__img" src={backgroundImage} alt="" />
        </div>

        {loading ? (
          <span className="loader">LOADING...</span>
        ) : (
          <div className="main-content">
            {articles.length !== 0 ? (
              articles.map(article => (
                <div className="article article-main--wrapper">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="link_image"
                    key={article.id}
                  >
                    <div className="article__image">
                      <img
                        className="article__image-box"
                        src={
                          getImage(article.body)
                            ? getImage(article.body)
                            : defautImage
                        }
                        alt=""
                      />
                    </div>
                  </Link>
                  <div className="body-wrapper article__content">
                    <div className="user--wrapper">
                      <Link
                        to={`/profile/${article.author.userName}`}
                        className="link"
                      >
                        <div className="user__avatar">
                          <img
                            className={
                              article.author.image ? 'user__avatar-box' : ''
                            }
                            src={
                              article.author.image
                                ? article.author.image
                                : avatar
                            }
                            alt="user"
                          />
                        </div>
                      </Link>

                      <div className="user__name">
                        <Link
                          to={`/profile/${article.author.userName}`}
                          className="link"
                        >
                          {article.author.userName}
                        </Link>
                      </div>
                      <div className="article-time">
                        <div className="article__timePublished">
                          {momemt(article.createdAt)
                            .startOf('hour')
                            .fromNow()}
                        </div>
                        <div className="article__readTime">
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <Link to={`/articles/${article.slug}`} className="link">
                      <div className="article--wrapper">
                        <div className="article__title">{article.title}</div>
                        <div className="article__description">
                          {article.description}
                        </div>
                      </div>
                    </Link>
                    <hr className="divider" />
                    <Link to={`/articles/${article.slug}`} className="link">
                      <CommentCountComponent
                        className="btn__commentCount"
                        count={article.commentCount}
                      />
                    </Link>
                    <Link to={`/articles/${article.slug}`} className="link">
                      <LikeDilsikeArticle
                        className="disabled btn__likesDislikes"
                        likes={article.likes}
                        dislikes={article.dislikes}
                      />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="article__error">
                <h2>
                  Sorry No Articles Found At The Moment.
                  <br />
                  Please Create one or comeback later!!!
                </h2>
              </div>
            )}
            <div>
              <Pagination
                getAllArticles={this.props.getAllArticles}
                articleNumbers={this.props.totalArticleNum}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.getAllArticles.articles,
  loading: state.getAllArticles.loading,
  totalArticleNum: state.getAllArticles.articlesCount
});
const mapDispatchToProps = {
  getAllArticles
};
export default connect(mapStateToProps, mapDispatchToProps)(GetAllArticles);
