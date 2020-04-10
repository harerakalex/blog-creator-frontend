/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../ResetPasswordComponent';

const resetPassword = args => {
  const Token = { match: { params: { token: 'token' } } };
  const initialProps = {
    password: '',
    confirmPassword: '',
    resetPasswordAction: () => {},
    handleSubmit: () => {}
  };
  const props = { ...Token, ...initialProps, ...args };
  return shallow(<ResetPassword {...props} />);
};

let wrapper;

beforeAll(() => {
  wrapper = resetPassword();
  wrapper.instance().onChange = jest.fn();
  wrapper.instance().onChange();
});

describe('Input field tests...', () => {
  it('Should type in the password feild', () => {
    const Password = wrapper.find('input[name="password"]');
    Password.simulate('change', {
      target: { value: 'User1234', name: 'password' },
    });
    expect(wrapper.instance().onChange).toHaveBeenCalled();
  });
});

describe('reset password button test...', () => {
  let instance;
  let sendButton;
  beforeAll(() => {
    instance = wrapper.instance();
    sendButton = wrapper.find('.send');
    sendButton.simulate('click');
  });
  it('Should make a request to the server when you click on the reset button', () => {
    instance.forceUpdate();
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
    };
    instance.onSubmit(event);
  });
});
