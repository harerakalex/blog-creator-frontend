import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import SignUpComponent from '../SignUpComponent';
import store from '../../../../app/store/index';

const Wrapper = mount(
  <Provider store={store}>
    <SignUpComponent />
  </Provider>
);

const input = Wrapper.find('input');
const button = Wrapper.find('button');

describe('SignUp Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should prevent default behavior when submitting the form', () => {
    let prevented = false;
    Wrapper.find('form').simulate('submit', {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
  it('should find all input fields', () => {
    expect(input).toHaveLength(6);
    expect(input.at(0).prop('type')).toEqual('text');
    expect(input.at(1).prop('type')).toEqual('text');
    expect(input.at(2).prop('type')).toEqual('text');
    expect(input.at(3).prop('type')).toEqual('email');
    expect(input.at(4).prop('type')).toEqual('password');
    expect(input.at(5).prop('type')).toEqual('password');
  });
  it('should type in data in the input fields', () => {
    input.at(0).simulate('change', {
      target: { value: 'someone', id: 'firstName' }
    });
    input.at(1).simulate('change', {
      target: { value: 'someone', id: 'lastName' }
    });
    input.at(2).simulate('change', {
      target: { value: 'someone', id: 'userName' }
    });
    input.at(3).simulate('change', {
      target: { value: 'someone@email.com', id: 'email' }
    });
    input.at(4).simulate('change', {
      target: { value: 'secret!12Yes', id: 'password' }
    });
    input.at(5).simulate('change', {
      target: { value: 'secret!12Yes', id: 'confirmPassword' }
    });
  });
  it('should find all buttons', () => {
    expect(button.at(0).text()).toEqual('Sign Up');
  });
  it('should find the type and click on the signup button', () => {
    expect(button.at(0).prop('type')).toEqual('submit');
    button.at(0).simulate('click');
  });
});
