import React from "react";
import { Layout } from "antd";
import "./Promotion.scss";
import FormPromotion from "../../components/form/formPromotions/FormPromotion";
import TablePromotion from "../../components/tables/tablePromotions/TablePromotion";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Promotion(props) {
  console.log("render Promotion");
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  return (
    <Layout className={`layout-promotion ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Promotions</h1>
        <FormPromotion />
        <TablePromotion />
      </Content>
    </Layout>
  );
}

export default React.memo(Promotion);
