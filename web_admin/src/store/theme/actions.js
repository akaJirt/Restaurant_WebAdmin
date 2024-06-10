import { createAction } from "redux-actions";
import { SHOW_THEME } from "../../utils/contants";

export const setShowTheme = createAction(SHOW_THEME, (payload) => {
  return {
    payload,
  };
});
