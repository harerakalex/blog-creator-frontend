/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import LoginComponent, { Login } from '../LoginComponent';

// import store from '../../../../app/store/index';
// import Social from '../SocialComponent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

const renderLogin = (args) => {
  const defaultProps = {
    isAuthenticated: true,
    login: jest.fn(),
    social: jest.fn(),
    history: {
      push: jest.fn(),
    },
  };
  const props = { ...defaultProps, ...args };
  store = mockStore({ ...props });
  return shallow(<Login {...props} />);
};

const wrapper = renderLogin();

describe('Test Login Component...', () => {
  it('Should render login component', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('Should give initial state', () => {
    expect(wrapper.state()).toBeDefined();
  });
  it('should update props', () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper).toHaveLength(1);
  });
  it('should update props', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper).toHaveLength(1);
  });
});

describe('Input tests...', () => {
  it('Should type in the Email field', () => {
    const Email = wrapper.find('input[name="email"]');
    Email.simulate('change', {
      target: { value: 'carlos@gmail.com', name: 'email' },
    });
    expect(wrapper.state('email')).toEqual('carlos@gmail.com');
  });
  it('Should type in the password feild', () => {
    const Password = wrapper.find('input[name="password"]');
    Password.simulate('change', {
      target: { value: 'User1234', name: 'password' },
    });
    expect(wrapper.state('password')).toEqual('User1234');
  });
});


describe('Submit button test...', () => {
  let instance;
  let submitButton;
  beforeAll(() => {
    instance = wrapper.instance();
    submitButton = wrapper.find('.loginBtn');
    submitButton.simulate('click');
  });
  it('Should make a request to the server', () => {
    instance.forceUpdate();
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
    };
    instance.handleSubmit(event);
  });
});

describe('Testing connecting component to the store', () => {
  const Wrapper = mount(
    <Provider store={store}>
      <LoginComponent />
    </Provider>
  );
  it('should render the component that is connected to the store', () => {
    expect(Wrapper.exists()).toBe(true);
  });
});
