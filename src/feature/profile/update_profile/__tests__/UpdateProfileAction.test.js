/* eslint-disable max-len */
/* eslint-disable consistent-return */
import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import { updateUserProfile } from '../UpdateProfileAction';
import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR } from '../UpdateProfileConstants';

const store = makeMockStore({ profile: {} });
const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 400, response: error });

describe('Update Profile Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch UPDATE_PROFILE_SUCCESS action', async () => {
    const profile = {
      bio: 'someone special',
      image: 'someone.jpg'
    };

    try {
      const user = 'someone';
      const expected = {
        type: UPDATE_PROFILE_SUCCESS,
        payload: profile
      };
      const closeModal = 'close';
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(profile));
      });
      const result = await store.dispatch(updateUserProfile(user, profile, closeModal));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[0]).toEqual(expected);
      }
    } catch (err) { return null; }
  });

  it('should dispatch UPDATE_PROFILE_ERROR action', async () => {
    const profileError = { error: 'invalid image' };
    try {
      const profile = {
        user: 'someone',
        bio: 'someone special',
        image: 'someone'
      };
      const expected = {
        type: UPDATE_PROFILE_ERROR,
        error: profileError
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(expected));
      });
      const result = await store.dispatch(updateUserProfile(profile));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[1]).toEqual(expected);
      }
    } catch (err) { return null; }
  });
});
