import { toast } from "react-toastify";
import { typeActionMenuItem } from "../../../store/menuItem/actions";
import { apiMenuItem } from "../../AxiosInstall";

const getAllMenuItem = async (dispatch) => {
  dispatch(typeActionMenuItem.fetchMenuItemRequest());
  try {
    const res = await apiMenuItem.getMenuItem();
    if (res?.data?.success) {
      dispatch(typeActionMenuItem.fetchMenuItemSuccess(res?.data));
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionMenuItem.fetchMenuItemFailed(error));
    toast.error(message || status);
  }
};

export { getAllMenuItem };
