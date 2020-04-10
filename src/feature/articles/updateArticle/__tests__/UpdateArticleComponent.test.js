/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { UpdateArticle } from '../UpdateArticleComponent';
import dummyData from '../../../../__mocks__/mockData';

const renderUpdateArticle = args => {
  const initialProps = {
    slug: 'hereuntiltheend',
    article: {},
    match: {
      params: {
        slug: 'andela kigali'
      }
    },
    getData: () => {},
    createArticle: () => {},
    handleSubmit: () => {},
    GetSingleArticle: () => {}
  };
  const props = { ...initialProps, ...args };
  return shallow(<UpdateArticle {...props} />);
};

describe('Update Article Component Tests', () => {
  const wrapper = renderUpdateArticle();
  it('Should render a form inputs', () => {
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.find('div').length).toBe(7);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('button').text()).toBe('Update');
  });
  it('Should render the Editor', () => {
    const CKEditor = wrapper.find('.input__body');
    expect(CKEditor.length).toBe(1);
  });

  it('Should insert into title field', () => {
    const title = wrapper.find('input[name="title"]');
    title.simulate('change', {
      target: {
        value: 'Andela the best place to work in africa',
        name: 'title'
      }
    });
    expect(wrapper.state('title')).toEqual(
      'Andela the best place to work in africa'
    );
  });
  it('Should load the updated article', () => {
    window.location.assign = jest.fn();
    wrapper.setProps({ updated: true });
    expect(window.location.assign).toBeCalledWith(
      `/articles/${wrapper.props.slug}`
    );
  });

  it('Should make post request to the server', () => {
    const button = wrapper.find('button');
    button.simulate('click', { preventDefault: jest.fn() });
  });
  it('should prevent default behavior when submitting the form', () => {
    let prevented = false;
    wrapper.find('.btn__create').simulate('click', {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
});
