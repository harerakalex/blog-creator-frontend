/* eslint-disable import/named */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AverageRatingComponent from './AverageRatingComponent';
import store from '../../../app/store/index';

const Wrapper = mount(
  <Provider store={store}>
    <BrowserRouter>
      <AverageRatingComponent />
    </BrowserRouter>
  </Provider>
);

describe('AverageRating Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find StarRatings component', () => {
    expect(Wrapper.find('StarRatings').length).toEqual(1);
  });
});
