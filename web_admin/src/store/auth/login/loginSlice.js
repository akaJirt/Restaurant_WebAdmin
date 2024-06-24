import { getType, typeActionLogins } from "./actions";

export const initState = {
  isLoading: false,
  isError: false,
  isLogin: {},
};

const loginSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionLogins.fetchRequest):
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case getType(typeActionLogins.fetchSuccess):
      return {
        ...state,
        isLoading: false,
        isError: false,
        isLogin: action.payload,
      };
    case getType(typeActionLogins.fetchFailed):
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case getType(typeActionLogins.fetchLogoutRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(typeActionLogins.fetchLogoutSuccess):
      return {
        ...state,
        isLogin: {},
      };
    case getType(typeActionLogins.fetchLogoutFailed):
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};

export default loginSlice;
