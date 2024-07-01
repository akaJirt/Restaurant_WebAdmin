import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersState, getThemeState } from "../../../store/selector";
import { getAllUsers } from "../../../api/call_api/auth/fetchApiAuth";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
const TableUser = ({ role, setRole, capitalizeFirstLetter }) => {
  console.log("render TableUser");
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  console.log(role);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const allUsersState = useSelector(getAllUsersState);
  const { dataGetAllUsers, isLoadingGetAllUsers } = allUsersState;
  const data = dataGetAllUsers?.data?.users;
  //*****************************PAGE***************************************** */
  const totalPageCount = 2;
  const offset = currentPage * totalPageCount;
  const itemCount = data
    ?.filter((item) => item.role === role)
    .slice(offset, offset + totalPageCount);
  const itemPage = data?.filter((item) => item.role === role).length;
  const totalPage = Math.ceil(itemPage / totalPageCount);
  const handleChange = (e) => {
    setRole(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  //********************************************************************** */

  const handleClickXoa = (item) => {
    setShow(true);
    setItem(item);
  };

  useEffect(() => {
    const getUsers = async () => {
      await getAllUsers(dispatch);
    };
    getUsers();
  }, [dispatch]);
  return (
    <div className="mt-3 mb-3 table-users">
      {isLoadingGetAllUsers ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-h1-select">
            <h1></h1>
            <h1 className="text-center mb-2">
              {role === "admin" || role === "staff" || role === "client"
                ? capitalizeFirstLetter(role)
                : "Quản Lí Người Dùng"}
            </h1>
            <select value={role} onChange={handleChange}>
              <option value={"admin"}>Admin</option>
              <option value={"staff"}>Nhân Viên</option>
              <option value={"client"}>Khách Hàng</option>
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
                      <td>{index + 1}</td>
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
                        <button className="btn btn-danger mx-2">Xóa</button>
                        <button className="btn btn-primary">Sửa</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No data</td>
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
