import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Modal/Tables/ModalDeleteTable";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  getCreateMenuItemState,
  getDeleteMenuItemState,
  getStatusMenuItemState,
  getUpdateMenuItemState,
  getValueCategoryIdState,
  getValueDescriptionState,
  getValueEngNameState,
  getValueImageState,
  getValueNameState,
  getValueOptionsState,
  getValuePriceState,
} from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import FormMenu from "../../form/formMenu/FormMenu";
import {
  destroyMenuItem,
  patchMenuItem,
  postMenuItem,
} from "../../../api/call_api/menuItem/fetchApiMenuItem";
const ModalMenuItem = ({ show, handleClose, setShow }) => {
  const getStatusMenuItem = useSelector(getStatusMenuItemState);
  const statusCreateItem = useSelector(getCreateMenuItemState);
  const { isLoadingCreateMenuItem } = statusCreateItem;
  const statusDeleteItem = useSelector(getDeleteMenuItemState);
  const { isLoadingDeleteMenuItem } = statusDeleteItem;
  const statusUpdateItem = useSelector(getUpdateMenuItemState);
  const { isLoadingUpdateMenuItem } = statusUpdateItem;
  const dataDelete = getStatusMenuItem[1];
  const name = useSelector(getValueNameState);
  const engName = useSelector(getValueEngNameState);
  const description = useSelector(getValueDescriptionState);
  const price = useSelector(getValuePriceState);
  const image = useSelector(getValueImageState);
  const category_id = useSelector(getValueCategoryIdState);
  const option = useSelector(getValueOptionsState);
  const dispatch = useDispatch();

  const handleClickCreateMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (getStatusMenuItem[0] === "create") {
      formData.append("name", name);
      formData.append("engName", engName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image_url", image);
      formData.append("category_id", category_id);
      const arrToStr = option?.map((element) => element._id);
      formData.append("options", JSON.stringify(arrToStr));

      await postMenuItem(dispatch, formData, setShow);
    }
    if (getStatusMenuItem[0] === "delete") {
      await destroyMenuItem(dispatch, dataDelete._id, setShow);
    }
    if (getStatusMenuItem[0] === "update") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("engName", engName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image_url", image);
      formData.append("category_id", category_id);
      const arrToStr = option?.map((element) => element._id);
      formData.append("options", JSON.stringify(arrToStr));

      await patchMenuItem(dispatch, dataDelete._id, formData, setShow);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>
            {getStatusMenuItem[0] === "create"
              ? "Create Menu Item"
              : getStatusMenuItem[0] === "delete"
              ? "Delete Menu Item"
              : getStatusMenuItem[0] === "update"
              ? "Update Menu Item"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusMenuItem[0] === "create" ? (
            <FormMenu />
          ) : getStatusMenuItem[0] === "delete" ? (
            <>
              <span>Bạn có chắc chắn là muốn xóa món </span>
              <span
                style={{ color: "red", fontSize: "1rem", fontWeight: "bold" }}
              >
                {dataDelete?.name}
              </span>
              <span> này không?</span>
            </>
          ) : getStatusMenuItem[0] === "update" ? (
            <FormMenu />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickCreateMenuItem}>
            {isLoadingCreateMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "create" ? (
              "create"
            ) : isLoadingDeleteMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "delete" ? (
              "Delete"
            ) : isLoadingUpdateMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "update" ? (
              "Update"
            ) : (
              ""
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalMenuItem;
