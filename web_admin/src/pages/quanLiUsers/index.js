import React, { useEffect } from "react";
import { setShowHeader } from "../../store/headerShow/actions";
import { useDispatch } from "react-redux";

const QuanLiUser = (props) => {
  console.log("render QuanLiUser");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiUser</div>;
};

export default QuanLiUser;
