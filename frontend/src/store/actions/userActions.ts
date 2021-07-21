import actionTypes from '../actionTypes';

export const requestUserRequest = (email: string, password: string) => {
  return {
    type: actionTypes.USER_REQUEST,
    payload: { email, password },
  };
};

export const requestUserSuccess = (email: string, accessToken: string) => {
  return {
    type: actionTypes.USER_SUCCESS,
    payload: {
      email,
      accessToken,
    },
  };
};

export const requestUserFailure = () => {
  return { type: actionTypes.USER_FAILURE, payload: {} };
};

export const startLogout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
