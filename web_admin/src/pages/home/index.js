import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { useLocation } from "react-router-dom";
import { setLocation } from "../../store/location/actions";
import "./index.scss";
import CardHome1 from "../../components/card/card-show1/CardHome1";
import CardHome2 from "../../components/card/card-show1/CardHome2";
import CardHome3 from "../../components/card/card-show1/CardHome3";
import CardChart from "../../components/card/card-show2/CardChart";
import CardBanChayNhat from "../../components/card/card-show3/CardBanChayNhat";
import { getScrollState } from "../../store/selector";
import { CaretUpOutlined } from "@ant-design/icons";
import { hideScrollTop, showScrollTop } from "../../store/scrollTop/actions";
import { FloatButton } from "antd";

const Home = (props) => {
  console.log("render Home");
  const dispatch = useDispatch();
  const location = useLocation();
  const scroll = useSelector(getScrollState);
  let pathNameLocation = location.pathname;
  useEffect(() => {
    dispatch(setShowHeader());
    dispatch(setLocation(pathNameLocation));
  }, [dispatch, pathNameLocation]);

  useEffect(() => {
    console.log("useEffect Home");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        return dispatch(showScrollTop());
      } else {
        return dispatch(hideScrollTop());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
  const handleClickScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="content-container">
      <div className="container">
        <h1>Home</h1>
        <div className="content-home">
          <div className="box-left">
            <div className="left-box-1">
              <CardHome1 />
              <CardHome2 />
              <CardHome3 />
            </div>
            <div className="left-box-2">
              <CardChart />
            </div>
            <div className="left-box-3">
              <CardBanChayNhat />
            </div>
          </div>
          <div className="box-right"></div>
        </div>
      </div>
      {scroll && (
        <FloatButton
          onClick={handleClickScrollTop}
          icon={<CaretUpOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
      )}
    </div>
  );
};

export default Home;
