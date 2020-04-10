/* eslint-disable react/jsx-props-no-spreading */
import { shallow } from 'enzyme';
import React from 'react';
import { Logout } from '../Logout';

const props = {
  logout: jest.fn(),
};

let wrapper;

describe('Test Logout Component...', () => {
  beforeAll(() => {
    wrapper = shallow(<Logout {...props} />);
  });
  it('Should render logout component', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('Should give initial state', () => {
    expect(wrapper.state()).toBeDefined();
  });
});
describe('Click logout button...', () => {
  let instance;
  let logoutButton;
  beforeAll(() => {
    instance = wrapper.instance();
    logoutButton = wrapper.find('.logout');
    logoutButton.simulate('click');
  });
  it('should make a request to the server', () => {
    instance.forceUpdate();
    wrapper.update();
    instance.logOut();
  });
});
