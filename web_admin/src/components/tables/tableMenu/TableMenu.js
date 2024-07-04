import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuItemState,
  getCategoriesState,
  getThemeState,
} from "../../../store/selector";
import { getAllMenuItem } from "../../../api/call_api/menuItem/fetchApiMenuItem";
import "./TableMenu.scss";
import LoadingTableMenu from "./LoadingTableMenu";
import { LoadingOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";

const TableMenu = ({ setShow }) => {
  console.log("TABLE MENU");
  const [category, setCategory] = useState("Món khai vị");
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const getMenuItemState = useSelector(getAllMenuItemState);
  const { dataMenuItem, isLoadingMenuItem } = getMenuItemState;
  const data = dataMenuItem?.data;
  const categoriesState = useSelector(getCategoriesState);
  const { dataGetCategories } = categoriesState;
  /************************************* PHAN TRANG************************************** */
  const itemPage = 5;
  const offset = currentPage * itemPage;
  const itemList = data
    ?.filter((item) => category === item.category)
    .slice(offset, offset + itemPage);
  const pageCount = data?.filter((item) => category === item.category).length;
  const totalPage = Math?.ceil(pageCount / itemPage);

  const handlePageChange = useCallback((selectedPage) => {
    setCurrentPage(selectedPage.selected);
  }, []);
  const handleChangSelect = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };
  useEffect(() => {
    if (currentPage >= totalPage && currentPage > 0) {
      setCurrentPage(totalPage - 1);
    }
  }, [totalPage, currentPage]);
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
                {dataGetCategories?.data?.length > 0 &&
                  dataGetCategories?.data?.map((item, index) => {
                    return (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
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
                    setShow={setShow}
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
