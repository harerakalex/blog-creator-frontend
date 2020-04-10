import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import resetPasswordAction from '../resetPasswordAction';


const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});
const newPassword = 'User1234!';
const confirmPassword = 'User1234!';
const incorrectPassword = 'User12';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCw4a3TNYWyzE3Mjtd4hmBDLln1P8vnFGUtI4CWoX-4ckQ';

describe('Reset password', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('Should reset password of the user up on valid data', async () => {
    moxios.wait(() => {
      const resetPassword = moxios.requests.mostRecent();
      resetPassword.respondWith({
        status: 200,
        response: {
          data: {
            message: 'You have reset your password Successfully!'
          }
        }
      });
    });
    return store.dispatch(resetPasswordAction(newPassword, confirmPassword, token)).then(() => {
      expect(store.getActions().length).toEqual(1);
    });
  });
  it('Should return error if user tries to reset password with invalid password', () => {
    moxios.wait(() => {
      const resetPassword = moxios.requests.mostRecent();
      resetPassword.respondWith({
        status: 400,
        response: {
          data: {
            error: 'Password must be at least 8 characters with at least a number, Upper and lower cases special character'
          }
        }
      });
    });
    return store
      .dispatch(resetPasswordAction(incorrectPassword, confirmPassword, token)).then(() => {
        expect(store.getActions().length).toEqual(1);
      });
  });
});
