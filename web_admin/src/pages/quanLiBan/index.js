import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import "./index.scss";
import { QuanLiBanSlice } from "../../utils/sliceString";
const QuanLiBan = (props) => {
  console.log("render QuanLiBan");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiBanSlice />
    </div>
  );
};

export default QuanLiBan;
