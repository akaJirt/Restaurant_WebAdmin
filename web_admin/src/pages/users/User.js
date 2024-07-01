import React, { useState } from "react";
import "./User.scss";
import TableUser from "../../components/tables/TableUsers/TableUser";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Layout } from "antd";
import ModalUsers from "../../components/Modal/Users/ModalUsers";

// Hàm viết hoa chữ cái đầu tiên
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const User = (props) => {
  console.log("render User");
  const [role, setRole] = useState("admin");
  const [show, setShow] = useState(false);
  const { Content } = Layout;
  const theme = useSelector(getThemeState);
  const handleClickAddNewUser = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Layout className={`layout-user ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">Quản Lí {capitalizeFirstLetter(role)}</h1>
        <button
          className="mx-3 btn btn-primary bt"
          onClick={handleClickAddNewUser}
        >
          Add New User
        </button>
        <ModalUsers show={show} handleClose={handleClose} />
        <TableUser
          role={role}
          setRole={setRole}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
      </Content>
    </Layout>
  );
};

export default React.memo(User);
