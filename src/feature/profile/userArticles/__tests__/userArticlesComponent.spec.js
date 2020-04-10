/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history';
import UserArtcileComponent, { UserArticles } from '../userArticlesComponent';
import stores from '../mockData';

Enzyme.configure({ Adapter: new Adapter() });
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const history = createMemoryHistory('articles/');

const store1 = mockStore(stores.store1);

const renderComponent = (args) => {
  const defaultProps = {
    articles: [{
      id: 1,
      slug: 'slug',
      description: 'desc',
    }],
    getArticles: jest.fn(),
    params: { userName: 'someone' }
  };
  const props = { ...defaultProps, ...args };
  return shallow(<UserArticles {...props} />);
};

const wrapper2 = renderComponent();

describe('<UserArtcileComponent />', () => {
  it('should update the component the componet', () => {
    wrapper2.setProps({ params: { userName: 'carlos' } });
    expect(wrapper2).toHaveLength(1);
  });
});

const wrapper1 = mount(
  <UserArtcileComponent history={history} store={store1} />
);

describe('<UserArtcileComponent />', () => {
  it('should render its children', async () => {
    expect(wrapper1.exists()).toBe(true);
    expect(wrapper1).toMatchSnapshot();
  });
  it('Should redirect to view single Article', async () => {
    const article = wrapper1
      .find('.user-articles-thread__div');
    article.simulate('click');
    expect(article.length).toBe(1);
  });
});
