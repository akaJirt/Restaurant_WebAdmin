import { combineReducers } from "redux";
import scrollSlice from "./scrollTop/scrollSlice";
import headerSlice from "./headerShow/headerSlice";
import locationSlice from "./location/locationSlice";
import themeSlice from "./theme/themeSlice";
import sliderSlice from "./sliderShow/sliderSlice";
import lightBoxSlice from "./lightBoxImage/lightBoxSlice";
import loginSlice from "./auth/login/loginSlice";
import accessTokenSlice from "./accessToken/accessTokenSlice";
import getTableSlice from "./tables/getTables/getTableSlice";
import CreateTableSlice from "./tables/createTable/createTableSlice";
import updateTableSlice from "./tables/updateTable/updateTableSlice";
import setStatusSlice from "./tables/setStatus/setStatusSlice";
import deleteTableSlice from "./tables/deleteTable/deleteTableSlice";
import getMeSlice from "./auth/getMe/getMeSlice";
import valueFormTableSlice from "./valueForm/tables/valueFormTableSlice";
import updateStatusTableSlice from "./tables/updateStatusTable/updateStatusTableSlice";
import categoriesSlice from "./categories/getCategories/categoriesSlice";
import valueFormCategoriesSlice from "./valueForm/categories/valueFormCategoriesSlice";
import createCategorySlice from "./categories/createCategory/createCategorySlice";
import deleteCategorySlice from "./categories/deleteCategory/deleteCategorySlice";
import updateCategorySlice from "./categories/updateCategory/updateCategorySlice";
import setStatusSliceCategorySlice from "./categories/setStatus/setStatusSliceCategorySlice.js";
import getAllUsersSlice from "./auth/getUsers/getAllUsersSlice.js";
import setStatusUsersSlice from "./auth/setStatusUsers/setStatusUsersSlice.js";
import updateMeSlice from "./auth/updateMe/updateMeSlice.js";
import valueFormUsersSlice from "./valueForm/users/valueFormUsersSlice.js";
import menuItemSlice from "./menuItem/menuItemSlice.js";

const rootReducer = combineReducers({
  scroll: scrollSlice,
  header: headerSlice,
  location: locationSlice,
  theme: themeSlice,
  slider: sliderSlice,
  lightBox: lightBoxSlice,
  login: loginSlice,
  getMe: getMeSlice,
  updateMe: updateMeSlice,
  allUser: getAllUsersSlice,
  valueUsers: valueFormUsersSlice,
  accessToken: accessTokenSlice,
  table: getTableSlice,
  createTable: CreateTableSlice,
  updateTable: updateTableSlice,
  statusTable: setStatusSlice,
  deleteTable: deleteTableSlice,
  valueTable: valueFormTableSlice,
  updateStatusTable: updateStatusTableSlice,
  categories: categoriesSlice,
  createCategory: createCategorySlice,
  deleteCategory: deleteCategorySlice,
  updateCategory: updateCategorySlice,
  valueCategories: valueFormCategoriesSlice,
  statusCategory: setStatusSliceCategorySlice,
  statusUsers: setStatusUsersSlice,
  createUser: createCategorySlice,
  menuItem: menuItemSlice,
});
export default rootReducer;
