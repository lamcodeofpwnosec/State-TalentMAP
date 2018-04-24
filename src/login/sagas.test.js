import { expectSaga } from 'redux-saga-test-plan';
import MockAdapter from 'axios-mock-adapter';
import api from '../api';
import loginWatcher, { getError, requests } from './sagas';

const mocks = {
  token: {
    token: '12345',
  },
};

// Change env variable and reset module context
const setAuthMode = (mode = 'basic') => {
  process.env.LOGIN_MODE = mode;
  jest.resetModules();
};

describe('login functions', () => {
  it('can set the client upon providing a valid token (SAML Auth)', () => {
    const mockAdapter = new MockAdapter(api);

    setAuthMode('saml');

    mockAdapter
      .onGet('/profile/')
      .reply(200, mocks.token);

    return expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_SET', token: '12345' })
      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'TOKEN_VALIDATION_REQUESTING',
        token: '12345',
      })
      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  it('can log in and set the client (LocalStorage Auth)', () => {
    const mockAdapter = new MockAdapter(api);

    setAuthMode('basic');

    mockAdapter
      .onPost('/accounts/token/')
      .reply(200, mocks.token);

    return expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_SET', token: '12345' })
      // Dispatch any actions that the saga will `take`.
      .dispatch({
        type: 'LOGIN_REQUESTING',
        username: 'admin',
        password: 'admin',
      })
      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  it('can log out and unset the client', () =>
    expectSaga(loginWatcher)
      // Assert that the `put` will eventually happen.
      .put({ type: 'CLIENT_UNSET' })
      // Dispatch any actions that the saga will `take`.
      .dispatch({ type: 'LOGOUT_REQUESTING' })
      // Start the test. Returns a Promise. [silent warnings]
      .silentRun());

  it('can can catch empty login fields', () => {
    const mockAdapter = new MockAdapter(api);

    setAuthMode('basic');

    mockAdapter
      .onPost('/accounts/token/')
      .reply(200, mocks.token);

    return expectSaga(loginWatcher)
      // Dispatch any actions that the saga will `take`.
      .put({ type: 'LOGIN_REQUESTING', username: undefined, password: undefined })
      .put({ type: 'LOGIN_ERROR', message: 'Fields cannot be blank' })
      .dispatch({
        type: 'LOGIN_REQUESTING',
        username: '',
        password: '',
      })
      // Start the test. Returns a Promise. [silent warnings]
      .silentRun();
  });

  it('returns an error callback when calling the saml api function and there is no token', () => {
    const request = requests.saml();
    expect.assertions(1);
    return request.catch(error =>
      expect(error.message).toBe('Token cannot be blank'));
  });

  it('can change the error message', () => {
    const error = getError('error');
    expect(error.message).toBe('error');
  });
});
