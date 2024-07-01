import { setAccessToken } from "../../../store/accessToken/actions";
import { typeActionCreateUser } from "../../../store/auth/createUser/actions";
import { typeActionGetMes } from "../../../store/auth/getMe/actions";
import { typeActionGetAllUsers } from "../../../store/auth/getUsers/actions";
import { typeActionLogins } from "../../../store/auth/login/actions";
import { typeActionUpdateMe } from "../../../store/auth/updateMe/actions";
import { api } from "../../AxiosInstall";
import { toast } from "react-toastify";
/******************************LOGIN***************************** */

const Login = async (payload, dispatch, setEmail, setPassword, navigate) => {
  dispatch(typeActionLogins.fetchRequest());
  try {
    const res = await api.loginUser(payload);
    if (res?.data?.status) {
      dispatch(typeActionLogins.fetchSuccess(res?.data?.data));
      dispatch(setAccessToken(res?.data?.data?.token));
      toast.success(res?.data?.status);
      setEmail("");
      setPassword("");
      navigate("/");
    }
  } catch (error) {
    dispatch(typeActionLogins.fetchFailed(error));
    console.log(error, "<<<<<<<<<<<<<<<<<");
    toast.error(error?.response?.data?.status);
  }
};
/******************************GET ME***************************** */

const getMe = async (dispatch) => {
  dispatch(typeActionGetMes.fetchGetMeRequest());
  try {
    const res = await api.getMe();
    if (res?.data?.status || res?.data?.data) {
      dispatch(typeActionGetMes.fetchGetMeSuccess(res?.data?.data?.user));
    }
  } catch (error) {
    console.log(error);
    dispatch(typeActionLogins.fetchFailed(error));
    toast.error(error?.response?.data?.status);
  }
};
/******************************GET ALL USERS***************************** */
const getAllUsers = async (dispatch) => {
  dispatch(typeActionGetAllUsers.fetchGetAllUsersRequest());
  try {
    const res = await api.getUser();
    if (res?.data?.status) {
      dispatch(typeActionGetAllUsers.fetchGetAllUsersSuccess(res?.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(typeActionGetAllUsers.fetchGetAllUsersFailed(error));
  }
};
/******************************CREATE USERS***************************** */
const createUsers = async (dispatch, data) => {
  dispatch(typeActionCreateUser.fetchCreateUserRequest());
  try {
    const res = await api.createUser(data);
    console.log(res.data, "[POST]");
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionCreateUser.fetchCreateUserFailed(error));
    toast.error(message || status);
  }
};

const putMe = async (dispatch, data) => {
  dispatch(typeActionUpdateMe.fetchUpdateMeRequest());
  try {
    const res = await api.updateMe(data);
    if (res?.data?.status) {
      toast.success(res?.data?.status);
      dispatch(typeActionUpdateMe.fetchUpdateMeSuccess(res?.data));
      await getMe(dispatch);
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdateMe.fetchUpdateMeFailed(error));
    toast.error(message || status);
  }
};
export { Login, getMe, getAllUsers, createUsers, putMe };
