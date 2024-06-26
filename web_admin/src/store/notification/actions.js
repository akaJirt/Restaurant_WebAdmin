import { createActions } from "redux-actions";

//Thong Bao
const notification = createActions({
  notificationSuccess: (payload) => payload,
  notificationFailed: (payload) => payload,
});

export { notification };
