/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import FollowList, { FollowListComponent } from '../FollowListComponent';
import store from '../../../app/store/index';

const renderComponent = (args) => {
  const defaultProps = {
    isAuthenticated: true,
    modalIsOpen: false,
    openModal: jest.fn(),
    params: { userName: 'someone' },
    lists: [],
    type: '',
    followList: {
      followers: [],
      followingList: [],
    },
    getFollowers: jest.fn(),
    getFollingList: jest.fn(),
    clearFollowing: jest.fn(),
    clearFollowers: jest.fn(),
    clearFollowingList: jest.fn()
  };
  const props = { ...defaultProps, ...args };
  return shallow(<FollowListComponent {...props} />);
};

const Wrapper = renderComponent();
const div = Wrapper.find('div');
const btn = Wrapper.find('button');

describe('FollowListComponent Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find div of this component', () => {
    expect(div.length).toEqual(1);
  });
  it('should update props', () => {
    Wrapper.setProps({ isAuthenticated: false });
    expect(Wrapper).toHaveLength(1);
  });
  it('should update props', () => {
    Wrapper.setProps({ params: { userName: 'carlos' } });
    expect(Wrapper).toHaveLength(1);
  });

  it('should Open Modal', () => {
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().openModal = myFun;
    btn.at(0).simulate('click');
    const updateState = instance.openModal([2], 'followers');
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(2);
  });
  it('should Open Modal', () => {
    const myFun = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().openModal = myFun;
    btn.at(1).simulate('click');
    const updateState = instance.openModal();
    expect(updateState).toBe(undefined);
    expect(myFun).toHaveBeenCalledTimes(2);
  });
});
describe('Testing connection of the component to the store', () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <FollowList />
      </BrowserRouter>
    </Provider>
  );
  it('should render the component that is connected to the store', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
