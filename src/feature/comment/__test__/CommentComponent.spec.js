import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMemoryHistory } from 'history';
import CommentComponent from '../CommentComponent';
import ConfirmAlert from '../ConfirmAlert';
import stores from './mockData';

Enzyme.configure({ Adapter: new Adapter() });
const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);
const history = createMemoryHistory('articles/');

const store1 = mockStore(stores.store1);
const store2 = mockStore(stores.store2);
const store3 = mockStore(stores.store3);

const wrapper1 = mount(
  <CommentComponent history={history} store={store1} />
);
const wrapper2 = mount(
  <CommentComponent history={history} store={store2} />
);
const wrapper3 = mount(
  <CommentComponent location={{ pathname: '/' }} history={history} store={store3} />
);

describe('<ConfirmAlert />', () => {
  it('Should render <ConfirmAlert>', async () => {
    const commentDelete = jest.fn();
    const onClose = jest.fn();
    const wrapConfirmAlert = mount(
      <ConfirmAlert
        commentDelete={commentDelete}
        onClose={onClose}
      />
    );
    expect(wrapConfirmAlert.length).toBe(1);
    const btn = wrapConfirmAlert.find('button').at(1);
    btn.simulate('click');
    expect(btn.text()).toBe('Delete');
  });
});

describe('<CommentComponent />', () => {
  it('<CommentComponent /> should render its children', async () => {
    expect(wrapper1.exists()).toBe(true);
    expect(wrapper1).toMatchSnapshot();
  });

  it('Should collapse when clicked on with ', async () => {
    const writeCommentDiv = wrapper1
      .find('.comments-thread__wrapper__input__commentator');
    writeCommentDiv.simulate('click');
    expect(writeCommentDiv.length).toBe(1);
  });

  it('Should close on bur', async () => {
    const writeCommentDiv = wrapper1
      .find('.comments-thread__wrapper__input__publish');
    writeCommentDiv.simulate('blur');
    expect(writeCommentDiv.length).toBe(1);
  });

  it('Should Be able to Write comment', async () => {
    const writeCommentDiv = wrapper1
      .find('textarea');
    writeCommentDiv.simulate('change', {
      target: {
        value: 'c',
      }
    });

    expect(writeCommentDiv.length).toBe(1);
    const checkInput = wrapper1
      .find('.comments-thread__wrapper__input__publish');
    checkInput.simulate('blur');
    expect(checkInput.length).toBe(1);
  });

  it('Should  add a Comment', async () => {
    const commentBtn = wrapper1
      .find('.comments-thread__wrapper__input__publish__btn');
    commentBtn.simulate('click');
    expect(commentBtn.length).toBe(1);
  });

  it('Should update and delete comment', async () => {
    expect(wrapper2.exists()).toBe(true);

    const commentBtn = wrapper2
      .find('.comments-thread__wrapper__input__publish__btn');
    expect(commentBtn.text()).toBe('Comment');

    const update = wrapper2
      .find('.comments-thread__wrapper__fetch__div__commentator__div__img');
    update.map(e => {
      e.simulate('click');
      expect(e.length).toBe(1);
    });

    expect(commentBtn.text()).toBe('Update');
    commentBtn.simulate('click');
    expect(commentBtn.length).toBe(1);
  });

  it('Should read more of comment text', async () => {
    expect(wrapper2.exists()).toBe(true);
    const readMore = wrapper2
      .find('.read-more__btn');
    readMore.simulate('click');
    expect(readMore.length).toBe(1);
    readMore.simulate('click');
    expect(readMore.length).toBe(1);
  });

  it('Should redirect to the login page', async () => {
    expect(wrapper3.exists()).toBe(true);
    const writeCommentDiv = wrapper3
      .find('.comments-thread__wrapper__input__commentator');
    writeCommentDiv.simulate('click');
    expect(writeCommentDiv.length).toBe(1);
  });
});
