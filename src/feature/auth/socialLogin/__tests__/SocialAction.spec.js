import configureMockStore from 'redux-mock-store';
import dotenv from 'dotenv';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import {
  social, authFail, authUser
} from '../SocialAction';
import * as actionTypes from '../SocialActionTypes';

dotenv.config();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  username: 'Eric6',
  role: 'user',
  email: 'eric.malaba6@gmail.com',
  exp: 1571291562,
  iat: 1571205162,
  id: 2
};

describe('Should create an action', () => {
  beforeAll(() => {
    sinon.stub(window.location, 'replace');
  });
  it('Should test LOGIN_SUCCESS type', () => {
    const source = '?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlcmljLm1hbGFiYTZAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJ1c2VybmFtZSI6IkVyaWM2IiwiaWF0IjoxNTcxMjA1MTYyLCJleHAiOjE1NzEyOTE1NjJ9.ZdMucW9PC4K9PLJKX1G7cnWyHA2ihGfcBqhRT1-q4Co#';
    delete window.location;
    window.location = { search: source };
    const action = [{
      type: actionTypes.LOGIN_SUCCESS,
      user,
    }];
    const store = mockStore({});
    const url = window.location.search;
    store.dispatch(authUser(url));
    expect(store.getActions()).toEqual(action);
    expect(store.getActions()).toMatchSnapshot();
  });
  it('Should test LOGIN_FAIL type', () => {
    const store = mockStore({});
    store.dispatch(authFail('something went wrong'));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('Should return error upon invalid login', () => {
    const source = '?token=';
    delete window.location;
    window.location = { search: source };
    const store = mockStore({});
    store.dispatch(authUser(source));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('Should return error upon invalid login', () => {
    const source = 1;
    delete window.location;
    window.location = { search: source };
    const store = mockStore({});
    store.dispatch(social(source));
    expect(store.getActions()[0].type).toEqual('LOGIN_FAIL');
  });
});
