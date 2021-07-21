import * as ApiService from './apiService';

export function loginUsers(email: string, password: string) {
  const APIObj = {
    endPoint: `/user/${email}/${password}`,
    authenticationRequired: false,
  };

  return ApiService.callApi(APIObj);
}
