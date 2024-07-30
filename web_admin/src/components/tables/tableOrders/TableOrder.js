import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import { getAllOrder } from "../../../api/call_api/orders/fetchApiOrder";
import LoadingTableOrder from "./LoadingTableOrder";
import ReactPaginate from "react-paginate";

const TableOrder = () => {
  const [idOption, setIdOption] = useState("Cash");
  const [listDataOrder, setListDataOrder] = useState([]);
  const [listNewDataOrder, setListNewDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemSelect = [
    ...new Set(
      listDataOrder && listDataOrder.length > 0
        ? listDataOrder?.map((item) => item.paymentMethod)
        : []
    ),
  ];
  const getApiOrders = async () => {
    await getAllOrder(setListDataOrder);
  };

  useEffect(() => {
    getApiOrders();
  }, []);

  const getNewDataOrder = useCallback(() => {
    if (listDataOrder && listDataOrder.length > 0) {
      let newData = listDataOrder.filter(
        (item) => item.paymentMethod === idOption
      );

      setListNewDataOrder(newData);
    }
  }, [listDataOrder, idOption]);

  useEffect(() => {
    getNewDataOrder();
  }, [getNewDataOrder]);

  /***************************************************PHAN TRANG****************************************************** */
  let limit = 5;
  let offset = currentPage * limit;

  let listDataSlice = listNewDataOrder.slice(offset, offset + limit);
  let pageCount = Math.ceil(listNewDataOrder.length / limit);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  const handleChangeOption = (e) => {
    setIdOption(e.target.value);
  };
  return (
    <div className="table-users">
      <div className="box-top-order">
        <span>Hiện có: {listNewDataOrder.length}</span>
        <h1 className="text-center mb-2">
          Tất Cả Hóa Đơn{" "}
          {idOption === "Cash"
            ? "Tiền Mặt"
            : idOption === "ZaloPay"
            ? "Chuyển Khoản"
            : idOption}
        </h1>
        <div className="select">
          <select value={idOption} onChange={handleChangeOption}>
            {itemSelect && itemSelect.length > 0 ? (
              itemSelect?.map((item, index) => {
                return <option key={index}>{item}</option>;
              })
            ) : (
              <option>Không có dữ liệu</option>
            )}
          </select>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Số bàn</th>
            <th>Tổng tiền</th>
            <th>Tên</th>
            <th>Phương thức thanh toán</th>
            <th>Hình ảnh</th>
            <th>Ngày thanh toán</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {listDataSlice && listDataSlice.length > 0 ? (
            listDataSlice.map((item, index) => (
              <LoadingTableOrder item={item} index={index} key={index} />
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Data</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName="page-tem"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        forcePage={currentPage}
      />
    </div>
  );
};

export default TableOrder;
