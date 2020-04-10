import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import forgotPasswordAction from '../forgotPasswordAction';

const email = 'raymond@gmail.com';
const middleware = [thunk];

const mockStore = configureStore(middleware);

const store = mockStore({});

describe('Forgot password', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('should send a reset password link', async () => {
    moxios.wait(() => {
      const resetPasswordLink = moxios.requests.mostRecent();
      resetPasswordLink.respondWith({
        status: 200,
        response: {
          data: {
            message: 'Email sent, please check your email'
          }
        }
      });
    });
    return store.dispatch(forgotPasswordAction(email)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  it('should throw an error when an email sent is an invalid', () => {
    moxios.wait(() => {
      const resetPasswordLink = moxios.requests.mostRecent();
      resetPasswordLink.respondWith({
        status: 404,
        response: {
          data: {
            error: `User with email: ${email} not found..`
          }
        }
      });
    });
    return store.dispatch(forgotPasswordAction('fddsfa@fdvdf.com')).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
});
