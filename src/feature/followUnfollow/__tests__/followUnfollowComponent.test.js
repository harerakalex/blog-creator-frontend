/* eslint-disable react/jsx-props-no-spreading */
import { shallow } from 'enzyme';
import React from 'react';
import mockData from '../../../__mocks__/mockData';

import { FollowUnfollowComponent } from '../FollowUnfollowComponent';

const props = {
  authorId: 2,
  username: 'username',
  loggedInUser: {
    isAuthenticated: true,
  }
};

const renderFollowUnfollow = (args) => {
  const defaultProps = {
    isAuthenticated: true,
    loggedInUser: true,
    followAuthor: jest.fn(),
    clearFollowing: jest.fn(),
    unfollowAuthor: jest.fn(),
    getFollowing: jest.fn(),
    handleClick: jest.fn(),
    following: {
      map: jest.fn(),
    },
    history: {
      push: jest.fn(),
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<FollowUnfollowComponent {...props} />);
};

const wrapper = renderFollowUnfollow(props);
const wrapper2 = renderFollowUnfollow({
  loggedInUser: {
    isAuthenticated: false,
  }
});

describe('Test FollowUnfollow Component...', () => {
  it('Should render FollowUnfollow component', () => {
    wrapper.setProps({ following: mockData.following });
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.Follow__button').length).toBe(1);
    wrapper.instance().UNSAFE_componentWillUnmount();
  });

  it('Should update the state when the button is clicked...', () => {
    const callbackFN = jest.fn().mockImplementation(() => undefined);
    const instance = wrapper.instance();
    instance.handleClick = callbackFN;
    const FollowButton = wrapper.find('.button');
    FollowButton.simulate('click');
    const updateButtonState = instance.handleClick();
    expect(updateButtonState).toBe(undefined);
    expect(callbackFN).toHaveBeenCalledTimes(1);
  });
  it('Should redirect you to login page when you are not authenticated', () => {
    const callbackFN = jest.fn().mockImplementation(() => undefined);
    const instance = wrapper2.instance();
    instance.handleClick = callbackFN;
    const FollowButton = wrapper2.find('.button');
    FollowButton.simulate('click');
    const updateButtonState = instance.handleClick();
    expect(updateButtonState).toBe(undefined);
    expect(callbackFN).toHaveBeenCalledTimes(1);
  });
});
