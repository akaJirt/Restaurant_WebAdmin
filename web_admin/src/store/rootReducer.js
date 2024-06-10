import { combineReducers } from "redux";
import scrollSlice from "./scrollTop/scrollSlice";
import headerSlice from "./headerShow/headerSlice";
import locationSlice from "./location/locationSlice";
import themeSlice from "./theme/themeSlice";
import sliderSlice from "./sliderShow/sliderSlice";

const rootReducer = combineReducers({
  scroll: scrollSlice,
  header: headerSlice,
  location: locationSlice,
  theme: themeSlice,
  slider: sliderSlice,
});
export default rootReducer;
