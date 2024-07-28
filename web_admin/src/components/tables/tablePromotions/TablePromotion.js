import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import { getPromotion } from "../../../api/call_api/promotions/fetchApiPromotions";
import ToolTip from "../../ToolTip/ToolTip";
import { cutString } from "../../../utils/cutValue";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

const TablePromotion = ({
  listDataPromotion,
  setListDataPromotion,
  setShow,
  setItemPromotion,
  setStatusPromotion,
}) => {
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [isSelected, setIsSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const getApiPromotions = useCallback(async () => {
    await getPromotion(setListDataPromotion);
  }, [setListDataPromotion]);

  useEffect(() => {
    getApiPromotions();
  }, [getApiPromotions]);

  const filterPromotions = useCallback(() => {
    if (listDataPromotion?.data?.promotions?.length > 0) {
      const filtered = listDataPromotion.data.promotions.filter((item) => {
        if (isSelected === "") {
          return true;
        } else {
          return item.discountType === isSelected;
        }
      });

      setFilteredPromotions(filtered);
    }
  }, [isSelected, listDataPromotion?.data?.promotions]);

  useEffect(() => {
    filterPromotions();
  }, [filterPromotions]);

  let limit = 5;
  let offset = currentPage * limit;
  let newListData = filteredPromotions.slice(offset, offset + limit);
  let pageCount = Math.ceil(filteredPromotions.length / limit);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  const handleChangeOption = (value) => {
    setIsSelected(value);
  };

  const handleClickDelete = (id, code) => {
    setShow(true);
    setItemPromotion({ id, code });
    setStatusPromotion(["delete"]);
  };

  const handleClickSua = (item) => {
    setItemPromotion({ item });
    setStatusPromotion(["update"]);
    toast.success("Vui Lòng Qua Tab Update Khuyến Mãi Để Cập Nhật");
  };

  const formatDiscount = (discount) => {
    if (discount < 100) {
      return `${discount}%`;
    } else {
      return `${discount.toLocaleString()} VND`;
    }
  };

  const newDataFilter = [
    ...new Set(
      listDataPromotion?.data?.promotions?.map((item) => item.discountType)
    ),
  ];
  console.log(isSelected, "check isSelected");
  return (
    <div className="mt-3 mb-3 table-users">
      <div className="box-select">
        <span>Hiện Có :{filteredPromotions.length}</span>
        <h1 className="text-center">Khuyến Mãi {isSelected.toUpperCase()}</h1>
        <div className="select">
          <select
            value={isSelected}
            onChange={(e) => handleChangeOption(e.target.value)}
          >
            <option value={""}>Tất cả</option>
            {newDataFilter.length > 0 &&
              newDataFilter.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã giảm giá</th>
            <th>Mô tả</th>
            <th>Loại mã</th>
            <th>Số tiền giảm</th>
            <th>Lượt dùng mã</th>
            <th>đã sử dụng</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {newListData.length > 0 ? (
            newListData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.code}</td>
                  <td>
                    <ToolTip text={item.description}>
                      {cutString(item.description)}
                    </ToolTip>
                  </td>
                  <td>{item.discountType}</td>
                  <td>{formatDiscount(item.discount)}</td>
                  <td>{item.maxUsage ? item.maxUsage : 0}</td>

                  <td>{item.usedCount}</td>
                  <td>
                    <button className="btn btn-secondary">Chi Tiết</button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleClickDelete(item._id, item.code)}
                    >
                      Xóa
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleClickSua(item)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11}> No Data</td>
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

export default React.memo(TablePromotion);
