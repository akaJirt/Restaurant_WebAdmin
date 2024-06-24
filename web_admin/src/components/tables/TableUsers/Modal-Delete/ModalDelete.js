import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalDelete.scss";
import { useDispatch, useSelector } from "react-redux";
import { typeActionDeleteUser } from "../../../../store/auth/deleteUser/actions";
import { getDeleteUserState, getLoginState } from "../../../../store/selector";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { typeActionAllUser } from "../../../../store/auth/getAllUser/actions";
const ModalDelete = ({
  show,
  handleClose,
  item,
  setShow,
  currentPage,
  size,
  setCurrentPage,
}) => {
  console.log(currentPage, size, "LOC");
  console.log(item, "item");
  const dispatch = useDispatch();
  const login = useSelector(getLoginState);
  const { isLogin } = login;
  const deleteUser = useSelector(getDeleteUserState);
  const { isDeleteUser } = deleteUser;
  const handleClickXacNhan = () => {
    const payload = {
      id: item.id,
      accessToken: isLogin?.DT?.accessToken,
    };
    dispatch(typeActionDeleteUser.fetchDeleteUserRequest(payload));
  };
  const stateDelete = useCallback(() => {
    if (isDeleteUser) {
      if (isDeleteUser?.DT === 1 || isDeleteUser?.EC === 0) {
        toast.success(isDeleteUser?.EM);
        setShow(false);

        setCurrentPage(1);

        const payload = {
          page: currentPage,
          size: size,
          accessToken: isLogin?.DT?.accessToken,
        };
        dispatch(typeActionAllUser.fetchAllUserRequest(payload));
      } else {
        toast.error(isDeleteUser?.EM);
      }
    }
    dispatch(typeActionDeleteUser.fetchResetUserFailed(null));
  }, [
    isDeleteUser,
    setShow,
    dispatch,
    size,
    currentPage,
    isLogin?.DT?.accessToken,
    setCurrentPage,
  ]);
  useEffect(() => {
    stateDelete();
  }, [stateDelete]);

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
