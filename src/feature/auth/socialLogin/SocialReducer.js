import * as actionTypes from './SocialActionTypes';

const initialState = {
  user: {},
  success: false,
  isAuthenticated: false,
};
const social = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL:
      return {
        error: action.error
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        user: action.user,
        success: true,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default social;
