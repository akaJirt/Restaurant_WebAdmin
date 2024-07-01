import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalUser.scss";
import { useSelector } from "react-redux";
import { getSetStatusUsersState } from "../../../store/selector";
import FormUser from "../../form/formUsers/FormUser";

const ModalUsers = ({ show, handleClose, item }) => {
  const getStatusUsers = useSelector(getSetStatusUsersState);
  const handleClickXacNhan = () => {};
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>
            {getStatusUsers[0] === "create" ? "Create User" : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusUsers[0] === "create" && (
            <div>
              <FormUser />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickXacNhan}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUsers;
