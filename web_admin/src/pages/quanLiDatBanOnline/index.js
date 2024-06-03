import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";

const QuanLiDatBanOnline = (props) => {
  console.log("render QuanLiDatBanOnline");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiDatBanOnline</div>;
};

export default QuanLiDatBanOnline;
