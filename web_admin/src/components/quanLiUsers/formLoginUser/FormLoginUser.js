import React, { useRef, useState } from "react";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getLoginState } from "../../../store/selector";
import {
  EyeOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Login } from "../../../api/call_api/auth/fetchApiAuth";
import { useNavigate } from "react-router-dom";
import "./FormLoginUser.scss";
const FormLoginUser = (props) => {
  console.log("render FormLoginUser");
  const [isEye, setIsEye] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const input1 = useRef();
  const login = useSelector(getLoginState);
  const { isLoading } = login;
  const navigate = useNavigate();

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    await Login(payload, dispatch, setEmail, setPassword, navigate);
  };

  const handleCheckBox = (e) => {
    const check = e.target.checked;
    if (check) {
      setEmail("phungloc6102003@gmail.com");
      setPassword("123456aA");
    }
  };
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">PhoneNumber</label>
        <input
          ref={input1}
          type="text"
          className="form-control"
          placeholder="enter phone..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">Password</label>
        <div className="box-ip-ic">
          <input
            type={isEye ? "text" : "password"}
            className="form-control"
            placeholder="enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isEye ? (
            <EyeOutlined className="icon-eye" onClick={() => setIsEye(false)} />
          ) : (
            <EyeInvisibleOutlined
              className="icon-eye"
              onClick={() => setIsEye(true)}
            />
          )}
        </div>
      </div>
      <div className="form-group">
        <Checkbox className="text-checkbox" onChange={handleCheckBox}>
          Remember me
        </Checkbox>
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
