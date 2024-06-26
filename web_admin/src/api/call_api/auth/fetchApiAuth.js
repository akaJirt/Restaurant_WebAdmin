import { setAccessToken } from "../../../store/accessToken/actions";
import { typeActionGetMes } from "../../../store/auth/getMe/actions";
import { typeActionLogins } from "../../../store/auth/login/actions";
import { api } from "../../AxiosInstall";
import { toast } from "react-toastify";

const Login = async (payload, dispatch, setEmail, setPassword, navigate) => {
  dispatch(typeActionLogins.fetchRequest());
  try {
    const res = await api.loginUser(payload);
    console.log(res.data, "<<<<<<<<<<<<<<<<");
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

const getMe = async (dispatch) => {
  dispatch(typeActionGetMes.fetchGetMeRequest());
  try {
    const res = await api.getMe();
    console.log(res.data, "<<<<<<<<<<<<<GET ME");
    if (res?.data?.status || res?.data?.data) {
      dispatch(typeActionGetMes.fetchGetMeSuccess(res?.data?.data?.user));
    }
  } catch (error) {
    console.log(error);
    dispatch(typeActionLogins.fetchFailed(error));
    toast.error(error?.response?.data?.status);
  }
};

export { Login, getMe };
