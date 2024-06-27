import { getType } from "../../auth/login/actions";
import { typeActionDeleteCategory } from "./actions";

export const initState = {
  isLoadingDeleteCategory: false,
  isErrorDeleteCategory: null,
  dataDeleteCategory: null,
};

const deleteCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteCategory.fetchDeleteCategoryRequest):
      return {
        isLoadingDeleteCategory: true,
        isErrorDeleteCategory: null,
        dataDeleteCategory: null,
      };
    case getType(typeActionDeleteCategory.fetchDeleteCategorySuccess):
      return {
        isLoadingDeleteCategory: false,
        isErrorDeleteCategory: null,
        dataDeleteCategory: action.payload,
      };
    case getType(typeActionDeleteCategory.fetchDeleteCategoryFailed):
      return {
        isLoadingDeleteCategory: false,
        isErrorDeleteCategory: action.payload,
        dataDeleteCategory: null,
      };

    default:
      return state;
  }
};

export default deleteCategorySlice;
