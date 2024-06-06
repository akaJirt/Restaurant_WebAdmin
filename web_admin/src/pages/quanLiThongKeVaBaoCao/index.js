import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiThongKeVaBaoCaoSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";

const QuanLiThongKeVaBaoCao = (props) => {
  console.log("render QuanLiThongKeVaBaoCao");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className="container">
        <QuanLiThongKeVaBaoCaoSlice />
      </div>
    </div>
  );
};

export default QuanLiThongKeVaBaoCao;
