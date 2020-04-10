import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import mockData from '../../../__mocks__/mockData';
import {
  getFollowing,
  followAuthor,
  unfollowAuthor,
  clearFollowing,
  clearFollowers,
  clearFollowingList,
  getFollowers,
  getFollingList
} from '../followUnfollowAction';
import LocalStorage from '../../../__mocks__/localStorage';

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

let storage;
const token = 'Invalid token';
describe('Follow ActionCreator', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  it('should dispatch FOLLOW_AUTHOR_SUCCES action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockData.followSucces
      });
    });
    const expectedAction = [{ payload: mockData.followSucces, type: 'FOLLOW_AUTHOR_SUCCES' }];
    return store.dispatch(followAuthor()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch FOLLOW_AUTHOR_FAIL action when given wrong inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: 'bad request'
      });
    });
    const expectedAction = [{ payload: undefined, type: 'FOLLOW_AUTHOR_FAIL' }];
    return store.dispatch(followAuthor()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});


describe('Unfollow ActionCreator', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  it('should dispatch UNFOLLOW_AUTHOR_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: 'You are no longer following Musinda'
        }
      });
    });
    const expectedAction = [{ payload: undefined, type: 'UNFOLLOW_AUTHOR_SUCCESS' }];
    return store.dispatch(unfollowAuthor()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch UNFOLLOW_AUTHOR_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'UNFOLLOW_AUTHOR_FAIL' }];
    return store.dispatch(unfollowAuthor()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch UNFOLLOW_AUTHOR_FAIL action when given there is no network', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        data: {
          message: 'Network Error',
        }
      });
    });
    const expectedAction = [{ payload: 'Network Error', type: 'UNFOLLOW_AUTHOR_FAIL' }];
    return store.dispatch(unfollowAuthor()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

describe('getFollowing ActionCreator', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  it('should dispatch GET_FOLLOWING_AUTHOR_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWING_AUTHOR_SUCCESS' }];
    return store.dispatch(getFollowing()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch GET_FOLLOWING_AUTHOR_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWING_AUTHOR_FAIL' }];
    return store.dispatch(getFollowing()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch CLEAR_FOLLOW action everytime you go to another page', () => {
    store.dispatch(clearFollowing());
    const expectedAction = [{ payload: undefined, type: 'CLEAR_FOLLOW' }];
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
describe('getFollowers ActionCreator', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  it('should dispatch GET_FOLLOWERS_AUTHOR_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWERS_AUTHOR_SUCCESS' }];
    return store.dispatch(getFollowers()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch GET_FOLLOWERS_AUTHOR_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWERS_AUTHOR_FAIL' }];
    return store.dispatch(getFollowers()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch CLEAR_FOLLOWERS action everytime you go to another page', () => {
    store.dispatch(clearFollowers());
    const expectedAction = [{ payload: undefined, type: 'CLEAR_FOLLOWERS' }];
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
describe('getFollowers ActionCreator', () => {
  beforeEach(() => {
    moxios.install(axios);
    storage = window.localStorage.setItem('token', token);
    window.localStorage = new LocalStorage();
  });
  afterEach(() => {
    moxios.uninstall(axios);
    store.clearActions();
    window.localStorage = storage;
  });
  it('should dispatch GET_FOLLOWINGLIST_SUCCESS action when given correct inputs', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200
      });
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWINGLIST_SUCCESS' }];
    return store.dispatch(getFollingList()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch GET_FOLLOWERS_AUTHOR_FAIL action when given inputs are wrong', () => {
    const expected = {
      data: {
        error: 'Bad request',
      },
    };
    moxios.stubRequest(/.*/, {
      status: 400,
      response: expected,
    });
    const expectedAction = [{ payload: undefined, type: 'GET_FOLLOWINGLIST_FAIL' }];
    return store.dispatch(getFollingList()).then(() => {
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should dispatch CLEAR_FOLLOWING_LIST action everytime you go to another page', () => {
    store.dispatch(clearFollowingList());
    const expectedAction = [{ payload: undefined, type: 'CLEAR_FOLLOWING_LIST' }];
    expect(store.getActions().length).toEqual(1);
    expect(store.getActions()).toEqual(expectedAction);
  });
});
