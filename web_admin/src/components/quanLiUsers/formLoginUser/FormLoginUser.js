import React, { useCallback, useEffect, useRef, useState } from "react";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../../../store/selector";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { typeActionLogins } from "../../../store/auth/login/actions";
import { setAccessToken } from "../../../store/accessToken/actions";
const FormLoginUser = (props) => {
  console.log("render FormLoginUser");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const input1 = useRef();
  const login = useSelector(getLoginState);
  const { isLoading, isError, isLogin } = login;

  const handleClickLogin = (e) => {
    e.preventDefault();
    const payload = { userName, password };
    dispatch(typeActionLogins.fetchRequest(payload));
  };
  const stateLogin = useCallback(() => {
    if (isLogin) {
      if (isLogin?.EC === 0 || isLogin?.DT) {
        toast.success(isLogin.EM);
        dispatch(setAccessToken(isLogin?.DT?.accessToken));
        input1.current.focus();
        navigate("/");
      } else {
        toast.error(isLogin?.EM);
      }
    } else if (isError) {
      toast.error("An error occurred during login.");
    }
  }, [isLogin, isError, navigate, dispatch]);
  useEffect(() => {
    console.log("start");
    stateLogin();
    console.log("end");
  }, [stateLogin]);
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">PhoneNumber</label>
        <input
          ref={input1}
          type="text"
          className="form-control"
          placeholder="enter phone..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="enter password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <Checkbox className="text-checkbox">Remember me</Checkbox>
      </div>
      <div className="text-center button mt-3">
        <button onClick={handleClickLogin} className="btn btn-primary">
          {isLoading ? <LoadingOutlined /> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormLoginUser);
