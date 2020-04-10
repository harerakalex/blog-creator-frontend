/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import mockData from '../../../__mocks__/mockData';
import { BookmarksListComponent } from '../BookmarksListComponent';

const defaultProps = {
  bookmarks: [{}],
  getBookmarks: jest.fn(),
  unbookmark: jest.fn(),
  loading: true,
  RemoveBookmarkClick: jest.fn()
};
const renderBookmarkListComponent = (args = {}) => {
  const props = { ...defaultProps, ...args };
  return mount(<BookmarksListComponent {...props} />);
};

describe('Bookmark component', () => {
  it('Should render bookmark component', () => {
    window.scrollTo = jest.fn();
    const wrapper = renderBookmarkListComponent();
    wrapper.setProps({ bookmarks: mockData.bookmarks });
    wrapper.update();
    expect(wrapper.find('.bookmarks-header').length).toBe(1);
  });
});
