import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from '../constants/userConstants';

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REGISTER_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      break;
  }
};
