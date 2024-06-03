import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";

function QuanLiKhuyenMaiVaThongBao(props) {
  console.log("render QuanLiKhuyenMaiVaThongBao");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiKhuyenMaiVaThongBao</div>;
}

export default QuanLiKhuyenMaiVaThongBao;
