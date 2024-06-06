import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiMenuSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";
const QuanLiMenu = (props) => {
  console.log("render QuanLiMenu");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className="container">
        <QuanLiMenuSlice />
      </div>
    </div>
  );
};

export default QuanLiMenu;
