/* eslint-disable import/named */
import React from 'react';
import { shallow } from 'enzyme';
import ShareArticle from './ShareArticleComponent';

const Wrapper = shallow(<ShareArticle />);

describe('Sharing Article Component Tests', () => {
  it('should render the component', () => {
    expect(Wrapper.exists()).toBe(true);
  });
  it('should find number of available button in the component', () => {
    expect(Wrapper.find('.share-article__btn').length).toEqual(3);
  });
});
