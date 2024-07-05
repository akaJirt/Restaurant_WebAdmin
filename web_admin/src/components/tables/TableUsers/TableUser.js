import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersState, getThemeState } from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import ModalUsers from "../../Modal/Users/ModalUsers";
import { setStatusUsers } from "../../../store/auth/setStatusUsers/actions";
const TableUser = ({ role, setRole, capitalizeFirstLetter, setShow }) => {
  console.log("render TableUser");
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const allUsersState = useSelector(getAllUsersState);
  const { dataGetAllUsers, isLoadingGetAllUsers } = allUsersState;
  const data = dataGetAllUsers?.data?.users;
  //*****************************PAGE***************************************** */
  const totalPageCount = 2;
  const offset = currentPage * totalPageCount;
  const itemCount = data
    ?.filter(
      (item) => item.role === role || item.isVerified.toString() === role
    )
    .slice(offset, offset + totalPageCount);
  const itemPage = data?.filter(
    (item) => item.role === role || item.isVerified.toString() === role
  ).length;
  const totalPage = Math.ceil(itemPage / totalPageCount);
  const handleChange = (e) => {
    setRole(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  //********************************************************************** */

  const handleClickXoa = (item, e) => {
    e.preventDefault();
    dispatch(setStatusUsers.setStatus(["delete", item]));
    setShow(true);
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <ModalUsers />
      {isLoadingGetAllUsers ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-h1-select">
            <span></span>
            <h1 className="text-center mb-2">
              {role === "admin" ||
              role === "staff" ||
              role === "client" ||
              role === "true"
                ? capitalizeFirstLetter(role) === "True"
                  ? "Đã xác thực"
                  : capitalizeFirstLetter(role)
                : "Quản Lí Người Dùng"}
            </h1>
            <select value={role} onChange={handleChange}>
              <option value={"admin"}>Admin</option>
              <option value={"staff"}>Nhân Viên</option>
              <option value={"client"}>Khách Hàng</option>
              <option value={"true"}>Đã xác thực</option>
            </select>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Role</th>
                <th>Create_At</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {itemCount?.length > 0 ? (
                itemCount?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td className="img">
                        <img alt="h1" src={item.img_avatar_url} />
                      </td>
                      <td>{item.role}</td>

                      <td>
                        {moment(item.violations.violation_date).format(
                          "DD-MM-YYYY ~ HH:mm:ss"
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={(e) => handleClickXoa(item, e)}
                          disabled={item.isVerified === true ? true : false}
                        >
                          Xóa
                        </button>
                        <button className="btn btn-primary">Sửa</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>No data</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      {itemCount?.length > 0 && (
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
          forcePage={currentPage}
        />
      )}
    </div>
  );
};

export default TableUser;
