/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { starRating } from './StarRatingAction';

export class StarRating extends Component {
  constructor() {
    super();

    this.state = {
      rating: 0,
    };
  }

  changeRating = (nextValue) => {
    this.setState({ rating: nextValue }, () => {
      this.submitRating();
    });
  }

  submitRating = () => {
    const {
      isAuthenticated, articleId, pathname, history, starRating, slug
    } = this.props;
    const { rating } = this.state;
    return isAuthenticated ? starRating(rating, articleId, slug) : history.push(`/login?redirectTo=${pathname}`);
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="#e6432f"
          changeRating={this.changeRating}
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="2px"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { starRating })(withRouter(StarRating));
