import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import "./TableTable.scss";
import ModalDeleteTable from "../../Modal/Tables/ModalDeleteTable";
import { getTableState } from "../../../store/selector";
import { getAllTable } from "../../../api/call_api/tables/fetchApiTable";
import { LoadingOutlined } from "@ant-design/icons";
import { typeActionSetStatus } from "../../../store/tables/setStatus/actions";

const TableTable = () => {
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
    ?.filter((item) => item?.status === status)
    .slice(offset, offset + itemsPerPage);

  const itemCount = data?.filter((item) => item?.status === status).length;
  console.log(itemCount, "<<<<<<<<,,ITEM COUNT");
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(0); // Reset currentPage when status changes
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  //------------------------------------------------------------------

  useEffect(() => {
    const fetchDataTable = async () => {
      await getAllTable(dispatch);
    };
    fetchDataTable();
  }, [dispatch]);

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
    dispatch(typeActionSetStatus.setStatusTable(["update", id, tableNumber]));
  };
  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      console.log(
        currentPage,
        ">=",
        pageCount,
        "&&",
        currentPage,
        "<>CCCCCCCCCCCCCCCCCCCCCCCCCCCCC<>"
      );

      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);
  return (
    <div className="mt-3 mb-3 table-users">
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <>
          <div className="box-h1-span mb-2">
            <span>{`Tổng Bàn: ${dataTable?.totalTables}`}</span>
            <h1 className="text-center ">GET TABLES</h1>
            <select value={status} onChange={handleStatusChange}>
              <option value={"open"}>Open</option>
              <option value={"lock"}>Lock</option>
            </select>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Table number</th>
                <th>Status</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems?.length > 0 &&
                currentItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      {status === item.status && (
                        <>
                          <td>{item.tableNumber}</td>
                          <td
                            className={
                              item?.status === "open" ? "open" : "close"
                            }
                          >
                            {item.status}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => handleClickDelete(item)}
                            >
                              Xóa
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleClickUpdateTable(
                                  item._id,
                                  item.tableNumber
                                )
                              }
                            >
                              Sửa
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </Table>
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
