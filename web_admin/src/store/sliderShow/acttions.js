import { createAction } from "redux-actions";
import { HIDE_SLIDER, SHOW_SLIDER } from "../../utils/contants";

export const setShowSlider = createAction(SHOW_SLIDER);
export const setHideSlider = createAction(HIDE_SLIDER);
