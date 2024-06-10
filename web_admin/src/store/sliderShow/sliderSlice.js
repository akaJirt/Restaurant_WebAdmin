import { HIDE_SLIDER, SHOW_SLIDER } from "../../utils/contants";

export const initState = {
  showSlider: true,
};

const sliderSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_SLIDER:
      return {
        ...state,
        showSlider: true,
      };
    case HIDE_SLIDER:
      return {
        ...state,
        showSlider: false,
      };

    default:
      return state;
  }
};

export default sliderSlice;
