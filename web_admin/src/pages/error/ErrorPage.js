import React, { useEffect } from "react";
import "./ErrorPage.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowSlider } from "../../store/sliderShow/acttions";
const ErrorPage = (props) => {
  console.log("render ErrorPage");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setShowSlider(false));
  }, [dispatch]);
  return (
    <div className="content-error-page">
      <h1 className="h1 text-center">404</h1>
      <h2 className="text-center">
        The page you are looking for doesn't exist.
      </h2>
      <div className="text-center">
        <NavLink to={"/"} end>
          <button>Back to home</button>
        </NavLink>
      </div>
      <div className="img ">
        <img
          src="http://127.0.0.1:5500/assets/img/not-found.svg"
          alt="not-found"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
