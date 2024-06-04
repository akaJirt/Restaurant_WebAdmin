import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiMenuSlice } from "../../utils/sliceString";

const QuanLiMenu = (props) => {
  console.log("render QuanLiMenu");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiMenuSlice />
    </div>
  );
};

export default QuanLiMenu;
