import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAccessTokenState, getThemeState } from "../../store/selector";
import { getMe } from "../../api/call_api/auth/fetchApiAuth";
const Home = () => {
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  const token = useSelector(getAccessTokenState);
  console.log(token, "TOKEN HOME");
  const dispatch = useDispatch();

  useEffect(() => {
    const getMeStatus = async () => {
      await getMe(dispatch);
    };
    getMeStatus();
  }, [dispatch]);

  return (
    <Layout className={`layout-home ${theme ? "theme" : ""}`}>
      <Content>
        <div className="row">
          <div className="col-8">
            <div className="left-cart-1">
              <div className="box-1">
                <CardHome1 />
              </div>
              <div className="box-2">
                <CardHome2 />
              </div>
              <div className="box-3">
                <CardHome3 />
              </div>
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
