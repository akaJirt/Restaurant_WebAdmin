import React, { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import "./FormMenu.scss";
import ConvertToBase from "../../../utils/convertBase64";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuItemState,
  getCategoriesState,
  getValueCategoryIdState,
  getValueDescriptionState,
  getValueEngNameState,
  getValueImageState,
  getValueNameState,
  getValueOptionsState,
  getValuePriceState,
} from "../../../store/selector";
import { valueFormMenu } from "../../../store/valueForm/menu/actions";
import { Tag } from "antd";

const FormMenu = () => {
  console.log("render FormMenu");
  const [isBase64, setIsBase64] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const name = useSelector(getValueNameState);
  const engName = useSelector(getValueEngNameState);
  const description = useSelector(getValueDescriptionState);
  const price = useSelector(getValuePriceState);
  const option = useSelector(getValueOptionsState);
  const getDataMenu = useSelector(getAllMenuItemState);
  const category_id = useSelector(getValueCategoryIdState);
  const image = useSelector(getValueImageState);
  console.log(category_id, "LOG");
  const { dataMenuItem } = getDataMenu;
  const data = dataMenuItem?.data;
  const dispatch = useDispatch();
  const categoriesState = useSelector(getCategoriesState);
  const { dataGetCategories } = categoriesState;

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(valueFormMenu.setImage(file));
      const base64 = await ConvertToBase.getBase64(file);
      setIsBase64(base64);
    } else {
      setIsBase64(null);
    }
  };
  const handleChangOptions = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      _id: option.value,
      name: option.title,
    }));
    selectedOptions.forEach((selectedOption) => {
      if (!option.some((opt) => opt._id === selectedOption._id)) {
        dispatch(valueFormMenu.setOptions([...option, selectedOption]));
      }
    });
  };
  const handleClickRemoveOption = (o) => {
    dispatch(
      valueFormMenu.setOptions(option.filter((item) => item._id !== o._id))
    );
  };

  return (
    <div className="form">
      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          placeholder="Nhập name..."
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => dispatch(valueFormMenu.setName(e.target.value))}
        />
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">EngName</label>
        <input
          placeholder="Nhập eng name..."
          type="text"
          className="form-control"
          onChange={(e) => dispatch(valueFormMenu.setEngName(e.target.value))}
          value={engName}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          placeholder="Nhập description..."
          type="text"
          className="form-control"
          onChange={(e) =>
            dispatch(valueFormMenu.setDescription(e.target.value))
          }
          value={description}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Price</label>
        <input
          placeholder="Nhập price..."
          type="text"
          className="form-control"
          onChange={(e) => dispatch(valueFormMenu.setPrice(e.target.value))}
          value={price}
        />
      </div>
      <div className="form-group mt-3 mb-1">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleChangeImage}
        />
      </div>
      <div className="img mb-3 img-menu">
        <img
          alt="hinh anh"
          src={isBase64 ? isBase64 : image}
          onClick={() => {
            setIsOpen(true);
          }}
        />
        {isBase64 && (
          <SlideshowLightbox
            images={[{ src: isBase64 }]}
            showThumbnails={true}
            open={isOpen}
            lightboxIdentifier="lbox1"
            onClose={() => {
              setIsOpen(false);
            }}
          ></SlideshowLightbox>
        )}
      </div>
      <div className="form-group mt-3 mb-3">
        <label className="form-label">CategoryId</label>
        <select
          value={category_id}
          className="form-control"
          onChange={(e) =>
            dispatch(valueFormMenu.setCategoryId(e.target.value))
          }
        >
          <option value="" disabled>
            Chose...
          </option>
          {dataGetCategories?.data?.length > 0 &&
            dataGetCategories?.data?.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {option?.length > 0 && (
        <div className="opt">
          {option?.map((item, index) => (
            <Tag key={index} color="purple" className="tag">
              {item.name}
              <span
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
                onClick={() => handleClickRemoveOption(item)}
              >
                {` x`}
              </span>
            </Tag>
          ))}
        </div>
      )}
      <div className="form-group mt-3 mb-3">
        <label className="form-label">Options</label>
        <select
          className="form-control ic-arrow"
          value={option.map((opt) => opt.value)}
          onChange={handleChangOptions}
          multiple
        >
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <option key={index} title={item.name} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default FormMenu;
