import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import { typeActionLogins } from "../auth/login/actions";
import { typeActionGetMes } from "../auth/getMe/actions";
import { api, apiTables } from "../../api/AxiosInstall";
import { typeActionGetTables } from "../tables/getTables/actions";
import { typeActionCreateTables } from "../tables/createTable/actions";
import { typeActionUpdateTables } from "../tables/updateTable/actions";
import { typeActionDeleteTables } from "../tables/deleteTable/actions";
//LOGIN
function* fetchLogin(action) {
  try {
    const res = yield call(api.loginUser, action.payload);
    yield put(typeActionLogins.fetchSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(typeActionLogins.fetchFailed(error));
  }
}
//GET ME
function* fetchGetMe() {
  try {
    const res = yield call(api.getMe);
    yield put(typeActionGetMes.fetchGetMeSuccess(res.data.data));
  } catch (error) {
    console.log(error);
    yield put(typeActionGetMes.fetchGetMeFailed(error));
  }
}
//GET TABLE
function* fetchGetTable() {
  try {
    const res = yield call(apiTables.getTable);
    yield put(typeActionGetTables.fetchGetTableSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(typeActionGetTables.fetchGetTableFailed(error));
  }
}
//CREATE TABLE
function* fetchCreateTable(action) {
  try {
    const res = yield call(
      apiTables.createTable,
      parseInt(action.payload.tableNumber)
    );
    yield put(typeActionCreateTables.fetchCreateTableSuccess(res.data));
  } catch (error) {
    console.log(error);
    yield put(typeActionCreateTables.fetchCreateTableFailed(error));
  }
}
function* fetchUpdateTable(action) {
  try {
    const res = yield call(
      apiTables.updateTable,
      action.payload.id,
      parseInt(action.payload.tableNumber)
    );
    yield put(typeActionUpdateTables.fetchUpdateTableSuccess(res.data));
  } catch (error) {
    yield put(typeActionUpdateTables.fetchUpdateTableFailed(error));
  }
}

function* fetchDeleteTable(action) {
  try {
    const res = yield call(apiTables.deleteTable, action.payload);
    yield put(typeActionDeleteTables.fetchDeleteTableSuccess(res.data));
    yield put(typeActionGetTables.fetchGetTableRequest());
  } catch (error) {
    yield put(typeActionDeleteTables.fetchDeleteTableFailed(error));
  }
}

function* mySaga() {
  yield takeEvery(typeActionLogins.fetchRequest, fetchLogin);
  yield takeLatest(typeActionGetMes.fetchGetMeRequest, fetchGetMe);
  yield takeLatest(typeActionGetTables.fetchGetTableRequest, fetchGetTable);
  yield takeEvery(
    typeActionCreateTables.fetchCreateTableRequest,
    fetchCreateTable
  );
  yield takeLatest(
    typeActionUpdateTables.fetchUpdateTableRequest,
    fetchUpdateTable
  );
  yield takeEvery(
    typeActionDeleteTables.fetchDeleteTableRequest,
    fetchDeleteTable
  );
}

export default mySaga;
