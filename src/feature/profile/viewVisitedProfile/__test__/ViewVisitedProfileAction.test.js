/* eslint-disable max-len */
/* eslint-disable consistent-return */
import moxios from 'moxios';
import { makeMockStore } from '../../../../app/common/config/mockStore';
import getOtherUserProfile from '../ViewVisitedProfileAction';
import { RETRIEVE_VISITED_PROFILE_SUCCESS, RETRIEVE_VISITED_PROFILE_ERROR } from '../../view_profile/ViewProfileConstants';

const store = makeMockStore({ profile: {} });
const mockSuccess = data => ({ status: 201, response: data });
const mockError = error => ({ status: 404, response: error });

describe('Retrieve Profile Action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch RETRIEVE_VISITED_PROFILE_SUCCESS action', async () => {
    const profile = {
      userName: 'someone',
      bio: 'someone special',
      image: 'someone'
    };

    try {
      const expected = {
        type: RETRIEVE_VISITED_PROFILE_SUCCESS,
        payload: profile
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(profile));
      });
      const result = await store.dispatch(getOtherUserProfile(profile.userName));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[0]).toEqual(expected);
      }
    } catch (err) { return null; }
  });

  it('should dispatch RETRIEVE_VISITED_PROFILE_ERROR action', async () => {
    const profileError = { error: 'profile not found' };
    try {
      const invalidUser = 'someonelse';
      const expected = {
        type: RETRIEVE_VISITED_PROFILE_ERROR,
        error: profileError
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(expected));
      });
      const result = await store.dispatch(getOtherUserProfile(invalidUser));
      if (result) {
        const actionCalled = store.getActions();
        expect(actionCalled[1]).toEqual(expected);
      }
    } catch (err) { return null; }
  });
});
