import { createActions } from "redux-actions";

export const getType = (typeAction) => {
  return typeAction().type;
};

export const typeActionLogins = createActions({
  fetchRequest: (payload) => payload,
  fetchSuccess: (payload) => payload,
  fetchFailed: (payload) => payload,
  //LOGOUT
  fetchLogoutRequest: (payload) => payload,
  fetchLogoutSuccess: (payload) => payload,
  fetchLogoutFailed: (payload) => payload,
});
