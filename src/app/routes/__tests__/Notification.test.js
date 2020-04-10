/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/named */
import React from 'react';
import { shallow } from 'enzyme';
import NotificationComponent from '../NotificationDropDown';

const renderDropDown = (args) => {
  const props = { ...args };
  return shallow(<NotificationComponent {...props} />);
};

const Wrapper = renderDropDown();
const div = Wrapper.find('div');

describe('Notification Dropdown tests ', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find number of div in this component', () => {
    expect(div.length).toEqual(1);
  });
});
