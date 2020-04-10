/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import sinon from 'sinon';
import NavBarComponent, { Navbar } from '../NavBar';
import { document } from '../../../__mocks__/windowEvent';
import store from '../../store/index';

let url = null;
const renderNAvbar = (args) => {
  const defaultProps = {
    currentUser: {
      isAuthenticated: true,
      user: { username: 'carlos' }
    },
    login: jest.fn(),
    social: jest.fn(),
    profile: {
      profile: jest.fn(),
    },
    retrieveProfile: jest.fn(),
    search:
    {
      includes: jest.fn()
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<Navbar {...props} />);
};

const wrapper = renderNAvbar();
describe('Render the Nav Bar', () => {
  it('Should render successfully', async () => {
    sinon.stub(window.location, 'replace');
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper).toHaveLength(1);
  });
});

describe('Render the Nav Bar', () => {
  beforeAll(() => {
    global.window = Object.create(window);
    url = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlcmljLm1hbGFiYTZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJ1c2VybmFtZSI6IkVyaWM2IiwiaWF0IjoxNTcxMjA1MTYyLCJleHAiOjE1NzEyOTE1NjJ9.ZdMucW9PC4K9PLJKX1G7cnWyHA2ihGfcBqhRT1-q4Co#';
    Object.defineProperty(window, 'location', {
      value: { href: url },
      writable: true,

    });
  });
  it('Should render successfully', async () => {
    expect(window.location.href).toEqual(url);
  });
  it('should test eventListerner on menu display', () => {
    const button = wrapper.find('.nav-user-image');
    button.simulate('click', {});
    document.event({
      name: 'click',
      target: {
        parentNode: { classList: { contains: jest.fn(() => false) } },
        classList: { contains: jest.fn(() => false) }
      }
    });
    expect(wrapper).toHaveLength(1);
  });
  it('should test eventListerner on nitification dropdown', () => {
    const button = wrapper.find('.nav-user-notification');
    button.simulate('click', {});
    document.event({
      name: 'click',
      target: {
        parentNode: { classList: { contains: jest.fn(() => false) } },
        classList: { contains: jest.fn(() => false) }
      }
    });
    expect(wrapper).toHaveLength(1);
  });
});
describe('Testing connecting component to the store', () => {
  const Wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <NavBarComponent />
      </MemoryRouter>
    </Provider>
  );
  it('should render the component that is connected to the store', () => {
    expect(Wrapper.exists()).toBe(true);
  });
});
