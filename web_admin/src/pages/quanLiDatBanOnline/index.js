import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiBanOnlineSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";

const QuanLiDatBanOnline = (props) => {
  console.log("render QuanLiDatBanOnline");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className="container">
        <QuanLiBanOnlineSlice />
      </div>
    </div>
  );
};

export default QuanLiDatBanOnline;
