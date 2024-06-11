import { Layout, Button, Avatar, Space } from "antd";
import "./HeaderHome.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined,
  SunFilled,
  MoonFilled,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowSlider } from "../../../store/sliderShow/acttions";
import logo from "../../../images/logo.png";
import avatar from "../../../images/messages-1.jpg";
import { setHideTheme, setShowTheme } from "../../../store/theme/actions";
import { getThemeState } from "../../../store/selector";

const HeaderHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const { Header } = Layout;
  useEffect(() => {
    dispatch(setShowSlider(collapsed));
  }, [collapsed, dispatch]);
  return (
    <Layout>
      <Header className={`header-home ${theme ? "theme" : ""}`}>
        <div className="box-button-logo">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="button"
          />
        </div>
        <div className="box-logo">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <span>Nice Admin</span>
        </div>
        <Space size={10} className="avatar">
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
          <Avatar size={36} icon={<img src={avatar} alt="avatar" />} />
          <span>Phùng Tỏn</span>
          <CaretDownOutlined />
        </Space>
      </Header>
    </Layout>
  );
};

export default HeaderHome;
