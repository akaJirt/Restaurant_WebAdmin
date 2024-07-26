import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersState, getThemeState } from "../../../store/selector";
import moment from "moment";
import ModalUsers from "../../Modal/Users/ModalUsers";
import { setStatusUsers } from "../../../store/auth/setStatusUsers/actions";
import { getAllUsers } from "../../../api/call_api/auth/fetchApiAuth";
import { AiOutlineSwapRight } from "react-icons/ai";
import _ from "lodash";
const TableUser = ({ role, setRole, capitalizeFirstLetter, setShow }) => {
  console.log("render TableUser");
  const [currentPage, setCurrentPage] = useState(0);
  const [isClick, setIsClick] = useState("up");
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const allUsersState = useSelector(getAllUsersState);
  const { dataGetAllUsers } = allUsersState;
  const data = dataGetAllUsers?.data?.users;
  const [itemCount, setItemCount] = useState([]);

  const getApiUsers = useCallback(async () => {
    await getAllUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getApiUsers();
  }, [getApiUsers]);
  const totalPageCount = 5;
  const offset = currentPage * totalPageCount;

  useEffect(() => {
    const listData = () => {
      const itemCount = data
        ?.filter(
          (item) => item.role === role || item.isVerified.toString() === role
        )
        .slice(offset, offset + totalPageCount);

      setItemCount(itemCount);
    };
    listData();
  }, [data, offset, role]);

  // Memoized sorted itemCount
  const sortedItemCount = useMemo(() => {
    const sortedData = _.cloneDeep(itemCount);
    if (isClick === "up") {
      sortedData?.sort((a, b) => b.fullName.localeCompare(a.fullName));
    } else {
      sortedData?.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    return sortedData;
  }, [itemCount, isClick]);

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

  console.log(isClick, "check");
  const handleClickSort = () => {
    if (isClick === "up") {
      setIsClick("down");
      return;
    }
    if (isClick === "down") {
      setIsClick("up");
      return;
    }
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <ModalUsers />
      <div>
        <div className="box-h1-select">
          <span></span>
          <h1 className="text-center mb-2">
            {role === "admin" ||
            role === "staff" ||
            role === "client" ||
            role === "true" ||
            role === "false"
              ? capitalizeFirstLetter(role) === "True"
                ? "Đã xác thực"
                : capitalizeFirstLetter(role) === "False"
                ? "Chưa xác thực"
                : capitalizeFirstLetter(role)
              : "Quản Lí Người Dùng"}
          </h1>
          <select value={role} onChange={handleChange}>
            <option value={"admin"}>Admin</option>
            <option value={"staff"}>Nhân Viên</option>
            <option value={"client"}>Khách Hàng</option>
            <option value={"true"}>Đã xác thực</option>
            <option value={"false"}>Chưa xác thực</option>
          </select>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Stt</th>
              <th className="th">
                Full Name
                <span className="ic-swap" onClick={handleClickSort}>
                  <AiOutlineSwapRight
                    className={`ic-up ${isClick === "up" ? "click" : ""}`}
                  />
                  <AiOutlineSwapRight
                    className={`ic-down ${isClick === "down" ? "click" : ""}`}
                  />
                </span>
              </th>
              <th>Email</th>
              <th>Avatar</th>
              <th>Role</th>
              <th>Create_At</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {sortedItemCount?.length > 0 ? (
              sortedItemCount?.map((item, index) => {
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
      </div>
      {sortedItemCount?.length > 0 && (
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
