import React from "react";
import {
  postPromotion,
  updatePromotions,
} from "../../../api/call_api/promotions/fetchApiPromotions";

const FormPromotion = ({
  setListDataPromotion,
  statusPromotion,
  setCode,
  setDescription,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount,
  setStartDate,
  setEndDate,
  code,
  description,
  discount,
  discountType,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate,
  listDataPromotion,
  id,
}) => {
  console.log("render FormPromotion");
  const newSetArray = [
    ...new Set(
      listDataPromotion?.data?.promotions?.map((item) => item.discountType) ||
        []
    ),
  ];
  const handleClickCreatePromotion = async () => {
    if (statusPromotion[0] === "create") {
      await postPromotion(
        code,
        description,
        parseInt(discount),
        discountType,
        parseInt(minOrderValue),
        parseInt(maxDiscount),
        setListDataPromotion,
        setCode,
        setDescription,
        setDiscount,
        setDiscountType,
        setMinOrderValue,
        setMaxDiscount
      );
    }
    if (statusPromotion[0] === "update") {
      console.log(startDate, endDate, "<<<<<<<<<<<<<<");
      await updatePromotions(
        id,
        code,
        description,
        discount,
        discountType,
        minOrderValue,
        maxDiscount,
        startDate,
        endDate
      );
    }
  };

  return (
    <div className="form mb-3">
      <h1 className="text-h1 text-center mt-3 mb-3">
        {statusPromotion[0] === "update"
          ? "Update Khuyến Mãi"
          : "Tạo Khuyến Mãi"}
      </h1>
      <div className="form-group">
        <label className="form-label">Mã giảm giá</label>
        <input
          placeholder="Nhập Mã giảm giá ..."
          className="form-control"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Mô tả</label>
        <input
          placeholder="Nhập mô tả ..."
          className="form-control"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Số tiền giảm</label>
        <input
          placeholder="Nhập Số tiền giảm ..."
          className="form-control"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          type="number"
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label">Loại khuyến mãi</label>
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="form-control"
        >
          <option value={""} disabled>
            Chọn...
          </option>
          {newSetArray.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
      </div>
      {statusPromotion[0] === "update" ? (
        <>
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
        </>
      ) : (
        <></>
      )}
      <div className="form-group mt-3">
        <label className="form-label">Số tiền tối thiểu</label>
        <input
          type="number"
          placeholder="Nhập Số tiền tối thiểu ..."
          className="form-control"
          onChange={(e) => setMinOrderValue(e.target.value)}
          value={minOrderValue}
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
        />
      </div>
      <div className="mt-3 text-center">
        <button
          className="btn btn-primary"
          onClick={handleClickCreatePromotion}
        >
          {statusPromotion[0] === "create" ? "Tạo" : "cập nhật"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormPromotion);
