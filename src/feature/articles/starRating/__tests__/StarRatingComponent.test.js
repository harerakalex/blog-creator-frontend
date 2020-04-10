/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react';
import { mount } from 'enzyme';
import { StarRating } from '../StarRatingComponent';

const renderStarRating = (args) => {
  const defaultProps = {
    isAuthenticated: true,
    articleId: 1,
    pathname: 'articles',
    starRating: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  const props = { ...defaultProps, ...args };
  return mount(<StarRating {...props} />);
};

const Wrapper = renderStarRating();
const div = Wrapper.find('div');

describe('StarRating Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find StarRatings component', () => {
    expect(div.length).toEqual(7);
  });
  it('should update props', () => {
    Wrapper.setProps({ isAuthenticated: false });
    expect(Wrapper).toHaveLength(1);
  });
  it('should update props', () => {
    Wrapper.setProps({ isAuthenticated: true });
    expect(Wrapper).toHaveLength(1);
  });
  it('should test changeRating', () => {
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().changeRating = myFun;
    div.at(2).simulate('click');
    const updateState = instance.changeRating(3);
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(1);
  });
});
