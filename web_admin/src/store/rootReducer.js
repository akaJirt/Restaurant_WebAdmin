import { combineReducers } from "redux";
import scrollSlice from "./scrollTop/scrollSlice";
import headerSlice from "./headerShow/headerSlice";
import locationSlice from "./location/locationSlice";
import themeSlice from "./theme/themeSlice";
import sliderSlice from "./sliderShow/sliderSlice";
import lightBoxSlice from "./lightBoxImage/lightBoxSlice";
import loginSlice from "./auth/login/loginSlice";
import accessTokenSlice from "./accessToken/accessTokenSlice";
import getMeSlice from "./auth/getMe/getMeSlice";
import getTableSlice from "./tables/getTables/getTableSlice";
import CreateTableSlice from "./tables/createTable/createTableSlice";
import updateTableSlice from "./tables/updateTable/updateTableSlice";
import setStatusSlice from "./tables/setStatus/setStatusSlice";
import deleteTableSlice from "./tables/deleteTable/deleteTableSlice";
import notificationSlice from "./notification/notifications";

const rootReducer = combineReducers({
  scroll: scrollSlice,
  header: headerSlice,
  location: locationSlice,
  theme: themeSlice,
  slider: sliderSlice,
  lightBox: lightBoxSlice,
  login: loginSlice,
  accessToken: accessTokenSlice,
  getMe: getMeSlice,
  table: getTableSlice,
  createTable: CreateTableSlice,
  updateTable: updateTableSlice,
  statusTable: setStatusSlice,
  deleteTable: deleteTableSlice,
  notification: notificationSlice,
});
export default rootReducer;
