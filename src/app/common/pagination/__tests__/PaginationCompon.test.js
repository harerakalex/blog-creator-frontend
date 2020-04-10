/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { PaginationComonent } from '../PaginationComonent';

const renderPagination = (args) => {
  const defaultProps = {
    getAllArticles: jest.fn(),
    activePage: 1,
    articleNumbers: 10,
  };
  const props = { ...defaultProps, ...args };
  return mount(<PaginationComonent {...props} />);
};

const Wrapper = renderPagination();
const div = Wrapper.find('div');
const li = Wrapper.find('li');

describe('Pagination Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find number of divs in pagination component', () => {
    expect(div.length).toEqual(2);
  });
  it('should find number of li in pagination component', () => {
    expect(li.length).toEqual(1);
  });
  it('should invoke handlePageChange function', () => {
    const paginator = jest.fn().mockImplementation(() => undefined);
    const instance = Wrapper.instance();
    Wrapper.instance().handlePageChange = paginator;
    li.at(0).simulate('click');
    const updateState = instance.handlePageChange(1);
    expect(updateState).toBe(undefined);
    expect(paginator).toHaveBeenCalledTimes(1);
  });
});
