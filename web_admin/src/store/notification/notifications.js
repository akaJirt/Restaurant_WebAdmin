import { getType } from "../auth/login/actions";
import { notification } from "./actions";

export const initState = {
  success: "",
  failed: "",
};

const notificationSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(notification.notificationSuccess):
      return {
        ...state,
        success: action.payload,
      };
    case getType(notification.notificationFailed):
      return {
        ...state,
        failed: action.payload,
      };
    default:
      return state;
  }
};
export default notificationSlice;
