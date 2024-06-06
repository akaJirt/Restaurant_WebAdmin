import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { QuanLiUserSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";

const QuanLiUser = (props) => {
  console.log("render QuanLiUser");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className="container">
        <QuanLiUserSlice />
      </div>
    </div>
  );
};

export default QuanLiUser;
