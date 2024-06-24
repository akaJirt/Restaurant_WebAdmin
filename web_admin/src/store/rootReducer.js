import { combineReducers } from "redux";
import scrollSlice from "./scrollTop/scrollSlice";
import headerSlice from "./headerShow/headerSlice";
import locationSlice from "./location/locationSlice";
import themeSlice from "./theme/themeSlice";
import sliderSlice from "./sliderShow/sliderSlice";
import lightBoxSlice from "./lightBoxImage/lightBoxSlice";
import loginSlice from "./auth/login/loginSlice";
import getAllUserSlice from "./auth/getAllUser/getAllUserSlice";
import deleteUserSlice from "./auth/deleteUser/deleteUserSlice";
import accessTokenSlice from "./accessToken/accessTokenSlice";
import refreshTokenSlice from "./refreshToken/refreshTokenSlice";

const rootReducer = combineReducers({
  scroll: scrollSlice,
  header: headerSlice,
  location: locationSlice,
  theme: themeSlice,
  slider: sliderSlice,
  lightBox: lightBoxSlice,
  login: loginSlice,
  allUser: getAllUserSlice,
  deleteUser: deleteUserSlice,
  accessToken: accessTokenSlice,
  refreshToken: refreshTokenSlice,
});
export default rootReducer;
