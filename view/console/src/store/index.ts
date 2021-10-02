import { createStore } from 'redux';
import { Action } from 'redux';
import { combineReducers } from 'redux';
import { reducer as IAMReducer } from './iam';
const reducer = combineReducers( {
    iam: IAMReducer,
} )
export const store = createStore( reducer );
