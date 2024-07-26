import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import { getAllTable } from "../../../api/call_api/tables/fetchApiTable";
import { useDispatch, useSelector } from "react-redux";
import { getTableState, orderByTableIdState } from "../../../store/selector";
import { getOrderTable } from "../../../api/call_api/orders/fetchApiOrder";
import LoadingTableOrder from "./LoadingTableOrder";
const TableOrder = () => {
  const [idOption, setIdOption] = useState("");
  console.log(idOption);
  const dispatch = useDispatch();
  const getTable = useSelector(getTableState);
  const orderState = useSelector(orderByTableIdState);
  const { dataOrderByTableId, isLoadingOrderByTableId, isErrorOrderByTableId } =
    orderState;
  const errMess = isErrorOrderByTableId?.name;
  const { dataTable } = getTable;
  const getApiTable = useCallback(async () => {
    await getAllTable(dispatch);
    await getOrderTable(dispatch, idOption);
  }, [dispatch, idOption]);

  useEffect(() => {
    getApiTable();
  }, [getApiTable]);

  const handleChangeOption = (e) => {
    setIdOption(e.target.value);
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <div className="box-top-order">
        <span>{`TotalOrders: ${dataOrderByTableId?.totalOrders || 0}`}</span>
        <h1 className="text-center mb-2">GET ORDERS</h1>
        <div className="select">
          <select value={idOption} onChange={handleChangeOption}>
            <option value="" disabled>
              Chose...
            </option>
            {dataTable?.data &&
              dataTable?.data?.length > 0 &&
              dataTable?.data?.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.tableNumber}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Options</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Note</th>
            <th>Create_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {errMess === "AxiosError" ? (
            <tr>
              <td colSpan={6}>No data</td>
            </tr>
          ) : (
            dataOrderByTableId?.data?.length > 0 &&
            dataOrderByTableId?.data?.map((item, index) => (
              <LoadingTableOrder key={index} item={item} index={index} />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableOrder;
