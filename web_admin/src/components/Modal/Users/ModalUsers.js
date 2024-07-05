import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalUser.scss";
import { useSelector } from "react-redux";
import { getSetStatusUsersState, getThemeState } from "../../../store/selector";
import FormUser from "../../form/formUsers/FormUser";

const ModalUsers = ({ show, handleClose }) => {
  const theme = useSelector(getThemeState);
  console.log("render modal users");
  const getStatusUsers = useSelector(getSetStatusUsersState);
  const userItem = getStatusUsers[1];
  console.log(getStatusUsers, userItem, "STATE USERS");
  const handleClickXacNhan = () => {};
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-delete ${theme ? "theme" : ""}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {getStatusUsers[0] === "create"
              ? "Create User"
              : getStatusUsers[0] === "delete"
              ? "Delete User"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusUsers[0] === "create" ? (
            <FormUser />
          ) : getStatusUsers[0] === "delete" ? (
            <div>
              <span>Bạn có chắc là muốn xóa </span>
              <span
                style={{ color: "red", fontSize: "1.2rem", fontWeight: "bold" }}
              >{`${userItem?.role} ${userItem.fullName}`}</span>
              <span> này không?</span>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant={
              getStatusUsers[0] === "create"
                ? "primary"
                : getStatusUsers[0] === "delete"
                ? "danger"
                : ""
            }
            onClick={handleClickXacNhan}
          >
            {getStatusUsers[0] === "create"
              ? "Create"
              : getStatusUsers[0] === "delete"
              ? "Delete"
              : ""}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUsers;
