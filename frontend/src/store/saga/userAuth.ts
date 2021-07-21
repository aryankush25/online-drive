import { takeLatest, delay, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import actionTypes from '../actionTypes';
import { requestUserSuccess, requestUserFailure } from '../actions/userActions';
import { setLocalStorageTokens, clearLocalStorage } from '../../utils/tokensHelper';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../utils/routesConstants';
import { navigateTo } from '../../utils/history';
import { loginUsers } from '../../services/authServices';

interface FetchUserActionType {
  type: String;
  payload: {
    email: string;
    password: string;
  };
}

function* fetchUserAsync(action: FetchUserActionType) {
  try {
    const {
      payload: { email, password },
    } = action;

    const data = yield call(loginUsers, email, password);

    console.log('#### response', data);

    setLocalStorageTokens({
      email: data.email,
      accessToken: data.id,
    });

    navigateTo(HOME_ROUTE);

    yield put(requestUserSuccess(data.email, data.accessToken));

    toast.success('Logged In Successfully');
  } catch (error) {
    console.log(error);
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
