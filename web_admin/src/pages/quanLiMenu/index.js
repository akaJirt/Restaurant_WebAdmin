import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";

const QuanLiMenu = (props) => {
  console.log("render QuanLiMenu");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return <div>QuanLiMenu</div>;
};

export default QuanLiMenu;
