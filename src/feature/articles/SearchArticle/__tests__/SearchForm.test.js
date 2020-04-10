/* eslint-disable react/jsx-props-no-spreading */
import { shallow } from 'enzyme';
import React from 'react';
import { SearchForm } from '../SearchForm';


const renderSearchForm = (args) => {
  const defaultProps = {
    onSelect: jest.fn(),
    onChange: jest.fn(),
    onChangeSearch: jest.fn(),
    searchAction: jest.fn()
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SearchForm {...props} />);
};

const wrapper = renderSearchForm();

describe('Test Search Form...', () => {
  it('Should render search form', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('Should type in search box and search for that query', () => {
    const Query = wrapper.find('input[name="search"]');
    Query.simulate('change', {
      target: { value: 'carlos', name: 'search' },
    });
    expect(wrapper.state('query')).toEqual('carlos');
  });
  it('Should type in search box but not send request', () => {
    const Query = wrapper.find('input[name="search"]');
    Query.simulate('change', {
      target: { value: 'ca', name: 'search' },
    });
    expect(wrapper.state('query')).toEqual('ca');
  });
  it('Should select any other option', () => {
    const Keyword = wrapper.find('select');
    Keyword.simulate('change', {
      target: { value: 'carlos' },
    });
    expect(wrapper.state('keyword')).toEqual('carlos');
  });
});

describe('Submit button test...', () => {
  let instance;
  let submitButton;
  beforeAll(() => {
    instance = wrapper.instance();
    submitButton = wrapper.find('input[name="search"]');
    submitButton.simulate('click').simulate('keyDown', { keyCode: 13 });
  });
  it('Should make a request to the server', () => {
    instance.forceUpdate();
    wrapper.update();
    const event = {
      preventDefault: jest.fn(),
    };
    instance.onSearch(event);
  });
});
