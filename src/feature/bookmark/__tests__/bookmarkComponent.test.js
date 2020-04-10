/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import BookmarkConmponent from '../BookmarkComponent';

const props = {
  bookmarks: [
    {
      articleId: 1
    },
  ],
  isAuthenticated: {
    isAuthenticated: true
  },
  loading: true,
  onClick: jest.fn()
};
const renderBookmarkComponent = (args = {}) => {
  const match = { params: { slug: 'kenya moja films99494' } };
  const combinedProps = {
    ...props,
    ...args
  };
  return mount(<BookmarkConmponent match={match} {...combinedProps} />);
};

const originalError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('Bookmark component', () => {
  it('Should render bookmark component', () => {
    const wrapper = renderBookmarkComponent();
    expect(wrapper.find('span').length).toBe(1);
  });

  it('Should render bookmark icon', () => {
    const wrapper = renderBookmarkComponent({ loading: false });
    const icon = wrapper.find('i');
    icon.props().onClick();
    expect(icon.length).toBe(1);
  });
});
