import jwdDecoded from 'jwt-decode';

const checkToken = () => next => action => {
  if (process.env.NODE_ENV === 'test') {
    return next(action);
  }
  try {
    const decoded = jwdDecoded(localStorage.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      window.location.assign('/login');
      localStorage.token = '';
      localStorage.username = '';
    }
  } catch (error) {
    if (localStorage.token) {
      window.location.assign('/login');
    }
    localStorage.token = '';
    localStorage.username = '';
  }
  return next(action);
};

export default checkToken;
