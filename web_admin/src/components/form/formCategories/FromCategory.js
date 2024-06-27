import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { valueFormCategories } from "../../../store/valueForm/categories/actions";
import {
  getCategoriesState,
  getCreateCategoryState,
  getNameState,
  getStatusCategoryState,
} from "../../../store/selector";
import {
  createCategory,
  updateCategory,
} from "../../../api/call_api/categories/fetchApiCategory";
import { LoadingOutlined } from "@ant-design/icons";

const FromCategory = () => {
  console.log("render FormCategory");
  const name = useSelector(getNameState);
  const getCreateState = useSelector(getCreateCategoryState);
  const getStatusCategory = useSelector(getStatusCategoryState);

  const dispatch = useDispatch();
  const handleChangName = (e) => {
    dispatch(valueFormCategories.setName(e.target.value));
  };

  const handleClickAddCategory = async () => {
    if (
      getStatusCategory[0] === "create" ||
      getStatusCategory[0] !== "update"
    ) {
      await createCategory(dispatch, name);
    } else {
      await updateCategory(dispatch, getStatusCategory[1], name);
    }
  };
  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Category</h1>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          placeholder="Nhập name..."
          type="text"
          className="form-control"
          value={name}
          onChange={handleChangName}
        />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary" onClick={handleClickAddCategory}>
          {getStatusCategory[0] === "create" ||
          getStatusCategory[0] !== "update" ? (
            getCreateState?.isLoadingCreateCategory ? (
              <LoadingOutlined />
            ) : (
              "Add Category"
            )
          ) : (
            "Update Category"
          )}
        </button>
      </div>
    </div>
  );
};

export default FromCategory;
