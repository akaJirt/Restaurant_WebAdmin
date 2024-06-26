import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateTableState,
  getStatusState,
  getUpdateTableState,
} from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import {
  postTable,
  putTable,
} from "../../../api/call_api/tables/fetchApiTable";
const FormTable = () => {
  console.log("render FormTable");
  const [tableNumber, setTableNumber] = useState("");
  const statusState = useSelector(getStatusState);
  console.log(statusState, "STATUS-TABLE");
  const getCreateTableSuccess = useSelector(getCreateTableState);
  console.log(getCreateTableSuccess, "getCreateTableState");
  const { isLoading } = getCreateTableSuccess;
  const getUpdateTableSuccess = useSelector(getUpdateTableState);
  const { isLoadingUpdate } = getUpdateTableSuccess;

  const dispatch = useDispatch();

  const handleClickAddTable = async () => {
    if (statusState[0] !== "update" || statusState[0] === "create") {
      await postTable(dispatch, parseInt(tableNumber), setTableNumber);
    } else {
      console.log("update table..........");
      await putTable(
        dispatch,
        statusState[1],
        parseInt(tableNumber),
        setTableNumber
      );
    }
  };

  const handleChangInput = (e) => {
    setTableNumber(e.target.value);
  };

  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">Create Table</h1>
      <div className="form-group">
        <label className="form-label">Table number</label>
        <input
          type="number"
          placeholder="Nhập số bàn"
          onChange={handleChangInput}
          className="form-control"
          value={tableNumber}
        />
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary" onClick={handleClickAddTable}>
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
