import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers'

const initialState = {}
const middleware = [thunk, createLogger()]

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware))
// store.subscribe(()=>{
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// })

export default store;