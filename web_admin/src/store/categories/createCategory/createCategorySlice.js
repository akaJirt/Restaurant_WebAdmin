import { getType } from "../../auth/login/actions";
import { typeActionCreateCategory } from "./actions";

export const initState = {
  isLoadingCreateCategory: false,
  isErrorCreateCategory: null,
  dataCreateCategory: null,
};

const createCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateCategory.fetchCreateCategoryRequest):
      return {
        isLoadingCreateCategory: true,
        isErrorCreateCategory: null,
        dataCreateCategory: null,
      };
    case getType(typeActionCreateCategory.fetchCreateCategorySuccess):
      return {
        isLoadingCreateCategory: false,
        isErrorCreateCategory: null,
        dataCreateCategory: action.payload,
      };
    case getType(typeActionCreateCategory.fetchCreateCategoryFailed):
      return {
        isLoadingCreateCategory: false,
        isErrorCreateCategory: action.payload,
        dataCreateCategory: null,
      };

    default:
      return state;
  }
};

export default createCategorySlice;
