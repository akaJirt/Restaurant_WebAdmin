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
  code,
  description,
  discount,
  discountType,
  minOrderValue,
  maxDiscount,
  setListDataPromotion,
  setCode,
  setDescription,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount
) => {
  const data = {
    code,
    description,
    discount,
    discountType,
    minOrderValue,
    maxDiscount,
  };
  try {
    const res = await apiPromotion.postApiPromotion(data);
    if (res && res?.data && res?.data?.status === "success") {
      toast.success(res?.data?.status);
      setCode("");
      setDescription("");
      setDiscount("");
      setDiscountType("");
      setMinOrderValue("");
      setMaxDiscount("");
      await getPromotion(setListDataPromotion);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};

const deletePromotion = async (id) => {
  try {
    const res = await apiPromotion.deleteApiPromotion(id);
    console.log(res, "<<<<<<<<<<<<<<");
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
    }
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};
const updatePromotions = async (
  id,
  code,
  description,
  discount,
  discountType,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate
) => {
  try {
    const data = {
      code,
      description,
      discount,
      discountType,
      minOrderValue,
      maxDiscount,
      startDate,
      endDate,
    };
    console.log("form-data", data, "<<<<<<<<<<<<");
    const res = await apiPromotion.updateApiPromotion(id, data);
    console.log(res, "check rs<<<<");
  } catch (error) {
    let mess = error?.response?.data?.message;
    let status = error?.response?.data?.status;
    toast.error(mess || status);
  }
};
export { getPromotion, postPromotion, deletePromotion, updatePromotions };
