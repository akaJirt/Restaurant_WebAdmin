import { FormatDay, FormatTimeNow, Regex } from "../../../utils/FormDay";
import { apiPromotion } from "../../AxiosInstall";
import { toast } from "react-toastify";
import moment from "moment";
const getPromotion = async (setListDataPromotion) => {
  try {
    const res = await apiPromotion.getApiPromotion();
    if (res && res.data && res.data.status === "success") {
      setListDataPromotion(res.data);
    } else {
      setListDataPromotion([]);
    }
  } catch (error) {
    console.log(error);
  }
};

const postPromotion = async (
  discount,
  discountType,
  maxUsage,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate,
  setListDataPromotion,
  setDiscountType,
  setIsLoading,
  setDiscount,
  setMaxUsage,
  setStartDate,
  setEndDate,
  setEventKey,
  setMinOrderValue,
  setMaxDiscount
) => {
  try {
    let timeNow = FormatTimeNow(moment());
    console.log(typeof timeNow, ">timeNow");
    const data = {
      discount,
      discountType,
      maxUsage,
      minOrderValue,
      maxDiscount,
      startDate: `${startDate} ${timeNow}`,
      endDate: `${endDate} ${timeNow}`,
    };
    setIsLoading(true);
    const res = await apiPromotion.postApiPromotion(data);
    if (res && res?.data && res?.data?.status === "success") {
      toast.success(res?.data?.status);
      setDiscountType("");
      setDiscount("");
      setMaxUsage("");
      setStartDate("");
      setEndDate("");
      setEventKey("form khuyến mãi");
      setMinOrderValue("");
      setMaxDiscount("");
      setIsLoading(false);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};

const deletePromotion = async (
  id,
  setListDataPromotion,
  handleClose,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const res = await apiPromotion.deleteApiPromotion(id);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      handleClose();
      setIsLoading(false);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};
const updatePromotions = async (
  id,
  maxUsage,
  startDate,
  endDate,
  setListDataPromotion,
  setStatusPromotion,
  setDiscountType,
  setIsLoading
) => {
  try {
    let timeNow = FormatTimeNow(moment());

    const data = {
      maxUsage,
      startDate: `${startDate} ${timeNow}`,
      endDate: `${endDate} ${timeNow}`,
    };
    setIsLoading(true);
    const res = await apiPromotion.updateApiPromotion(id, data);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      setStatusPromotion(["create"]);
      setDiscountType("");
      setIsLoading(false);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
    setIsLoading(false);
  }
};

const patchStatusPromotion = async (id, setListDataPromotion) => {
  try {
    const res = await apiPromotion.updateStatusPromotion(id);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    let newMess = mess.match(Regex());
    console.log(newMess, "<<<<<<<<<<NESSSSS");
    toast.error(
      mess
        ? `Khuyến mãi đã hết hạn vào ${FormatDay(
            newMess[0]
          )}.Vui lòng cập nhật ngày kết thúc`
        : mess || status
    );
  }
};

const postResetAllPromotion = async (setListDataPromotion) => {
  try {
    const res = await apiPromotion.resetAllPromotion();
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.message);
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};
export {
  getPromotion,
  postPromotion,
  deletePromotion,
  updatePromotions,
  patchStatusPromotion,
  postResetAllPromotion,
};
