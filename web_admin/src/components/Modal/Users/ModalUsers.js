import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  emailState,
  fullNameState,
  getSetStatusUsersState,
  getThemeState,
  passwordState,
  roleState,
} from "../../../store/selector";
import FormUser from "../../form/formUsers/FormUser";
import "./ModalUsers.scss";
import { destroyUser, postUser } from "../../../api/call_api/auth/fetchApiAuth";
import { Tag } from "antd";

const ModalUsers = ({ show, handleClose, setShow }) => {
  console.log("render modal users");
  const fullName = useSelector(fullNameState);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const role = useSelector(roleState);
  const theme = useSelector(getThemeState);
  const getStatusUsers = useSelector(getSetStatusUsersState);
  console.log(getStatusUsers, "<<<<<<<<<<<<<<<getStatusUsers");
  const dispatch = useDispatch();
  const userItem = getStatusUsers[1];
  console.log(getStatusUsers, userItem, "STATE USERS");
  const handleClickXacNhan = async () => {
    if (getStatusUsers[0] === "create") {
      const data = {
        fullName,
        email,
        password,
        role,
      };
      await postUser(dispatch, data, handleClose);
    }
    if (getStatusUsers[0] === "delete") {
      await destroyUser(dispatch, userItem._id, handleClose);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-delete ${theme ? "theme" : ""}`}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {getStatusUsers[0] === "create"
              ? "Tạo mới người dùng"
              : getStatusUsers[0] === "delete"
              ? "Xóa người dùng"
              : "Cập nhật người dùng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusUsers[0] === "create" ? (
            <FormUser />
          ) : getStatusUsers[0] === "delete" ? (
            <div>
              <span>Bạn có chắc là muốn xóa </span>
              <Tag color="red">{`${
                userItem?.role === "client"
                  ? "khách hàng"
                  : userItem?.role === "admin"
                  ? "quản lí"
                  : userItem?.role === "staff"
                  ? "nhân viên"
                  : userItem?.role
              } ${userItem.fullName}`}</Tag>
              <span>này không?</span>
            </div>
          ) : getStatusUsers[0] === "update" ? (
            <>
              <FormUser />
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant={
              getStatusUsers[0] === "create"
                ? "primary"
                : getStatusUsers[0] === "delete"
                ? "danger"
                : "primary"
            }
            onClick={handleClickXacNhan}
          >
            {getStatusUsers[0] === "create"
              ? "Tạo"
              : getStatusUsers[0] === "delete"
              ? "Xóa"
              : "Cập nhật"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUsers;
