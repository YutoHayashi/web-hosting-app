import { state as IAMState } from './iam/state';
import * as Types from './types';
export const RootState: Types.RootState = {
    ...IAMState,
};
