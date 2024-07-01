import React from "react";
import "./Review.scss";
import { Layout } from "antd";
import FormReview from "../../components/form/formReviews/FormReview";
import TableReview from "../../components/tables/TableReviews/TableReview";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Review = (props) => {
  console.log("render Review");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-review ${theme ? "theme" : ""} `}>
      <Content>
        <h1 className="text-h1">Reviews</h1>
        <button className="mx-3 btn btn-primary bt2">Add New User</button>
        <TableReview />
      </Content>
    </Layout>
  );
};

export default React.memo(Review);
