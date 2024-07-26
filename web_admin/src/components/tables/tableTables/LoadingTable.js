import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import { useDispatch } from "react-redux";
import { patchStatusTable } from "../../../api/call_api/tables/fetchApiTable";
import "./LoadingTable.scss";
import { SlideshowLightbox } from "lightbox.js-react";
const LoadingTable = ({
  item,
  handleClickDelete,
  handleClickUpdateTable,
  status,
}) => {
  console.log("render LoadingTable");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickLock = async (e, id) => {
    const statusTable = e.currentTarget.getAttribute("data-name");
    const status = statusTable === "lock" ? "open" : "lock";
    e.currentTarget.setAttribute("data-status", status);
    console.log(status);
    await patchStatusTable(dispatch, id, status);
  };

  const handleClickOpen = async (e, id) => {
    const statusTable = e.currentTarget.getAttribute("data-name");
    const status = statusTable === "open" ? "lock" : "open";
    e.currentTarget.setAttribute("data-status", status);

    console.log(status);
    await patchStatusTable(dispatch, id, status);
  };
  return (
    <tr>
      <td>{item.tableNumber}</td>
      <td className="text-center">
        <div className="td">
          <img
            src={item.qrCode}
            alt="qr"
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          />
          {item.qrCode && (
            <SlideshowLightbox
              images={[{ src: item.qrCode }]}
              showThumbnails={true}
              open={isOpen}
              lightboxIdentifier="lbox1"
              onClose={() => {
                setIsOpen(false);
              }}
            ></SlideshowLightbox>
          )}
        </div>
      </td>
      <td className={item?.status === "open" ? "open" : "close"}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>{item.status}</div>
          <IconButton>
            {status === "open" || item.status === "open" ? (
              <ToggleOnOutlinedIcon
                data-name={item.status}
                style={{
                  fontSize: "32px",
                  color: "lawngreen",
                }}
                onClick={(e) => handleClickOpen(e, item._id)}
              />
            ) : (
              <ToggleOffOutlinedIcon
                data-name={item.status}
                style={{ fontSize: "32px", color: "red" }}
                onClick={(e) => handleClickLock(e, item._id)}
              />
            )}
          </IconButton>
        </div>
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
          onClick={() => handleClickUpdateTable(item._id, item.tableNumber)}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default LoadingTable;
