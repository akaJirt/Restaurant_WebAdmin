import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalDelete.scss";

const ModalDelete = ({
  show,
  handleClose,
  item,
  setShow,
  currentPage,
  size,
  setCurrentPage,
}) => {
  const handleClickXacNhan = () => {};
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>Xóa User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {
            <div className="box">
              <span>Bạn có chắc chắn là muốn xóa {item.role} </span>
              <span className="p">{item.email}</span>
              <span> này không?</span>
            </div>
          }
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

export default ModalDelete;
