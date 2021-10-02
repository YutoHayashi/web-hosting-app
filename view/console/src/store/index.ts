import { createStore } from 'redux';
import { Action } from 'redux';
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as IAMReducer } from './iam';
const reducer = combineReducers( {
    iam: IAMReducer,
} )
export const store = createStore( reducer, applyMiddleware( thunk ) );
