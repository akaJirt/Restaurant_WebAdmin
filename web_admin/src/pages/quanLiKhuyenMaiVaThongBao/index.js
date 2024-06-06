import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiKhuyenMaiSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";

function QuanLiKhuyenMaiVaThongBao(props) {
  console.log("render QuanLiKhuyenMaiVaThongBao");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className="container">
        <QuanLiKhuyenMaiSlice />
      </div>
    </div>
  );
}

export default QuanLiKhuyenMaiVaThongBao;
