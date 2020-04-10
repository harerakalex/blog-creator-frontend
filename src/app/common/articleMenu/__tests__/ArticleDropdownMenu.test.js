/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ArticleDropdownComponent, {
  ArticleDropdownMenu
} from '../ArticleDropdownMenu';
import store from '../../../store/index';

const renderArticleDropdownMenu = args => {
  const defaultProps = {
    userName: 'jkadhuwa',
    author: { userName: 'jkadhuwa' },
    confirmDelete: jest.fn(),
    checkUser: jest.fn(),
    confirmAlert: jest.fn(() => {}),
    deleteArticle: jest.fn(),
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
  const props = { ...defaultProps, ...args };
  return shallow(<ArticleDropdownMenu {...props} />);
};

const wrapper = renderArticleDropdownMenu();

describe('Article dropdown menu tests', () => {
  it('should test not call any handler if not authenticated', () => {
    wrapper.setProps({ isAuthenticated: false });
    const button = wrapper.find('li').at(1);
    button.simulate('click');
    wrapper.update();

    expect(wrapper.instance().props.confirmDelete).toHaveBeenCalledTimes(0);
  });
  it('should test call confirmDelete if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    const button = wrapper.find('li').at(1);
    const mockedFunction = jest.fn().mockImplementation(() => undefined);
    const instance = wrapper.instance();
    wrapper.instance().checkUser = mockedFunction;
    button.simulate('click');
    const updateState = instance.checkUser();
    expect(updateState).toBe(undefined);
    expect(mockedFunction).toHaveBeenCalledTimes(1);
  });
});

describe('Testing connecting component to the store', () => {
  const connectedWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ArticleDropdownComponent />
      </MemoryRouter>
    </Provider>
  );
  it('should render the component that is connected to the store', () => {
    expect(connectedWrapper.exists()).toBe(true);
  });
});
