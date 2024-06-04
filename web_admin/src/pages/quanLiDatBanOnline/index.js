import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiBanOnlineSlice } from "../../utils/sliceString";

const QuanLiDatBanOnline = (props) => {
  console.log("render QuanLiDatBanOnline");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiBanOnlineSlice />
    </div>
  );
};

export default QuanLiDatBanOnline;
