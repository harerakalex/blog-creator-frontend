const initState = {
  users: []
};

const SignUpReducer = (state = initState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_SUCCESS':
      return {
        ...state,
        users: action.user
      };
    case 'REGISTER_USER_ERROR':
      return state;
    default:
      return state;
  }
};

export default SignUpReducer;
