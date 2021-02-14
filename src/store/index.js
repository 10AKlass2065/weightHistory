import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import reducer from '../reducers'

const enhancer = applyMiddleware(thunk);

const store = createStore(reducer, {}, enhancer);

window.store = store

export default store