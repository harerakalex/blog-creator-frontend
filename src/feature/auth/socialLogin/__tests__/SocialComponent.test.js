import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import Social from '../SocialComponent';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const store = mockStore({
  isAuthenticated: false,
  social: jest.fn(),
});
let wrapper;

describe('Test Social login Component', () => {
  beforeAll(() => {
    wrapper = mount(
      <Provider store={store}>
        <Social />
      </Provider>
    );
    sinon.stub(window.location, 'replace');
  });

  it('Should render The google button', async () => {
    const btn = wrapper.find('.social-btn').at(0);
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });
  it('Should render the facebook button', async () => {
    const btn = wrapper.find('.social-btn').at(1);
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });
  it('Should render the twitter button', async () => {
    const btn = wrapper.find('.social-btn').at(2);
    btn.simulate('click');
    expect(btn.length).toBe(1);
  });
});

describe('Should render the buttons', () => {

});
