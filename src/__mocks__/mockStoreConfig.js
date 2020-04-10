import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import './jwtDecode';

const mockStore = configureStore([thunk]);
const appMockStore = (state = {}) => {
  return mockStore({ ...state });
};

export default appMockStore;
