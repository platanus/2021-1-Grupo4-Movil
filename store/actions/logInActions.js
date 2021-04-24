export const loginUserAction = (data) => ({
    type: 'USER_LOGIN',
    payload: data,
  });

export const loginUserSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data,
});