/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class AvarageRating extends Component {
  render() {
    const rating = this.props.avarageRatings ? this.props.avarageRatings : 0;
    return (
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="#e6432f"
          numberOfStars={5}
          name="rating"
          starDimension="15px"
          starSpacing="2px"
        />
        {' '}
        <span>
          {rating}
        </span>
      </div>
    );
  }
}

export default AvarageRating;
