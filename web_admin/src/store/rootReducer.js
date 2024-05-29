import { combineReducers } from "redux";
import scrollSlice from "./scrollTop/scrollSlice";

const rootReducer = combineReducers({
  scroll: scrollSlice,
});
export default rootReducer;
