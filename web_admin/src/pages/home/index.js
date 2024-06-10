import React from "react";
import { Layout } from "antd";
import "./index.scss";
import CardHome1 from "../../components/card/card-show1/CardHome1";
import CardHome2 from "../../components/card/card-show1/CardHome2";
import CardHome3 from "../../components/card/card-show1/CardHome3";
import CardChart from "../../components/card/card-show2/CardChart";
import CardBanChay from "../../components/card/card-show3/CardBanChayNhat";
import CardDatBan from "../../components/card/card-show4/CardDatBan";
import CardMenu from "../../components/card/card-show5/CardMenu";
import CardKM from "../../components/card/card-show6/CardKhuyenMaiVaThongBao";
import CardBan from "../../components/card/card-show7/CardBan";

const Home = (props) => {
  const { Content } = Layout;
  return (
    <Layout className="layout-home">
      <Content>
        <div className="row">
          <div className="col-8">
            <div className="left-cart-1">
              <CardHome1 />
              <CardHome2 />
              <CardHome3 />
            </div>
            <div className="left-cart-2">
              <CardChart />
            </div>
            <div className="left-cart-3">
              <CardBanChay />
            </div>
            <div className="left-cart-4">
              <CardDatBan />
            </div>
          </div>
          <div className="col-4">
            <div className="right-cart-1">
              <CardMenu />
            </div>
            <div className="right-cart-2">
              <CardKM />
            </div>
            <div className="right-cart-3">
              <CardBan />
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default React.memo(Home);
