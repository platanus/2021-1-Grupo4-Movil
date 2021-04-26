export const changeAuthAction = () => ({
  type: 'CHANGE_AUTH',
});

// LOGIN

export const loginUserAction = (data) => ({
    type: 'USER_LOGIN',
    payload: data,
  });

export const loginUserSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data,
});

export const loginUserFailed = (data) => ({
  type: 'LOGIN_FAILED',
  payload: data,
});

// SIGNUP
export const signUpUserAction = (data) => ({
  type: 'USER_SIGN_UP',
  payload: data,
});

export const signUpFailed = (data) => ({
  type: 'SIGN_UP_FAILED',
  payload: data,
});

export const signUpSuccess = (data) => ({
  type: 'SIGN_UP_SUCCESS',
  payload: data,
});
