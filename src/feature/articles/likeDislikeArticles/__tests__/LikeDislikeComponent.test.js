/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../../../app/store';
import LikeDislikeComponent, { LikeDislike } from '../LikeDislikeComponent';

describe('Like and Dislike Component tests', () => {
  const likeArticle = jest.fn();
  const dislikeArticle = jest.fn();
  const wrapper = shallow(
    <LikeDislike likeArticle={likeArticle} dislikeArticle={dislikeArticle} />
  );
  wrapper.setProps({ isAuthenticated: true });
  it('Should render Div, Like and Dislike button', () => {
    expect(wrapper.find('.likes').length).toBe(1);
    expect(wrapper.find('.dislikes').length).toBe(1);
    expect(wrapper.find('div').length).toBe(3);
  });
  it('Should invoke likeArticle handler', () => {
    const likeArticleBtn = wrapper.find('.fa').at(0);
    likeArticleBtn.props().onClick();
    wrapper.update();
    expect(likeArticle).toHaveBeenCalledTimes(1);
  });
  it('Should invoke dislikeArticle handler', () => {
    const dislikeArticleBtn = wrapper.find('.fa').at(1);
    dislikeArticleBtn.props().onClick();
    wrapper.update();
    expect(dislikeArticle).toHaveBeenCalledTimes(1);
  });

  const initialState = {
    isAuthenticated: true
  };
  const props = { ...initialState };
  const connectedWrapper = mount(
    <Router>
      <Provider store={store}>
        <LikeDislikeComponent {...props} />
      </Provider>
    </Router>
  );

  it('should render the component that is connected to the store', () => {
    expect(connectedWrapper.exists()).toBe(true);
  });
});
