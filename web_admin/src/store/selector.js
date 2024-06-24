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
//-----------------GET-ALL-USER-----------------
export const getAllUserState = (state) => state.allUser;
//-----------------DELETE-USER-----------------
export const getDeleteUserState = (state) => state.deleteUser;

//-----------------ACCESS-TOKEN-----------------
export const getAccessTokenState = (state) =>
  state.accessToken.getAccessToken.payload;
//-----------------REFRESH-TOKEN-----------------
export const getRefreshTokenState = (state) => state.refreshToken;
