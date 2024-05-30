import React, { useCallback, useEffect } from "react";
import "./LoginForm.scss";
import "./RegisterForm.scss";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import FormRegisterUser from "./formRegisterUser/FormRegisterUser";
import { FloatButton } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { hideScrollTop, showScrollTop } from "../../store/scrollTop/actions";
import { getScrollState } from "../../store/selector";
const RegisterForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scroll = useSelector(getScrollState);
  const handleClickLogin = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        dispatch(showScrollTop());
      } else {
        dispatch(hideScrollTop());
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
    <div className="content-login-from form-register">
      <div className="logo-title mb-3">
        <img src={logo} alt="logo" />
        <h3>NiceAdmin</h3>
      </div>
      <div className="form-login">
        <div className="box-title">
          <h5 className="text-center">Create an Account</h5>
          <p className="text-center">
            Enter your personal details to create account
          </p>
        </div>
        <FormRegisterUser />
        <div className="text-footer mt-3">
          <span>Already have account?</span>
          <span onClick={handleClickLogin}>Login</span>
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

export default RegisterForm;
