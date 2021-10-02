import { state as IAMState, action as IAMAction } from './iam';
export type state = IAMState & {};
export type action = ( typeof IAMAction ) & {}
