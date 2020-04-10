/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import ConfirmAlertComponent from '../ConfirmAlertComponent';

const renderConfirmAlertComponent = args => {
  const defaultProps = {
    userName: 'jkadhuwa',
    author: { userName: 'jkadhuwa' },
    deleteArticle: jest.fn(),
    onClose: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return mount(<ConfirmAlertComponent {...props} />);
};

const renderConfirmAlert = args => {
  const defaultProps = {
    userName: 'jkadhuwa',
    author: { userName: 'jkadhu' },
    deleteArticle: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return mount(<ConfirmAlertComponent {...props} />);
};

const wrapper = renderConfirmAlertComponent();
const wrongWrapper = renderConfirmAlert();

describe('Article dropdown menu tests', () => {
  it('should test not call deleteArticle action if author', () => {
    wrapper.setProps({ isAuthenticated: true });
    const button = wrapper.find('.btn__delete');
    button.simulate('click');
    wrapper.update();
    expect(wrapper.props().deleteArticle).toHaveBeenCalledTimes(1);
  });
});
describe('Article dropdown menu tests when not owner', () => {
  it('should test not call any handler if not author', () => {
    wrongWrapper.setProps({ isAuthenticated: true });
    const button = wrongWrapper.find('.btn__delete');
    button.simulate('click');
    wrongWrapper.update();
    expect(wrongWrapper.props().deleteArticle).toHaveBeenCalledTimes(0);
  });
});
