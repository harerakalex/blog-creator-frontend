/* eslint-disable react/jsx-props-no-spreading */
import { shallow } from 'enzyme';
import React from 'react';
import { SearchResult } from '../SearchResult';
import dummyData from '../../../../__mocks__/mockData';


const renderSearchResult = (args) => {
  const defaultProps = {
    articles: [],
    results: {
      articles: [dummyData.returnedArticle]
    },
  };
  const props = { ...defaultProps, ...args };
  return shallow(<SearchResult {...props} />);
};

const wrapper = renderSearchResult();

describe('Test Search result...', () => {
  it('Should render search result', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('Should return result list', () => {
    wrapper.setProps({ articles: {} });
    expect(wrapper).toHaveLength(1);
  });
});
