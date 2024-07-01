import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalDeleteTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteTableState } from "../../../store/selector";
import { destroyTable } from "../../../api/call_api/tables/fetchApiTable";
import { LoadingOutlined } from "@ant-design/icons";
const ModalDeleteTable = ({ show, handleClose, itemTable, setShow }) => {
  console.log(itemTable);
  const getStateDelete = useSelector(getDeleteTableState);
  const dispatch = useDispatch();
  const handleClickDelete = async () => {
    await destroyTable(dispatch, itemTable._id, setShow);
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
              <span>Bạn có chắc chắn là muốn xóa bàn số</span>
              <span className="span"> {itemTable.tableNumber}</span>
              <span> này không ?</span>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            {getStateDelete?.isLoading ? <LoadingOutlined /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(ModalDeleteTable);
