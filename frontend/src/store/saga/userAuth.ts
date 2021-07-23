import { takeLatest, delay, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import actionTypes from '../actionTypes';
import { requestUserSuccess, requestUserFailure } from '../actions/userActions';
import { setLocalStorageTokens, clearLocalStorage } from '../../utils/tokensHelper';
import { LOGIN_ROUTE } from '../../utils/routesConstants';
import { navigateTo } from '../../utils/history';
import { loginUsers, signUpUsers } from '../../services/authServices';

interface FetchUserActionType {
  type: String;
  payload: {
    name: string;
    email: string;
    password: string;
    isRegister: boolean;
  };
}

function* fetchUserAsync(action: FetchUserActionType) {
  try {
    const {
      payload: { name, email, password, isRegister },
    } = action;

    let data: any = null;

    if (isRegister) {
      data = yield call(signUpUsers, name, email, password);
    } else {
      data = yield call(loginUsers, email, password);
    }

    setLocalStorageTokens({
      email: data.email,
      accessToken: data.id,
    });

    navigateTo('/drive/root');

    yield put(requestUserSuccess(data.email, data.accessToken));

    toast.success('Logged In Successfully');
  } catch (error) {
    console.log(error);

    toast.success(error?.message || error?.error || error);

    yield put(requestUserFailure());
  }
}

export function* logout() {
  try {
    yield delay(1000); // This is to save multiple requests as saga offers debounce functionality out of the box

    // To understand debounce functionality Hit logout button multiple times withing 1 second and this console will be only printed once
    console.log('Logout Request');

    clearLocalStorage();

    navigateTo(LOGIN_ROUTE);

    toast.success('Logged Out Successfully');
  } catch (error) {
    console.log(error);
  }
}

export default [takeLatest(actionTypes.USER_REQUEST, fetchUserAsync), takeLatest(actionTypes.LOGOUT, logout)];
