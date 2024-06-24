import { takeLatest, put, call } from "redux-saga/effects";
import { api } from "../../api/AxiosInstall";
import { typeActionLogins } from "../auth/login/actions";
import { typeActionAllUser } from "../auth/getAllUser/actions";
import { typeActionDeleteUser } from "../auth/deleteUser/actions";
import { typeActionRefreshToken } from "../refreshToken/actions";

function* fetchLogin(action) {
  try {
    const res = yield call(api.loginUser, action.payload);
    yield put(typeActionLogins.fetchSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(typeActionLogins.fetchFailed(error));
  }
}

function* fetchAllUser(action) {
  try {
    const { accessToken, page, size, role } = action.payload;
    const res = yield call(api.getUser, accessToken, page, size, role);
    if (res.data) {
      yield put(typeActionAllUser.fetchAllUserSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    yield put(typeActionAllUser.fetchAllUserFailed(error));
  }
}

function* fetchDeleteUser(action) {
  try {
    const { accessToken, id } = action.payload;
    const res = yield call(api.deleteUSer, accessToken, id);
    if (res?.data) {
      yield put(typeActionDeleteUser.fetchDeleteUserSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
    yield put(
      typeActionDeleteUser.fetchDeleteUserFailed(error?.response?.data)
    );
  }
}

function* fetchLogoutUser(action) {
  try {
    const res = yield call(api.logoutUser, action.payload);
    yield put(typeActionLogins.fetchLogoutSuccess(res.data));
  } catch (error) {
    yield put(typeActionLogins.fetchLogoutFailed(error));
  }
}

function* fetchRefreshToken() {
  try {
    const res = yield call(api.refreshToken);
    console.log(res, "[REFRESH-TOKEN]");
  } catch (error) {
    yield put(typeActionRefreshToken.fetchRefreshTokenFailed(error));
  }
}

function* mySaga() {
  yield takeLatest(typeActionLogins.fetchRequest, fetchLogin);
  yield takeLatest(typeActionAllUser.fetchAllUserRequest, fetchAllUser);
  yield takeLatest(
    typeActionDeleteUser.fetchDeleteUserRequest,
    fetchDeleteUser
  );
  yield takeLatest(typeActionLogins.fetchLogoutRequest, fetchLogoutUser);
  yield takeLatest(
    typeActionRefreshToken.fetchRefreshTokenRequest,
    fetchRefreshToken
  );
}

export default mySaga;
