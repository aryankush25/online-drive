import * as ApiService from './apiService';

export function loginUsers(email: string, password: string) {
  const APIObj = {
    endPoint: `/user/${email}/${password}`,
    authenticationRequired: false,
  };

  return ApiService.callApi(APIObj);
}

export function signUpUsers(name: string, email: string, password: string) {
  const APIObj = {
    endPoint: `/user`,
    authenticationRequired: false,
    method: 'POST',
    body: {
      name,
      email,
      password,
    },
  };

  return ApiService.callApi(APIObj);
}
