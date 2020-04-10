/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';

class DisabledStar extends Component {
  changeRating = () => {
    toast.error('You can not rate your article', { position: toast.POSITION.TOP_CENTER });
  }

  render() {
    const rating = 0;
    return (
      <div>
        <StarRatings
          rating={rating}
          starRatedColor="black"
          starHoverColor="rgb(203, 211, 227)"
          numberOfStars={5}
          changeRating={this.changeRating}
          name="rating"
          starDimension="20px"
          starSpacing="2px"
        />
      </div>
    );
  }
}

export default DisabledStar;
