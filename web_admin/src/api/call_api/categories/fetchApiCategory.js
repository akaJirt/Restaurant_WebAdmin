import { typeActionCreateCategory } from "../../../store/categories/createCategory/actions";
import { typeActionDeleteCategory } from "../../../store/categories/deleteCategory/actions";
import { typeActionGetCategories } from "../../../store/categories/getCategories/actions";
import { setStatusCategories } from "../../../store/categories/setStatus/actions";
import { typeActionUpdateCategory } from "../../../store/categories/updateCategory/actions";
import { valueFormCategories } from "../../../store/valueForm/categories/actions";
import { apiCategories } from "../../AxiosInstall";
import { toast } from "react-toastify";
const getAllCategories = async (dispatch) => {
  dispatch(typeActionGetCategories.fetchGetCategoriesRequest());
  try {
    const res = await apiCategories.getCategories();
    if (res?.data?.success) {
      dispatch(typeActionGetCategories.fetchGetCategoriesSuccess(res?.data));
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionGetCategories.fetchGetCategoriesFailed(error));
    toast.error(status || message);
  }
};

const createCategory = async (dispatch, name) => {
  dispatch(typeActionCreateCategory.fetchCreateCategoryRequest());
  try {
    const res = await apiCategories.createCategory(name);
    console.log(res.data, "[POST]");
    if (res?.data?.status) {
      dispatch(typeActionCreateCategory.fetchCreateCategorySuccess(res?.data));
      toast.success(res?.data?.status);
      dispatch(valueFormCategories.setName(""));
      await getAllCategories(dispatch);
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionCreateCategory.fetchCreateCategoryFailed(error));
    toast.error(message || status);
  }
};

const deleteCategory = async (dispatch, id, setShow) => {
  dispatch(typeActionDeleteCategory.fetchDeleteCategoryRequest());
  try {
    const res = await apiCategories.deleteCategory(id);
    if (res?.data?.status) {
      toast.success(res?.data?.status);
      dispatch(
        typeActionDeleteCategory.fetchDeleteCategorySuccess(res?.data?.data)
      );
      setShow(false);
      await getAllCategories(dispatch);
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionDeleteCategory.fetchDeleteCategoryFailed(error));
    toast.error(message || status);
  }
};

const updateCategory = async (dispatch, id, name) => {
  dispatch(typeActionUpdateCategory.fetchUpdateCategoryRequest());
  try {
    const res = await apiCategories.updateCategory(id, name);
    if (res?.data?.status) {
      toast.success(res.data?.status);
      dispatch(typeActionUpdateCategory.fetchUpdateCategorySuccess(res?.data));
      dispatch(setStatusCategories.setStatus(["create"]));
      dispatch(valueFormCategories.setName(""));
      await getAllCategories(dispatch);
    }
  } catch (error) {
    console.log(error);
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdateCategory.fetchUpdateCategoryFailed(error));
    toast.error(message || status);
  }
};
export { getAllCategories, createCategory, deleteCategory, updateCategory };
