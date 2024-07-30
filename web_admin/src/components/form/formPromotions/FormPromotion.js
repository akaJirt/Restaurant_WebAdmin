import React, { useCallback, useEffect, useState } from "react";
import {
  postPromotion,
  updatePromotions,
} from "../../../api/call_api/promotions/fetchApiPromotions";
import FormatDate from "../../../utils/FormatDate";
import { LoadingOutlined } from "@ant-design/icons";

const FormPromotion = ({
  setListDataPromotion,
  statusPromotion,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount,
  setStartDate,
  setEndDate,
  discount,
  discountType,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate,
  listDataPromotion,
  id,
  setMaxUsage,
  maxUsage,
  setStatusPromotion,
}) => {
  console.log("render FormPromotion");
  const [isLoading, setIsLoading] = useState(false);
  const newSetArray = [
    ...new Set(
      listDataPromotion?.data?.promotions?.map((item) => item.discountType) ||
        []
    ),
  ];

  const handleClickCreatePromotion = async () => {
    if (statusPromotion[0] === "create") {
      await postPromotion(
        parseInt(discount),
        discountType,
        parseInt(maxUsage),
        parseInt(minOrderValue),
        parseInt(maxDiscount),
        startDate,
        endDate,
        setListDataPromotion,
        setDiscount,
        setDiscountType,
        setMinOrderValue,
        setMaxDiscount,
        setIsLoading
      );
    }
    if (statusPromotion[0] === "update") {
      await updatePromotions(
        id,
        maxUsage,
        startDate,
        endDate,
        setListDataPromotion,
        setStatusPromotion,
        setDiscountType,
        setIsLoading
      );
    }
  };

  console.log(statusPromotion, "check statusPromotion");
  const dataFind = useCallback(() => {
    if (discountType !== "" && statusPromotion[0] !== "update") {
      let findItem = listDataPromotion?.data?.promotions?.find(
        (item) => item.discountType === discountType
      );
      if (findItem) {
        setDiscount(findItem.discount);
        setMaxUsage(findItem.maxUsage);
        setStartDate(FormatDate(findItem.startDate));
        setEndDate(FormatDate(findItem.endDate));
        setMinOrderValue(findItem.minOrderValue);
        setMaxDiscount(findItem.maxDiscount);
      } else {
        setDiscount("");
        setMaxUsage("");
        setStartDate("");
        setEndDate("");
        setMinOrderValue("");
        setMaxDiscount("");
      }
    }
  }, [
    discountType,
    listDataPromotion?.data?.promotions,
    setDiscount,
    setEndDate,
    setMaxUsage,
    setStartDate,
    setMaxDiscount,
    setMinOrderValue,
    statusPromotion,
  ]);

  useEffect(() => {
    dataFind();
  }, [dataFind]);
  return (
    <div className="form mb-3">
      <h1 className="text-h1 text-center mt-3 mb-3">
        {statusPromotion[0] === "update"
          ? "Update Khuyến Mãi"
          : "Tạo Khuyến Mãi"}
      </h1>

      <div className="form-group">
        <label className="form-label">Số tiền giảm</label>
        <input
          placeholder={
            discountType === "" || discountType !== "fixed"
              ? "Nhập % cần giảm"
              : "Nhập số tiền cần giảm"
          }
          className="form-control"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          type="number"
          disabled={statusPromotion[0] === "update" ? true : false}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Loại khuyến mãi</label>
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="form-control"
          disabled={statusPromotion[0] === "update" ? true : false}
        >
          <option value={""} disabled>
            Chọn...
          </option>
          {newSetArray.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Số lượt sử dụng</label>
        <input
          placeholder="Nhập lượt sử dụng"
          className="form-control"
          onChange={(e) => setMaxUsage(e.target.value)}
          value={maxUsage}
          type="number"
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Ngày bắt đầu</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Ngày kết thúc</label>
        <input
          type="date"
          className="form-control"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
      </div>
      {discountType === "" || discountType !== "fixed" ? (
        <>
          {discountType === "percentage" ? (
            <div className="form-group mt-3">
              <label className="form-label">Số tiền tối thiểu</label>
              <input
                type="number"
                placeholder="Nhập Số tiền tối thiểu ..."
                className="form-control"
                onChange={(e) => setMinOrderValue(e.target.value)}
                value={minOrderValue}
                disabled={statusPromotion[0] === "update" ? true : false}
              />
            </div>
          ) : (
            <>
              <div className="form-group mt-3">
                <label className="form-label">Số tiền tối thiểu</label>
                <input
                  type="number"
                  placeholder="Nhập Số tiền tối thiểu ..."
                  className="form-control"
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  value={minOrderValue}
                  disabled={statusPromotion[0] === "update" ? true : false}
                />
              </div>
              <div className="form-group mt-3">
                <label className="form-label">Số tiền tối đa</label>
                <input
                  type="number"
                  placeholder="Nhập Số tiền tối đa ..."
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  className="form-control"
                  value={maxDiscount}
                  disabled={statusPromotion[0] === "update" ? true : false}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      <div className="mt-3 text-center">
        <button
          className="btn btn-primary"
          onClick={handleClickCreatePromotion}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <LoadingOutlined spin />
          ) : statusPromotion[0] === "update" ? (
            "Cập Nhật"
          ) : (
            "Tạo"
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormPromotion);
