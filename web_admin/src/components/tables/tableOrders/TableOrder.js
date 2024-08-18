import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAllOrder } from "../../../api/call_api/orders/fetchApiOrder";
import LoadingTableOrder from "./LoadingTableOrder";
import ReactPaginate from "react-paginate";
import { AiOutlineSwapRight } from "react-icons/ai";
import Lightbox from "react-awesome-lightbox";
import _ from "lodash";
const TableOrder = () => {
  const [idOption, setIdOption] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [listDataOrder, setListDataOrder] = useState([]);
  const [listNewDataOrder, setListNewDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isClick, setIsClick] = useState("up");
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  /********************************************GET DATA****************** */

  useEffect(() => {
    getApiOrders();
  }, []);
  const getApiOrders = async () => {
    await getAllOrder(setListDataOrder);
  };
  /********************************************SET OPTION****************** */
  const dataOption = useMemo(() => {
    if (listDataOrder && listDataOrder?.length > 0) {
      return [
        ...new Set(listDataOrder.map((item) => item.paymentMethod) || []),
      ];
    }
  }, [listDataOrder]);

  const dataUser = useMemo(() => {
    if (listDataOrder && listDataOrder?.length > 0) {
      return [...new Set(listDataOrder.map((item) => item.userPay.role) || [])];
    }
  }, [listDataOrder]);

  useEffect(() => {
    if (
      dataOption &&
      dataOption?.length > 0 &&
      dataUser &&
      dataUser?.length > 0
    ) {
      setIdOption(dataOption.concat(dataUser));
    } else if (dataOption?.length === 0 && dataUser?.length === 0) {
      setIdOption("");
    }
  }, [dataOption, dataUser]);

  useEffect(() => {
    if (idOption && idOption.length > 0 && !selectOption) {
      setSelectOption(idOption[0]);
    } else if (idOption.length === 0) {
    }
  }, [idOption, selectOption]);

  /********************************************FILTER DATA****************** */
  console.log(selectOption, "check<SELECT");

  const getNewDataOrder = useCallback(() => {
    if (listDataOrder && listDataOrder.length > 0 && selectOption) {
      let newData = [];
      for (let i = 0; i < listDataOrder.length; i++) {
        if (
          listDataOrder[i].paymentMethod === selectOption ||
          listDataOrder[i].userPay.role === selectOption
        ) {
          newData.push(listDataOrder[i]);
        }
      }
      setListNewDataOrder(newData);
    }
  }, [listDataOrder, selectOption]);

  useEffect(() => {
    getNewDataOrder();
  }, [getNewDataOrder]);
  /********************************************SORT DATA****************** */
  const limit = 5;
  const offset = currentPage * limit;
  const listDataSlice = listNewDataOrder.slice(offset, offset + limit);
  const pageCount = Math.ceil(listNewDataOrder.length / limit);

  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };
  /********************************************SORT DATA****************** */

  const getDataOrder = useCallback(() => {
    if (listNewDataOrder && listNewDataOrder.length > 0 && isClick) {
      let dataClone = _.cloneDeep(listNewDataOrder);
      if (dataClone && dataClone.length > 0) {
        if (isClick === "up") {
          dataClone.sort((a, b) => a.amount - b.amount);
        } else {
          dataClone.sort((a, b) => b.amount - a.amount);
        }
      }
      if (JSON.stringify(dataClone) !== JSON.stringify(listNewDataOrder)) {
        setListNewDataOrder(dataClone);
      }
    }
  }, [isClick, listNewDataOrder]);
  useEffect(() => {
    getDataOrder();
  }, [getDataOrder]);
  console.log(isClick, "check is click");

  const handleClickSort = () => {
    if (isClick === "up") {
      setIsClick("down");
      return;
    }
    if (isClick === "down") {
      setIsClick("up");
      return;
    }
  };

  const handleClickImage = (item) => {
    setCurrentImage(item.userPay.img_avatar_url);
    setTitle(item.userPay.fullName);
    setIsOpen(true);
  };

  return (
    <div className="table-order">
      <div className="box-top-order">
        <span>Hiện có: {listNewDataOrder.length} hóa đơn</span>
        <h1 className="text-center mb-2">
          Tất cả hóa đơn{" "}
          {selectOption === "Cash"
            ? "Tiền Mặt"
            : selectOption === "ZaloPay"
            ? "ZaloPay"
            : selectOption === "staff"
            ? "nhân viên"
            : selectOption === "client"
            ? "khách hàng"
            : selectOption}
        </h1>
        <div className="select">
          <select
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
          >
            {idOption.length > 0 ? (
              idOption.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))
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
            <th>
              Tổng tiền
              <span className="ic-swap" onClick={handleClickSort}>
                <AiOutlineSwapRight
                  className={`ic-up ${isClick === "up" ? "click" : ""}`}
                />
                <AiOutlineSwapRight
                  className={`ic-down ${isClick === "down" ? "click" : ""}`}
                />
              </span>
            </th>
            <th>Tên</th>
            <th>Phương thức thanh toán</th>
            <th>Hình ảnh</th>
            <th>Ngày thanh toán</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {listDataSlice.length > 0 ? (
            listDataSlice.map((item, index) => (
              <LoadingTableOrder
                item={item}
                index={index}
                key={index}
                onClick={() => handleClickImage(item)}
              />
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

      {currentImage && isOpen && (
        <Lightbox
          image={currentImage}
          title={title}
          onClose={() => {
            setIsOpen(false);
            setCurrentImage("");
            setTitle("");
          }}
        />
      )}
    </div>
  );
};

export default TableOrder;
