import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import "./index.scss";
import { QuanLiBanSlice } from "../../utils/sliceString";
import { getThemeState } from "../../store/selector";
const QuanLiBan = (props) => {
  console.log("render QuanLiBan");
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  useEffect(() => {
    dispatch(setShowHeader());
  }, [dispatch]);
  return (
    <div className={`content-container ${theme ? "theme" : ""}`}>
      <div className={"container"}>
        <QuanLiBanSlice />
      </div>
    </div>
  );
};

export default QuanLiBan;
