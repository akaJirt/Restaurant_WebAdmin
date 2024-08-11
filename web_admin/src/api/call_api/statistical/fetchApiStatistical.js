import { toast } from "react-toastify";
import { apiStatistical } from "../../AxiosInstall";
import { typeActionTableStatistical } from "../../../store/statisticals/tableActions";
const getPayment = async (startDate, endDate, setListPayment, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await apiStatistical.getApiPaymentStatistical(
      startDate,
      endDate
    );

    if (res && res.data && res.data.status === "success") {
      setListPayment(res.data.data);
      setIsLoading(false);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
    setIsLoading(false);
  }
};

const getRevenue = async (startDate, endDate, setListRevenue) => {
  try {
    const res = await apiStatistical.getApiRevenueStatistical(
      startDate,
      endDate
    );
    if (res && res.data && res.data.status === "success") {
      setListRevenue(res.data.data);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
const getTable = async (dispatch, setListDataTable) => {
  try {
    dispatch(typeActionTableStatistical.fetchRequestTableStatistical());
    const res = await apiStatistical.getApiTableStatistical();
    if (res && res.data && res.data && res.data.status === "success") {
      dispatch(
        typeActionTableStatistical.fetchSuccessTableStatistical(res.data.data)
      );
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(status || message);
  }
};
export { getPayment, getRevenue, getTable };
