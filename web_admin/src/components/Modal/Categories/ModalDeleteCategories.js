import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Modal/Tables/ModalDeleteTable";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteCategoryState } from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { deleteCategory } from "../../../api/call_api/categories/fetchApiCategory";
const ModalDeleteCategories = ({ show, handleClose, dataItem, setShow }) => {
  const getStateDelete = useSelector(getDeleteCategoryState);
  console.log(getStateDelete, "<<<<<<<<getStateDelete");
  const dispatch = useDispatch();
  const handleClickDelete = async () => {
    await deleteCategory(dispatch, dataItem._id, setShow);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>Delete Table</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {
            <>
              <span>Bạn có chắc chắn là muốn xóa category</span>
              <span className="span"> {dataItem?.name}</span>
              <span> này không ?</span>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            {getStateDelete?.isLoadingDeleteCategory ? (
              <LoadingOutlined />
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteCategories;
