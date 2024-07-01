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
//*************************************TABLES*********************************************************/
export const getTableState = (state) => state.table;
export const getCreateTableState = (state) => state.createTable;
export const getUpdateTableState = (state) => state.updateTable;
export const getStatusState = (state) => state.statusTable.status;
export const getDeleteTableState = (state) => state.deleteTable;
//*************************************VALUE FORM TABLES *********************************************************/
export const getValueTableState = (state) => state.valueTable.tableNumber;
export const getSetTableState = (state) => state.valueTable.status;

//*************************************VALUE FORM CATEGORY *********************************************************/
export const getNameState = (state) => state.valueCategories.name;
//*************************************CATEGORIES*********************************************************/
export const getCategoriesState = (state) => state.categories;
export const getCreateCategoryState = (state) => state.createCategory;
export const getUpdateCategoryState = (state) => state.updateCategory;
export const getDeleteCategoryState = (state) => state.deleteCategory;
export const getStatusCategoryState = (state) =>
  state.statusCategory.dataStatus;

//*************************************USERS*********************************************************/
export const getLoginState = (state) => state.login;
export const getMeState = (state) => state.getMe;
export const updateMeState = (state) => state.updateMe;
export const getAllUsersState = (state) => state.allUser;
export const getCreateUserState = (state) => state.createUser;
export const getAccessTokenState = (state) =>
  state.accessToken.getAccessToken.payload;
export const getSetStatusUsersState = (state) => state.statusUsers.statusUsers;
//value
export const valueFormFullNameState = (state) =>
  state.valueUsers.fullNameUpdateMe;
export const valueFormAvatarState = (state) => state.valueUsers.avatarUpdateMe;
//*************************************MENU ITEM*********************************************************/
export const getAllMenuItemState = (state) => state.menuItem;
