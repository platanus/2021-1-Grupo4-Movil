import {takeLatest, takeEvery, delay, put, call} from "redux-saga/effects";
import {loginUserSuccess , loginUserFailed, signUpFailed, signUpSuccess} from "../actions/logInActions"
// import {postAuth} from '../../api/api'

const loginUrl = "https://pl-super-kitchen-staging.herokuapp.com/api/v1/users/sessions";
const signUpUrl = "https://pl-super-kitchen-staging.herokuapp.com/api/v1/users/registrations";

// mover esta función a api
async function postAuth(data, url) {
    try {
        let response = await fetch(url,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(data)
            })
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);   
    }  
}



function* processLogIn(action) {
    try {
        const result = yield call(postAuth, {
            user: {
              email: action.payload.user,
              password: action.payload.password
            }
          }, loginUrl)
        if (result.message) {
            yield put(loginUserFailed(result.message))  
        } else {
            yield put(loginUserSuccess(result.data))   
        }
    } catch (error) {
        console.error(error);
    }
}

function* processSignUp(action) {
    try {
        const result = yield call(postAuth, {
            user: {
              email: action.payload.user,
              password: action.payload.password
            }
          }, signUpUrl)
        if (result.message) {
            yield put(signUpFailed(result.message))  
        } else {
            yield put(signUpSuccess(result.data))   
        }
    } catch (error) {
        console.error(error);
    }
}

export default function *authSaga(){
    yield takeEvery('USER_LOGIN', processLogIn);
    yield takeEvery('USER_SIGN_UP', processSignUp)
};
