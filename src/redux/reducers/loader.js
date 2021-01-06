import { createReducer } from 'redux-act';
import * as actions from '../actions';

const initialState = {
  loader: false,
};

const loaderReducer = createReducer({
  [actions.turnOnSpinnerAction]: () => ({
    loader: true,
  }),
  [actions.turnOffSpinnerAction]: () => ({
    loader: false,
  }),
  [actions.userSignedOut]: () => ({
    ...initialState,
  }),
}, initialState);

export default loaderReducer;
