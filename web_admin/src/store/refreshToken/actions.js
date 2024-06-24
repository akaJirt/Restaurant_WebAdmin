import { createActions } from "redux-actions";

export const typeActionRefreshToken = createActions({
  fetchRefreshTokenRequest: undefined,
  fetchRefreshTokenSuccess: (payload) => payload,
  fetchRefreshTokenFailed: (payload) => payload,
});
