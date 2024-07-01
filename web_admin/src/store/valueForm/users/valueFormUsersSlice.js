import { getType } from "../../auth/login/actions";
import { valueFormUsers } from "./actions";

export const initState = {
  fullName: "",
  email: "",
  password: "",
  role: "",
  fullNameUpdateMe: "",
  avatarUpdateMe: "",
};

const valueFormUsersSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(valueFormUsers.setFullNameUpdateMe):
      return {
        ...state,
        fullNameUpdateMe: action.payload,
      };
    case getType(valueFormUsers.setAvatarUpdateMe):
      return {
        ...state,
        avatarUpdateMe: action.payload,
      };

    default:
      return state;
  }
};

export default valueFormUsersSlice;
