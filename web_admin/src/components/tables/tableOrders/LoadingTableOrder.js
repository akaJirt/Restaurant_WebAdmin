import React, { useState } from "react";
import ConvertMoney from "../../../utils/convertMoney";
import FormatDay from "../../../utils/FormDay";
import ModalOrder from "./ModalOrders/ModalOrder";
const LoadingTableOrder = ({ item, index }) => {
  const [show, setShow] = useState(false);
  const [listDataItem, setListDataItem] = useState([]);

  const handleClickView = (item) => {
    setShow(true);
    if (item && item.items && item.items.length > 0) {
      setListDataItem(item.items);
    } else {
      setListDataItem([]);
    }
  };
  return (
    <>
      <ModalOrder show={show} setShow={setShow} listDataItem={listDataItem} />
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.tableNumber}</td>
        <td>{ConvertMoney(item.amount)}</td>
        <td>{item.userPay.fullName}</td>
        <td>
          {item.paymentMethod === "Cash"
            ? "Tiền mặt"
            : item.paymentMethod === "ZaloPay"
            ? "Chuyển Khoản"
            : ""}
        </td>
        <td className="img_avatar">
          <img alt="img_avatar" src={item.userPay.img_avatar_url} />
        </td>
        <td>{FormatDay(item.createdAt)}</td>
        <td className="bt">
          <button
            className="btn btn-secondary"
            onClick={() => handleClickView(item)}
          >
            View
          </button>
        </td>
      </tr>
    </>
  );
};

export default LoadingTableOrder;