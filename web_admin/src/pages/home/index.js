import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { useLocation } from "react-router-dom";
import { setLocation } from "../../store/location/actions";
import "./index.scss";
import CardHome1 from "../../components/card/card-show1/CardHome1";
import CardHome2 from "../../components/card/card-show1/CardHome2";
import CardHome3 from "../../components/card/card-show1/CardHome3";
import CardChart from "../../components/card/card-show2/CardChart";

const Home = (props) => {
  console.log("render Home");
  const dispatch = useDispatch();
  const location = useLocation();
  let pathNameLocation = location.pathname;
  useEffect(() => {
    dispatch(setShowHeader());
    dispatch(setLocation(pathNameLocation));
  }, [dispatch, pathNameLocation]);
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
          </div>
          <div className="box-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
