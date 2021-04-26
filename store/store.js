import { createStore, applyMiddleware } from 'redux';
import authReducer from './reducers/reducer';
import createSagaMiddleware from "redux-saga";
import authSaga from './Sagas/authenticationSaga'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(authReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(authSaga)

export default store;
