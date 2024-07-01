import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItemState, getThemeState } from "../../../store/selector";
import { getAllMenuItem } from "../../../api/call_api/menuItem/fetchApiMenuItem";
import "./TableMenu.scss";
import LoadingTableMenu from "./LoadingTableMenu";
import { LoadingOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";

const TableMenu = () => {
  console.log("TABLE MENU");
  const [category, setCategory] = useState("Món chính");
  console.log(category);
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const getMenuItemState = useSelector(getAllMenuItemState);
  const { dataMenuItem, isLoadingMenuItem } = getMenuItemState;
  const data = dataMenuItem?.data;
  /************************************* PHAN TRANG************************************** */
  const itemPage = 5;
  const offset = currentPage * itemPage;
  const itemList = data
    ?.filter((item) => category === item.category)
    .slice(offset, offset + itemPage);
  const pageCount = data?.filter((item) => category === item.category).length;
  const totalPage = Math?.ceil(pageCount / itemPage);
  console.log(itemList);

  const handlePageChange = useCallback((selectedPage) => {
    setCurrentPage(selectedPage.selected);
  }, []);
  const handleChangSelect = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };
  /************************************************************************************* */

  const getMenuItem = useCallback(async () => {
    await getAllMenuItem(dispatch);
  }, [dispatch]);
  useEffect(() => {
    getMenuItem();
  }, [getMenuItem]);

  return (
    <div className="mt-3 mb-3 table-users">
      {isLoadingMenuItem ? (
        <div className="box-loading text-center">
          <LoadingOutlined className={`loading ${theme ? "theme" : ""}`} />
        </div>
      ) : (
        <>
          <div className="box-users">
            <h1>Total Menu Items : {dataMenuItem?.totalMenuItems}</h1>
            <h1 className="text-center">GET MENUS</h1>
            <div className="select">
              <select value={category} onChange={handleChangSelect}>
                <option value={"Món chính"}>Món Chính</option>
                <option value={"Món khai vị"}>Món Khai Vị</option>
                <option value={"Món tráng miệng"}>Món Tráng Miệng</option>
                <option value={"Món phụ"}>Món Phụ</option>
                <option value={"Thức uống"}>Thức Uống</option>
              </select>
            </div>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Name</th>
                <th>EngName</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {itemList?.length > 0 ? (
                itemList?.map((item, index) => (
                  <LoadingTableMenu
                    key={index}
                    item={item}
                    index={index}
                    offset={offset}
                    category={category}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No data</td>
                </tr>
              )}
            </tbody>
          </Table>
          <ReactPaginate
            className={`pagination`}
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
        </>
      )}
    </div>
  );
};

export default React.memo(TableMenu);
