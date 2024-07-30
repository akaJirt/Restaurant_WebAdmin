import { apiPromotion } from "../../AxiosInstall";
import { toast } from "react-toastify";
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
  setIsLoading
) => {
  const data = {
    discount,
    discountType,
    maxUsage,
    minOrderValue,
    maxDiscount,
    startDate,
    endDate,
  };
  try {
    setIsLoading(true);
    const res = await apiPromotion.postApiPromotion(data);
    if (res && res?.data && res?.data?.status === "success") {
      toast.success(res?.data?.status);
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
    const data = {
      maxUsage,
      startDate,
      endDate,
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
    toast.error(mess || status);
  }
};
export {
  getPromotion,
  postPromotion,
  deletePromotion,
  updatePromotions,
  patchStatusPromotion,
};
