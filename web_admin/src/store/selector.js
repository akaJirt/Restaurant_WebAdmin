//-----------------SCROLL-------------------
export const getScrollState = (state) => state.scroll.showScroll;
//-----------------HEADER-------------------
export const getHeaderState = (state) => state.header.showHeader;
//-----------------LOCATION-----------------
export const getLocationState = (state) => state.location.showLocation;
//-----------------THEME-----------------
export const getThemeState = (state) => state.theme.showTheme;
//-----------------SLIDER-----------------
export const getSliderState = (state) => state.slider.showSlider;
//-----------------LIGHT-BOX-----------------
export const getLightBoxState = (state) => state.lightBox.showLightBox;
//-----------------LOGIN-----------------
export const getLoginState = (state) => state.login;
//-----------------ACCESS-TOKEN-----------------
export const getAccessTokenState = (state) =>
  state.accessToken.getAccessToken.payload;
//-----------------GET-ME-----------------
export const getMeState = (state) => state.getMe;
//-----------------GET-Tables-----------------
export const getTableState = (state) => state.table;
//-----------------CREATE-Tables-----------------
export const getCreateTableState = (state) => state.createTable;
//-----------------UPDATE-Tables-----------------
export const getUpdateTableState = (state) => state.updateTable;
//------------------STATUS-TABLE---------------
export const getStatusState = (state) => state.statusTable.status;
//------------------DELETE-TABLE---------------
export const getDeleteTableState = (state) => state.deleteTable;

//*************************************VALUE FORM TABLES *********************************************************/
export const getValueTableState = (state) => state.valueTable.tableNumber;
export const getSetTableState = (state) => state.valueTable.status;
//*************************************VALUE FORM TABLES *********************************************************/
export const getNameState = (state) => state.valueCategories.name;

//*************************************CATEGORIES*********************************************************/
export const getCategoriesState = (state) => state.categories;
export const getCreateCategoryState = (state) => state.createCategory;
export const getUpdateCategoryState = (state) => state.updateCategory;
export const getDeleteCategoryState = (state) => state.deleteCategory;
export const getStatusCategoryState = (state) =>
  state.statusCategory.dataStatus;
