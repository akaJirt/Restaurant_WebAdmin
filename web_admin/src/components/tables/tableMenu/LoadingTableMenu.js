import React, { useCallback, useState } from "react";
import itemMenu from "../../../images/test.jpg";
import "./LoadingTableMenu.scss";
import LoadingOptions from "./LoadingOptions";
import Table from "react-bootstrap/Table";
import { cutString } from "../../../utils/cutValue";
import Tooltip from "../../ToolTip/ToolTip";
import { useDispatch, useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { setStatusMenuItem } from "../../../store/menuItem/setStatusMenuItem/actions";
import { valueFormMenu } from "../../../store/valueForm/menu/actions";

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

const LoadingTableMenu = ({ item, index, offset, category, setShow }) => {
  console.log("render LoadingTableMenu");
  const theme = useSelector(getThemeState);
  const [hoverIndex, setHoverIndex] = useState(null);
  const dispatch = useDispatch();
  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const handleClickXoaMenuItem = (itemMenuItem) => {
    dispatch(setStatusMenuItem.setStatus(["delete", itemMenuItem]));
    setShow(true);
  };

  const handleClickSuaMenuITem = (itemMenuItem) => {
    console.log(itemMenuItem, "LOG.......................");
    dispatch(setStatusMenuItem.setStatus(["update", itemMenuItem]));
    setShow(true);
    dispatch(valueFormMenu.setName(itemMenuItem.name));
    dispatch(valueFormMenu.setEngName(itemMenuItem.engName));
    dispatch(valueFormMenu.setDescription(itemMenuItem.description));
    dispatch(valueFormMenu.setPrice(itemMenuItem.price));
    dispatch(valueFormMenu.setImage(itemMenuItem.image_url));
    dispatch(valueFormMenu.setCategoryId(itemMenuItem.category_id._id));
    dispatch(valueFormMenu.setOptions(itemMenuItem.options));
  };
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
        onMouseLeave={() => handleMouseLeave()}
        onMouseEnter={() => handleMouseEnter(index)}
      >
        <img src={item.image_url || itemMenu} alt="avatar" loading="lazy" />
        {hoverIndex === index && (
          <div
            className={setCategoryClass(
              `menu ${theme ? "theme" : ""}`,
              category
            )}
          >
            <h1 className="mt-1 mb-1 h1">Options</h1>
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
        <button
          className="btn btn-danger"
          onClick={() => handleClickXoaMenuItem(item)}
        >
          Xóa
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClickSuaMenuITem(item)}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default React.memo(LoadingTableMenu);
