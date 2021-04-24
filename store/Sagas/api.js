import {takeLatest, takeEvery, delay, put, call} from "redux-saga/effects";
import {loginUserSuccess} from "../actions/logInActions"
import {fetchlogin} from "../../api/api"

const loginUrl = "https://pl-super-kitchen-staging.herokuapp.com/api/v1/users/sessions"


async function submitToServer(data) {
    try {
        let response = await fetch(loginUrl,
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

function* processUser(action) {
    try {
        const result = yield call(submitToServer, {
            user: {
              email: action.payload.user,
              password: action.payload.password
            }
          })
        yield put(loginUserSuccess(result.data))
        
    } catch (error) {
        console.error(error);
    }
}
         

export default function *apiSaga(){
    yield takeEvery('USER_LOGIN', processUser);
};
