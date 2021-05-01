import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/reducer';
import authSaga from './Sagas/authenticationSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(authReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(authSaga);

export default store;
