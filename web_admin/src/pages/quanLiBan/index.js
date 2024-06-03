import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";

const QuanLiBan = (props) => {
  console.log("render QuanLiBan");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiBan</div>;
};

export default QuanLiBan;
