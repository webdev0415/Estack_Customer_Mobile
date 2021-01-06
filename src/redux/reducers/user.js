import { createReducer } from 'redux-act';
import { setUserAction, userSignedOut, setImageAction } from '../actions';

const initialState = {
  _id: null,
  userId: null,
  email: null,
  imageId: null,
  image: null,
  fullName: null,
  dob: null,
  gender: null,
  notifications: null,
};

const userReducer = createReducer({
  [setUserAction]: (state, payload) => ({
    _id: payload.customer._id,
    userId: payload.customer.userId,
    email: payload.user.auth.email,
    imageId: payload.user.avatarFieldId,
    image: payload.user.image,
    fullName: payload.user.fullName,
    dob: payload.customer.DOB,
    gender: payload.customer.gender,
    notifications: payload.customer.notificationsOn || false,
  }),
  [setImageAction]: (state, payload) => ({
    ...state,
    image: payload,
  }),
  [userSignedOut]: () => ({
    ...initialState
  })
}, initialState);

export default userReducer;
