import { getType } from "../login/actions";
import { typeActionDeleteUser } from "./actions";

export const initState = {
  isLoadingDeleteUser: false,
  isErrorDeleteUser: false,
  isDeleteUser: {},
  mssE: {},
};

const deleteUserSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteUser.fetchDeleteUserRequest):
      return {
        ...state,

        isLoadingDeleteUser: true,
      };
    case getType(typeActionDeleteUser.fetchDeleteUserSuccess):
      return {
        ...state,

        isLoadingDeleteUser: false,
        isErrorDeleteUser: false,
        isDeleteUser: action.payload,
      };
    case getType(typeActionDeleteUser.fetchDeleteUserFailed):
      return {
        ...state,
        isErrorDeleteUser: true,
        mssE: action.payload,
      };
    case getType(typeActionDeleteUser.fetchResetUserFailed):
      return {
        ...state,
        isDeleteUser: action.payload,
      };
    default:
      return state;
  }
};

export default deleteUserSlice;
