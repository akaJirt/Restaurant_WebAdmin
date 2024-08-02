import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import {
  getPromotion,
  patchStatusPromotion,
  postResetAllPromotion,
} from "../../../api/call_api/promotions/fetchApiPromotions";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { BiToggleRight, BiToggleLeft } from "react-icons/bi";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import ProgressBar from "../../progressBar/ProgressBar";
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
  const [title, setTitle] = useState("Số tiền giảm");

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
        }
        if (isSelected === "true" || isSelected === "false") {
          return item.isActive === (isSelected === "true");
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
  console.log(newListData, "<<<<<<<<<<<<<<<<<<<<<NEW DATA");
  let pageCount = Math.ceil(filteredPromotions.length / limit);

  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);

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

  const handleClickView = (item) => {
    setItemPromotion({ item });
    setStatusPromotion(["chiTiet"]);
    setShow(true);
  };

  const handleClickResetOpen = async (id, type) => {
    if (type === "open") {
      await patchStatusPromotion(id, setListDataPromotion);
    } else {
      await patchStatusPromotion(id, setListDataPromotion);
    }
  };

  const filterTitle = useCallback(() => {
    let hasFixed = false;
    let hasPercentage = false;
    let hasMaxPercentage = false;

    for (let i = 0; i < newListData.length; i++) {
      const { discountType } = newListData[i];
      if (discountType === "fixed") {
        hasFixed = true;
      } else if (discountType === "percentage") {
        hasPercentage = true;
      } else if (discountType === "maxPercentage") {
        hasMaxPercentage = true;
      }
    }

    if (hasFixed && hasPercentage && hasMaxPercentage) {
      setTitle("Giảm tiền & phần trăm");
      return;
    } else if (hasFixed && hasPercentage) {
      setTitle("Giảm tiền & phần trăm");
      return;
    } else if (hasFixed && hasMaxPercentage) {
      setTitle("Giảm tiền & phần trăm");
      return;
    } else if (hasFixed) {
      setTitle("Giảm theo tiền");
      return;
    } else if (hasPercentage || hasMaxPercentage) {
      setTitle("Giảm theo phần trăm");
      return;
    }
  }, [newListData]);

  useEffect(() => {
    filterTitle();
  }, [filterTitle]);

  const totalUsedCount =
    listDataPromotion?.data?.promotions?.length > 0 &&
    listDataPromotion?.data?.promotions?.reduce((a, b) => {
      return a + b.usedCount;
    }, 0);
  const handleClickOn = async () => {
    await postResetAllPromotion(setListDataPromotion);
  };

  return (
    <div className="mt-3 mb-3 table-users">
      <div className="box-select">
        <span>Hiện có : {filteredPromotions.length} </span>
        <h1 className="text-center">
          {isSelected.toUpperCase() === ""
            ? "Tất cả khuyến mãi"
            : isSelected === "true"
            ? "Khuyến mãi khả dụng"
            : isSelected === "false"
            ? "Khuyến mãi không khả dụng"
            : isSelected === "fixed"
            ? "Khuyến mãi theo tiền"
            : "Khuyến mãi theo phần trăm"}
        </h1>
        <div className="select">
          <select
            value={isSelected}
            onChange={(e) => handleChangeOption(e.target.value)}
          >
            <option value={""}>Tất cả</option>
            <option value={"true"}>Khả dụng</option>
            <option value={"false"}>Không khả dụng</option>
            {newDataFilter.length > 0 ? (
              newDataFilter.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })
            ) : (
              <>
                <option value={"fixed"}>fixed</option>
                <option value={"percentage"}>percentage</option>
                <option value={"maxPercentage"}>maxPercentage</option>
              </>
            )}
          </select>
        </div>
      </div>
      <div className="box-progressBar mb-3">
        <ProgressBar listDataPromotion={listDataPromotion} />
        <div>
          {totalUsedCount > 0 ? (
            <BsToggle2On
              size={20}
              color="#007bff"
              onClick={handleClickOn}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <BsToggle2Off
              size={20}
              color="#FF0000"
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã giảm giá</th>
            <th>Trạng thái</th>
            <th>Loại mã</th>
            <th>{title}</th>
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
                  <td className={item.isActive ? "" : "isActive"}>
                    {index + 1}
                  </td>
                  <td className={item.isActive ? "" : "isActive"}>
                    {item.code}
                  </td>
                  <td className={item.isActive ? "" : "isActive"}>
                    <div>{item.isActive ? "Khả dụng" : "Không khả dụng"}</div>
                    <div>
                      {item.isActive ? (
                        <BiToggleRight
                          style={{ cursor: "pointer" }}
                          size={20}
                          color="#007bff"
                          onClick={() => handleClickResetOpen(item._id, "open")}
                        />
                      ) : (
                        <BiToggleLeft
                          style={{ cursor: "pointer" }}
                          size={20}
                          color="#FF0000"
                          onClick={() =>
                            handleClickResetOpen(item._id, "close")
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td className={item.isActive ? "" : "isActive"}>
                    {item.discountType}
                  </td>
                  <td className={item.isActive ? "" : "isActive"}>
                    {formatDiscount(item.discount)}
                  </td>
                  <td className={item.isActive ? "" : "isActive"}>
                    {item.maxUsage ? item.maxUsage : 0}
                  </td>

                  <td className={item.isActive ? "" : "isActive"}>
                    {item.usedCount}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickView(item)}
                    >
                      Chi Tiết
                    </button>

                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleClickDelete(item._id, item.code)}
                      disabled={item.usedCount && item.isActive ? true : false}
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
