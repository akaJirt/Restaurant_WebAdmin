import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import "./TableTable.scss";
import ModalDeleteTable from "../../Modal/Tables/ModalDeleteTable";
import { getTableState } from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { typeActionSetStatus } from "../../../store/tables/setStatus/actions";
import { valueFormTable } from "../../../store/valueForm/tables/actions";
import LoadingTable from "./LoadingTable";

const TableTable = () => {
  console.log("render TableTable");
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState(false);
  const [itemTable, setItemTable] = useState({});
  const [status, setStatus] = useState("open");
  const table = useSelector(getTableState);
  const { isLoading, dataTable } = table;
  let data = dataTable?.data;
  const dispatch = useDispatch();

  //XU LI PHAN TRANG
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  // Filter currentItems based on status
  const currentItems = data
    ?.filter((item) => item?.status === status || status === "all")
    .slice(offset, offset + itemsPerPage);

  const itemCount = data?.filter(
    (item) => item?.status === status || status === "all"
  ).length;
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(0); // Reset currentPage when status changes
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  //----------------------------DELETE------------------------------------
  const handleClickDelete = (item) => {
    if (!item) {
      console.log("item not found");
    }
    setShow(true);
    setItemTable(item);
  };
  //----------------------------Update------------------------------------

  const handleClickUpdateTable = async (id, tableNumber) => {
    dispatch(typeActionSetStatus.setStatusTable(["update", id]));
    dispatch(valueFormTable.setTableNumber(tableNumber));
  };
  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);
  /**********************************TOGGLE ***************************** */

  return (
    <div className="mt-3 mb-3 table-users">
      {isLoading ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-h1-span mb-2">
            <span>{`Tổng Bàn: ${dataTable?.totalTables}`}</span>
            <h1 className="text-center ">GET TABLES</h1>
            <div className="select">
              <select value={status} onChange={handleStatusChange}>
                <option value={"all"}>All</option>
                <option value={"open"}>Open</option>
                <option value={"lock"}>Lock</option>
              </select>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Table number</th>
                <th>Img QR</th>
                <th>Status</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems?.length > 0 ? (
                currentItems.map((item, index) => (
                  <LoadingTable
                    key={index}
                    item={item}
                    handleClickDelete={handleClickDelete}
                    handleClickUpdateTable={handleClickUpdateTable}
                    status={status}
                  />
                ))
              ) : (
                <tr>
                  <td className="col-span" colSpan={3}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {currentItems?.length > 0 ? (
            <div className="text-center">
              <ReactPaginate
                className={`pagination`}
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
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
            </div>
          ) : null}
        </>
      )}

      <ModalDeleteTable
        show={show}
        handleClose={() => setShow(false)}
        itemTable={itemTable}
        setShow={setShow}
      />
    </div>
  );
};

export default TableTable;
