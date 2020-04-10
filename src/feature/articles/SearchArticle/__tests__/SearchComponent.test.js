/* eslint-disable react/jsx-props-no-spreading */
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import Search, { SearchComponent } from '../SearchComponent';
import store from '../../../../app/store/index';


const renderSearch = (args) => {
  const defaultProps = {
    search: jest.fn(),
    results: {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SearchComponent {...props} />);
};

const wrapper = renderSearch();

describe('Test Search Component...', () => {
  it('Should render search component', () => {
    expect(wrapper).toHaveLength(1);
  });
});

describe('Testing search component', () => {
  const Wrapper = mount(
    <Provider store={store}>
      <Search />
    </Provider>
  );
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
});
