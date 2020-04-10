import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import momemt from 'moment';
import defautImage from '../../../app/common/images/defaultImage.png';
import getImage from '../../../app/helpers/getImage';
import './Search.scss';

export class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const { results } = this.props;
    this.setState({ articles: results.articles });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.results.articles,
    });
  }

  render() {
    const { articles } = this.state;
    const { results } = this.props;
    const { error } = results;
    return (
      <div className="result-container">
        {
          articles.length !== 0 ? (
            articles.map(article => (
              <Link
                to={`/articles/${article.slug}`}
                className="result-link"
                key={article.slug}
              >
                <div className="result-article">
                  <div className="result-article__image">
                    <img src={getImage(article.body) || defautImage} className="article-image" alt="Result pic" />
                  </div>
                  <div className="result-article__content">
                    <h1>{article.title}</h1>
                    <p className="description">{article.description}</p>
                    <p className="time">
                      <span className="time-due">
                        {momemt(article.createdAt)
                          .startOf('hour')
                          .fromNow()}
                      </span>
                      <span className="time-read">
                        {article.readTime}
                      </span>
                    </p>
                    <p className="author">
                      Written by:
                      <span>
                        &nbsp;
                        {article.author.userName}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))) : null
        }
        {
          ((error !== null) && (articles.length === 0)) ? (
            <div className="article-not-found">
              <p>We could not find any articles.</p>
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default SearchResult;
