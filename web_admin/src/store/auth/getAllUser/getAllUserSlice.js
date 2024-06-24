import { getType } from "../login/actions";
import { typeActionAllUser } from "./actions";

const initState = {
  isLoadingAllUser: false,
  isErrorAllUser: false,
  isAllUser: [],
  error: {},
};

const getAllUserSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionAllUser.fetchAllUserRequest):
      return {
        ...state,
        isLoadingAllUser: true,
        isErrorAllUser: false,
      };
    case getType(typeActionAllUser.fetchAllUserSuccess):
      return {
        ...state,
        isLoadingAllUser: false,
        isErrorAllUser: false,
        isAllUser: action.payload,
      };
    case getType(typeActionAllUser.fetchAllUserFailed):
      return {
        ...state,
        isLoadingAllUser: false,
        isErrorAllUser: true,
        error: action.payload,
      };
    case getType(typeActionAllUser.fetchAllUserReset):
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export default getAllUserSlice;
