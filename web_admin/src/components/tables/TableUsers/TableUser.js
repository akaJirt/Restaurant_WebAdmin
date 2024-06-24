import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import {
  getAccessTokenState,
  getAllUserState,
  getThemeState,
} from "../../../store/selector";
import LoadingUser from "./LoadingUser";
import ReactPaginate from "react-paginate";
import { typeActionAllUser } from "../../../store/auth/getAllUser/actions";
import "./TableUser.scss";
import ModalDelete from "./Modal-Delete/ModalDelete";
import { toast } from "react-toastify";
import { typeActionRefreshToken } from "../../../store/refreshToken/actions";
const TableUser = () => {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [role, setRole] = useState("admin");
  console.log(role, "role");
  const [currentPage, setCurrentPage] = useState(1);
  const getAllState = useSelector(getAllUserState);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const { isAllUser, error } = getAllState;
  console.log(error, "ERROR STATE");
  const accessToken = useSelector(getAccessTokenState);
  let dataError = error?.response?.data?.EM;

  const totalPage = isAllUser?.DT?.totalPages;
  const size = 2;
  const users = isAllUser?.DT?.data;
  const requestAllUser = useCallback(() => {
    if (accessToken) {
      const payload = {
        page: currentPage,
        size: size,
        role: role,
        accessToken: accessToken,
      };
      dispatch(typeActionAllUser.fetchAllUserRequest(payload));
    }
    console.log("xuns day");
    if (dataError) {
      toast.error(dataError);
      dispatch(typeActionRefreshToken.fetchRefreshTokenRequest());
    } else {
      dispatch(typeActionAllUser.fetchAllUserReset());
    }
  }, [dispatch, currentPage, accessToken, role, dataError]);

  useEffect(() => {
    requestAllUser();
  }, [requestAllUser]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleClickXoa = (item) => {
    setShow(true);
    setItem(item);
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <div className="box-h1-select">
        <div></div>
        <h1 className="text-center mb-2">Khách Hàng</h1>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value={"admin"}>Admin</option>
          <option value={"khach hang"}>Khách hàng</option>
          <option value={"nhan vien"}>Nhân viên</option>
        </select>
      </div>
      <ModalDelete
        show={show}
        handleClose={() => setShow(false)}
        item={item}
        setShow={setShow}
        currentPage={currentPage}
        size={size}
        setCurrentPage={setCurrentPage}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Phone Number</th>
            <th>User Name</th>
            <th>Avatar</th>
            <th>Role</th>
            <th>Status</th>
            <th>Create_At</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((item, index) => (
              <LoadingUser
                key={index}
                item={item}
                handleClickXoa={() => handleClickXoa(item)}
              />
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        className={`pagination ${theme ? "theme" : ""} `}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName="page-tem"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default TableUser;
