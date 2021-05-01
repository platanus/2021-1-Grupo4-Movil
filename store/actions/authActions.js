function changeAuthAction() {
  return ({
    type: 'CHANGE_AUTH' });
}
function loginUserAction(data) {
  return ({
    type: 'USER_LOGIN',
    payload: data,
  });
}

// LOGIN

function loginUserSuccess(data) {
  return ({
    type: 'LOGIN_SUCCESS',
    payload: data,
  });
}

function loginUserFailed(data) {
  return ({
    type: 'LOGIN_FAILED',
    payload: data,
  });
}
// SIGNUP
function signUpUserAction(data) {
  return ({
    type: 'USER_SIGN_UP',
    payload: data,
  });
}

function signUpFailed(data) {
  return ({
    type: 'SIGN_UP_FAILED',
    payload: data,
  });
}

function signUpSuccess(data) {
  return ({
    type: 'SIGN_UP_SUCCESS',
    payload: data,
  });
}

export default { changeAuthAction, loginUserAction, loginUserSuccess, loginUserFailed, signUpUserAction, signUpFailed, signUpSuccess };
