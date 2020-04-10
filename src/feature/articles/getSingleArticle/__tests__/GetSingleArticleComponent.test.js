/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { document } from '../../../../__mocks__/windowEvent';
import { ViewSingleArticle } from '../GetSingleArticleComponent';

const renderViewSingleArticle = args => {
  const initialProps = {
    slug: 'kenya moja films99494',
    isAuthenticated: {
      isAuthenticated: false
    },
    handleLike: jest.fn(),
    deleted: jest.fn(),
    isBookmarked: jest.fn(),
    getBookmarks: jest.fn(),
    likeArticle: () => {},
    dislikeArticle: () => {},
    handleDislike: () => {},
    handleBookmarkClick: () => {},
    submitBookmark: () => {},
    GetSingleArticle: () => {},
    bookmarking: jest.fn(),
    article: {
      article: {
        author: ''
      }
    },
    currentUser: {
      user: {}
    },
    history: {
      push: jest.fn()
    },
  };
  const props = { ...initialProps, ...args };
  const match = { params: { slug: 'kenya moja films99494' } };
  return shallow(<ViewSingleArticle {...props} match={match} />);
};

describe('Get Single Article Components tests', () => {
  it('Should render a form inputs', () => {
    window.scrollTo = jest.fn();
    const wrapper = renderViewSingleArticle();
    wrapper.setProps({ loading: false });
    expect(wrapper.find('div').length).toBe(22);
    expect(wrapper.find('img').length).toBe(2);
    expect(window.scrollTo).toBeCalledWith(0, 0);
  });
  it('should test eventListerner on menu display', () => {
    const wrapper = renderViewSingleArticle();
    const button = wrapper.find('.heading__menu');
    button.simulate('click', {});
    document.event({
      name: 'click',
      target: {
        parentNode: { classList: { contains: jest.fn(() => false) } },
        classList: { contains: jest.fn(() => false) }
      }
    });
    expect(wrapper).toHaveLength(1);
  });
});

describe('Reload after Delete article success ', () => {
  it('Should load articles', () => {
    window.location.assign = jest.fn();
    const wrapper = renderViewSingleArticle();
    wrapper.setProps({ deleted: true });
    expect(window.location.assign).toBeCalledWith('/');
  });

  it('Should remain at the same article', () => {
    const wrapper = renderViewSingleArticle();
    wrapper.setProps({ deleted: false });
    expect(window.location.assign).toHaveBeenCalledTimes(4);
  });
  it('should test eventListerner on menu display', () => {
    const wrapper = renderViewSingleArticle();
    const button = wrapper.find('.heading__menu');
    button.simulate('click', {});
    document.event({
      name: 'click',
      target: {
        parentNode: { classList: { contains: jest.fn(() => false) } },
        classList: { contains: jest.fn(() => false) }
      }
    });
    expect(wrapper).toHaveLength(1);
  });
  it('Should test bookmark click when the user is not authenticated ', () => {
    const wrapper = renderViewSingleArticle();
    const handleBookmarkClick = jest.spyOn(wrapper.instance(), 'handleBookmarkClick');
    wrapper.instance().forceUpdate();
    wrapper.find('.bookmarkIcon').simulate('click');
    expect(handleBookmarkClick).toBeCalledTimes(1);
  });
  it('Should test bookmark click when the user is authenticated', () => {
    const wrapper = renderViewSingleArticle({
      isAuthenticated: {
        isAuthenticated: true
      }
    });
    const handleBookmarkClick = jest.spyOn(wrapper.instance(), 'handleBookmarkClick');
    wrapper.instance().forceUpdate();
    wrapper.find('.bookmarkIcon').simulate('click');
    expect(handleBookmarkClick).toBeCalledTimes(1);
  });
});
