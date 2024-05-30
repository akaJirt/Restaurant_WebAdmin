import React from "react";
import "./ErrorPage.scss";
const ErrorPage = (props) => {
  return (
    <div className="content-error-page">
      <h1 className="h1 text-center">404</h1>
      <h2 className="text-center">
        The page you are looking for doesn't exist.
      </h2>
      <div className="text-center">
        <button>Back to home</button>
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
