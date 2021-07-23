import actionTypes from '../actionTypes';

export const requestUserRequest = (data: { name: string; email: string; password: string }, isRegister: boolean) => {
  return {
    type: actionTypes.USER_REQUEST,
    payload: { ...data, isRegister },
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
