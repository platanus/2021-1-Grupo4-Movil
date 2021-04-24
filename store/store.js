import { createStore, applyMiddleware } from 'redux';
import loginReducer from './reducers/reducer';
import createSagaMiddleware from "redux-saga";
// import mysaga from './saga'
import apiSaga from './Sagas/api'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(loginReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(apiSaga)

export default store;
