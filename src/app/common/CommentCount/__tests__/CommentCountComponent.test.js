
import React from 'react';
import { shallow } from 'enzyme';
import CommentCount from '../CommentCountComponent';

describe('Comment Count Components tests', () => {
  const wrapper = shallow(<CommentCount count={1} />);
  it('Should render tags', () => {
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('span').length).toBe(1);
  });
  it('Should render 1 comment', () => {
    expect(wrapper.text()).toEqual('1 comment');
  });
});
describe('Comment Count Components tests', () => {
  const wrapper = shallow(<CommentCount count={2} />);
  it('Should render 2 comments', () => {
    expect(wrapper.text()).toEqual('2 comments');
  });
});
