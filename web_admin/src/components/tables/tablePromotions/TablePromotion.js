import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useState } from "react";
import { getPromotion } from "../../../api/call_api/promotions/fetchApiPromotions";
import ToolTip from "../../ToolTip/ToolTip";
import { cutString } from "../../../utils/cutValue";
import { toast } from "react-toastify";

const TablePromotion = ({
  listDataPromotion,
  setListDataPromotion,
  setShow,
  setItemPromotion,
  setStatusPromotion,
}) => {
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [isSelected, setIsSelected] = useState("");
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
    ...new Set(filteredPromotions.map((item) => item.discountType)),
  ];
  console.log(newDataFilter);
  return (
    <div className="mt-3 mb-3 table-users">
      <div className="box-select">
        <span>
          Voucher{" "}
          {newDataFilter.length > 2
            ? "Khả Dụng"
            : newDataFilter.map((item) => (
                <span>{item.toUpperCase()}</span>
              ))}{" "}
          : {filteredPromotions.length}
        </span>
        <h1 className="text-center">Voucher</h1>
        <div className="select">
          <select
            value={isSelected}
            onChange={(e) => handleChangeOption(e.target.value)}
          >
            <option value={""}>Tất cả voucher</option>
            <option value={"fixed"}>Giảm giá theo món</option>
            <option value={"percentage"}>Giảm giá tối thiểu </option>
            <option value={"maxPercentage"}>Giảm giá tối đa</option>
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
          {filteredPromotions.length > 0 ? (
            filteredPromotions.map((item, index) => {
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
                    <button className="btn btn-secondary">View</button>
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
    </div>
  );
};

export default React.memo(TablePromotion);
