import jwt from 'jwt-decode';

export default () => {
  try {
    const { token } = localStorage;
    const user = jwt(token);
    return {
      user,
      isAuthenticated: true,
    };
  } catch (error) {
    return {
      user: {},
      isAuthenticated: false,
    };
  }
};
