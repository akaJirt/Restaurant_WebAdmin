import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiThongKeVaBaoCaoSlice } from "../../utils/sliceString";

const QuanLiThongKeVaBaoCao = (props) => {
  console.log("render QuanLiThongKeVaBaoCao");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiThongKeVaBaoCaoSlice />
    </div>
  );
};

export default QuanLiThongKeVaBaoCao;
