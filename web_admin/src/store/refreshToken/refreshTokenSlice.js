import { getType } from "../auth/login/actions";
import { typeActionRefreshToken } from "./actions";

export const initState = {
  isRefreshTokenLoading: false,
  isRefreshTokenError: false,
  isRefreshToken: null,
};

const refreshTokenSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionRefreshToken.fetchRefreshTokenRequest):
      return {
        ...state,
        isRefreshTokenLoading: true,
      };
    case getType(typeActionRefreshToken.fetchRefreshTokenSuccess):
      return {
        ...state,
        isRefreshTokenLoading: false,
        isRefreshTokenError: false,
        isRefreshToken: action.payload,
      };
    case getType(typeActionRefreshToken.fetchRefreshTokenFailed):
      return {
        ...state,
        isRefreshTokenError: true,
      };

    default:
      return state;
  }
};

export default refreshTokenSlice;
