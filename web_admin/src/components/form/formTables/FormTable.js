import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateTableState,
  getStatusState,
  getUpdateTableState,
  getValueTableState,
} from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import {
  postTable,
  putTable,
} from "../../../api/call_api/tables/fetchApiTable";
import { valueFormTable } from "../../../store/valueForm/tables/actions";

const FormTable = () => {
  console.log("render FormTable");
  const tableNumber = useSelector(getValueTableState);
  const statusState = useSelector(getStatusState);
  const getCreateTableSuccess = useSelector(getCreateTableState);
  const { isLoading } = getCreateTableSuccess;
  const getUpdateTableSuccess = useSelector(getUpdateTableState);
  const { isLoadingUpdate } = getUpdateTableSuccess;

  const dispatch = useDispatch();

  const handleClickAddTable = async () => {
    if (statusState[0] !== "update" || statusState[0] === "create") {
      await postTable(dispatch, parseInt(tableNumber));
    } else {
      await putTable(dispatch, statusState[1], parseInt(tableNumber));
    }
  };

  const handleChangInput = (e) => {
    dispatch(valueFormTable.setTableNumber(e.target.value));
  };

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Table</h1>
      <div className="form-group">
        <label className="form-label">Table number</label>
        <input
          type="text"
          placeholder="Nhập số bàn"
          onChange={handleChangInput}
          className="form-control"
          value={tableNumber}
        />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary bt2" onClick={handleClickAddTable}>
          {statusState[0] !== "update" || statusState[0] === "create" ? (
            isLoading ? (
              <LoadingOutlined />
            ) : (
              "Create"
            )
          ) : isLoadingUpdate ? (
            <LoadingOutlined />
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};

export default FormTable;
