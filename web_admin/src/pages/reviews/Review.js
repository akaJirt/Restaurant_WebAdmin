import React from "react";
import "./Review.scss";
import TableReview from "../../components/tables/TableReviews/TableReview";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Review = (props) => {
  console.log("render Review");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-review ${theme ? "theme" : ""} `}>
      <h1 className="text-h1">Reviews</h1>
      <button className="mx-3 btn btn-primary bt2">Add New User</button>
      <TableReview />
    </div>
  );
};

export default React.memo(Review);
