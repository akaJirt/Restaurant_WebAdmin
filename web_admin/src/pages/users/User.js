import React, { useState } from "react";
import "./User.scss";
import TableUser from "../../components/tables/TableUsers/TableUser";
import { useDispatch, useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Layout } from "antd";
import ModalUsers from "../../components/Modal/Users/ModalUsers";
import { setStatusUsers } from "../../store/auth/setStatusUsers/actions";

// Hàm viết hoa chữ cái đầu tiên
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const User = (props) => {
  console.log("render User");
  const [role, setRole] = useState("admin");
  const [show, setShow] = useState(false);
  const { Content } = Layout;
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  const handleClickAddNewUser = () => {
    setShow(true);
    dispatch(setStatusUsers.setStatus(["create"]));
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Layout className={`layout-user ${theme ? "theme" : ""}`}>
      <Content>
        <h1 className="text-h1">
          Quản Lí{" "}
          {capitalizeFirstLetter(role) === "True"
            ? "Users Đã xác thực"
            : capitalizeFirstLetter(role) === "False"
            ? "Users Chưa xác thực"
            : capitalizeFirstLetter(role)}
        </h1>
        <button
          className="mx-3 btn btn-primary bt"
          onClick={handleClickAddNewUser}
        >
          Add New User
        </button>
        <ModalUsers show={show} handleClose={handleClose} setShow={setShow} />
        <TableUser
          role={role}
          setRole={setRole}
          capitalizeFirstLetter={capitalizeFirstLetter}
          setShow={setShow}
        />
      </Content>
    </Layout>
  );
};

export default React.memo(User);
