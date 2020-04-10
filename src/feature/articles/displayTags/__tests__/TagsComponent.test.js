import React from 'react';
import { shallow } from 'enzyme';
import TagsComponent from '../TagsComponent';

const renderTags = args => {
  const initialProps = {
    tags: ''
  };

  const props = { ...initialProps, ...args };
  return shallow(<TagsComponent {...props} />);
};
const wrapper = renderTags();
describe('Should render all tags', () => {
  it('Should render no buttons', () => {
    expect(wrapper.find('button').length).toBe(0);
  });
  it('Should render 2 buttons', () => {
    wrapper.setProps({ tags: ['here', 'there'] });
    expect(wrapper.find('button').length).toBe(2);
  });
});
