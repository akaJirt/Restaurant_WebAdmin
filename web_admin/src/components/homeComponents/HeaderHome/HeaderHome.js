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
import { useDispatch } from "react-redux";
import { setShowSlider } from "../../../store/sliderShow/acttions";
import logo from "../../../images/logo.png";
import avatar from "../../../images/messages-1.jpg";
import { setShowTheme } from "../../../store/theme/actions";

const HeaderHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(false);
  const dispatch = useDispatch();
  const { Header } = Layout;
  useEffect(() => {
    dispatch(setShowSlider(collapsed));
  }, [collapsed, dispatch]);
  return (
    <Layout>
      <Header className={`header-home ${theme ? "theme" : ""}`}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="button"
        />
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
              onClick={() => setTheme(!theme)}
            />
          ) : (
            <SunFilled className="icon-sun" onClick={() => setTheme(!theme)} />
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
