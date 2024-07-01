import React, { useState } from "react";
import itemMenu from "../../../images/test.jpg";
import "./LoadingTableMenu.scss";
import LoadingOptions from "./LoadingOptions";
import Table from "react-bootstrap/Table";
import { cutString } from "../../../utils/cutValue";
import Tooltip from "../../ToolTip/ToolTip";

const setCategoryClass = (className, category) => {
  // Tạo một biến để lưu className dựa vào category
  let menuClassName = className;
  if (category === "Món chính") {
    menuClassName += " monChinh";
  } else if (category === "Món khai vị") {
    menuClassName += " monKhaiVi";
  } else if (category === "Món phụ") {
    menuClassName += " monPhu";
  } else if (category === "Thức uống") {
    menuClassName += " thucUong";
  }
  return menuClassName;
};

const LoadingTableMenu = ({ item, index, offset, category }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  console.log(item.category);

  return (
    <tr className="loadingTableMenu">
      <td>{offset + index + 1}</td>
      <td>{item.name}</td>
      <td className="item-text">
        <Tooltip text={item.engName}> {cutString(item?.engName)}</Tooltip>
      </td>
      <td>
        <Tooltip text={item.description}>{cutString(item.description)}</Tooltip>
      </td>
      <td>{item.price}</td>
      <td
        className="img-table"
        onMouseLeave={() => setHoverIndex(null)}
        onMouseEnter={() => setHoverIndex(index)}
      >
        <img src={item.image_url || itemMenu} alt="avatar" loading="eager" />
        {hoverIndex === index && (
          <div className={setCategoryClass("menu", category)}>
            <h1 className="mt-1 mb-1">Options</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Name</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {item?.options?.length > 0 ? (
                  item?.options?.map((option, index) => (
                    <LoadingOptions key={index} option={option} index={index} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No Data Option</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </td>
      <td>{item.rating}</td>
      <td>{item.category}</td>
      <td className="bt">
        <button className="btn btn-danger">Xóa</button>
        <button className="btn btn-primary">Sửa</button>
      </td>
    </tr>
  );
};

export default LoadingTableMenu;
