import store from '.';

describe('redux-store', () => {
  it('should return the initial state', () => {
    expect(store.getState()).toBeDefined();
  });
});
