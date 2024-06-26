import { getType, typeActionLogins } from "./actions";

export const initState = {
  isLoading: false,
  isLogin: "",
  error: null,
};

const loginSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionLogins.fetchRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(typeActionLogins.fetchSuccess):
      return {
        ...state,
        isLoading: false,
        isLogin: action.payload,
      };
    case getType(typeActionLogins.fetchFailed):
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case getType(typeActionLogins.fetchReset):
      return {
        ...state,
        error: null,
      };

    case getType(typeActionLogins.fetchLogoutRequest):
      return {
        ...state,
        isLoading: false,
        isLogin: "",
      };

    default:
      return state;
  }
};

export default loginSlice;
