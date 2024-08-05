import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import { getAllOrder } from "../../../api/call_api/orders/fetchApiOrder";
import LoadingTableOrder from "./LoadingTableOrder";
import ReactPaginate from "react-paginate";
import { AiOutlineSwapRight } from "react-icons/ai";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const TableOrder = () => {
  const [idOption, setIdOption] = useState("Cash");
  const [listDataOrder, setListDataOrder] = useState([]);
  const [listNewDataOrder, setListNewDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isClick, setIsClick] = useState("up");
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const itemSelect = [
    ...new Set(listDataOrder.map((item) => item.paymentMethod)),
  ];

  const getApiOrders = async () => {
    await getAllOrder(setListDataOrder);
  };

  useEffect(() => {
    getApiOrders();
  }, []);

  const getDataOrder = useCallback(() => {
    if (listDataOrder && listDataOrder.length > 0 > 0) {
      let dataClone = _.cloneDeep(listDataOrder);
      if (dataClone && dataClone.length > 0) {
        if (isClick === "up") {
          dataClone.sort((a, b) => a.amount - b.amount);
        } else {
          dataClone.sort((a, b) => b.amount - a.amount);
        }
      }
      setListNewDataOrder(dataClone);
    }
  }, [isClick, listDataOrder]);

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

  const limit = 5;
  const offset = currentPage * limit;
  const listDataSlice = listNewDataOrder.slice(offset, offset + limit);
  const pageCount = Math.ceil(listNewDataOrder.length / limit);

  useEffect(() => {
    getDataOrder();
  }, [getDataOrder]);
  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  const handleChangeOption = (e) => {
    setIdOption(e.target.value);
  };

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
          Tất Cả Hóa Đơn{" "}
          {idOption === "Cash"
            ? "Tiền Mặt"
            : idOption === "ZaloPay"
            ? "Chuyển Khoản"
            : idOption}
        </h1>
        <div className="select">
          <select value={idOption} onChange={handleChangeOption}>
            {itemSelect.length > 0 ? (
              itemSelect.map((item, index) => (
                <option key={index}>{item}</option>
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
