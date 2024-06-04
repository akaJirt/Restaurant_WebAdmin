import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiKhuyenMaiSlice } from "../../utils/sliceString";

function QuanLiKhuyenMaiVaThongBao(props) {
  console.log("render QuanLiKhuyenMaiVaThongBao");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiKhuyenMaiSlice />
    </div>
  );
}

export default QuanLiKhuyenMaiVaThongBao;
