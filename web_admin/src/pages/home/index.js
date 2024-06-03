import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowHeader } from "../../store/headerShow/actions";
import { useLocation } from "react-router-dom";
import { setLocation } from "../../store/location/actions";
const Home = (props) => {
  console.log("render Home");
  const dispatch = useDispatch();
  const location = useLocation();
  let pathNameLocation = location.pathname;
  useEffect(() => {
    dispatch(setShowHeader());
    dispatch(setLocation(pathNameLocation));
  }, [dispatch, pathNameLocation]);
  return <div>Home</div>;
};

export default Home;
