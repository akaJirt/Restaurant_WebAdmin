import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiUserSlice } from "../../utils/sliceString";

const QuanLiUser = (props) => {
  console.log("render QuanLiUser");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className="container">
      <QuanLiUserSlice />
    </div>
  );
};

export default QuanLiUser;
