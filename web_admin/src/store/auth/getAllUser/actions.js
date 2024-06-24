import { createActions } from "redux-actions";

export const typeActionAllUser = createActions({
  fetchAllUserRequest: (payload) => payload,
  fetchAllUserSuccess: (payload) => payload,
  fetchAllUserFailed: (payload) => payload,
  fetchAllUserReset: () => undefined,
});
