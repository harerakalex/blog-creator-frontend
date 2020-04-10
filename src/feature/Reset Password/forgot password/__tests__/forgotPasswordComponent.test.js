/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPassword } from '../ForgotPasswordComponent';

const forgotPassword = args => {
  const initialProps = {
    email: '',
    forgotPasswordAction: () => {},
    handleSubmit: () => {}
  };
  const props = { ...initialProps, ...args };
  return shallow(<ForgotPassword {...props} />);
};

let wrapper;

beforeAll(() => {
  wrapper = forgotPassword();
  wrapper.instance().onChange = jest.fn();
  wrapper.instance().onChange();
});

describe('Input tests', () => {
  it('Should type in the Email field', () => {
    const Email = wrapper.find('input[name="email"]');
    Email.simulate('change', {
      target: { value: 'raymond@gmail.com', name: 'email' },
    });
    expect(wrapper.state('email')).toEqual('raymond@gmail.com');
  });
});

describe('Send button test', () => {
  let instance;
  let submitButton;
  beforeAll(() => {
    instance = wrapper.instance();
    submitButton = wrapper.find('.send');
    submitButton.simulate('click');
  });
  it('Should make a request to the server', () => {
    instance.forceUpdate();
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
    };
    instance.onSubmit(event);
  });
});
