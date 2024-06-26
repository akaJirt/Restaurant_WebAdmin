import { getType } from "../login/actions";
import { typeActionGetMes } from "./actions";

export const initState = {
  isLoading: false,
  isError: null,
  isDataMe: null,
};

const getMeSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetMes.fetchGetMeRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(typeActionGetMes.fetchGetMeSuccess):
      return {
        ...state,
        isLoading: false,
        isDataMe: action.payload,
      };
    case getType(typeActionGetMes.fetchGetMeFailed):
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default getMeSlice;
