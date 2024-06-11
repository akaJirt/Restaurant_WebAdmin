import React from "react";
import { Layout } from "antd";
import "./AppHeader.scss";
import { Avatar, Space, Col, Row } from "antd";
import { CaretDownOutlined, SunFilled, MoonFilled } from "@ant-design/icons";
import avatar from "../../images/messages-1.jpg";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { setHideTheme, setShowTheme } from "../../store/theme/actions";
const AppHeader = () => {
  console.log("render App Header");
  const { Header } = Layout;
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  return (
    <Header
      style={{
        padding: 0,
        background: theme ? "#18172b" : "#fff",
      }}
    >
      <Row
        justify={"space-between"}
        align={"middle"}
        className={`Row ${theme ? "theme" : ""}`}
      >
        <Col flex={"auto"} className={`left-col`}>
          <Space size={12}>
            <img src={logo} alt="logo" className="img" />
            <span className="nice-admin">Nice Admin</span>
          </Space>
        </Col>
        <Col flex="auto" className="right-col">
          <Space size={10} wrap>
            {theme ? (
              <MoonFilled
                className="icon-moon"
                onClick={() => dispatch(setHideTheme())}
              />
            ) : (
              <SunFilled
                className="icon-sun"
                onClick={() => dispatch(setShowTheme())}
              />
            )}
            <div className="item-box">
              <Avatar size={36} src={<img src={avatar} alt="avatar" />} />
              <div className="item-span">
                <span>Phùng Hưng</span>
                <CaretDownOutlined />
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
