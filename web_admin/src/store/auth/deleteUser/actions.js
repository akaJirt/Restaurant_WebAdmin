import { createActions } from "redux-actions";

export const typeActionDeleteUser = createActions({
  fetchDeleteUserRequest: (payload) => payload,
  fetchDeleteUserSuccess: (payload) => payload,
  fetchDeleteUserFailed: (payload) => payload,
  fetchResetUserFailed: (payload) => payload,
});
