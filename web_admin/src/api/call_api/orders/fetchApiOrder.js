import { typeActionGetOrderByTableId } from "../../../store/orders/getOrderByTableId/actions";
import { toast } from "react-toastify";
import { apiOrder } from "../../AxiosInstall";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const getOrderTable = async (dispatch, id) => {
  dispatch(typeActionGetOrderByTableId.fetchGetOrderByTableIdRequest());
  NProgress.start();
  try {
    const res = await apiOrder.getOrderTableId(id);
    if (res?.data?.success) {
      NProgress.done();
      dispatch(
        typeActionGetOrderByTableId.fetchGetOrderByTableIdSuccess(res?.data)
      );
    }
  } catch (error) {
    NProgress.done();
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionGetOrderByTableId.fetchGetOrderByTableIdFailed(error));
    toast.error(message || status);
  }
};

export { getOrderTable };
