import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";

const QuanLiThongKeVaBaoCao = (props) => {
  console.log("render QuanLiThongKeVaBaoCao");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiThongKeVaBaoCao</div>;
};

export default QuanLiThongKeVaBaoCao;
