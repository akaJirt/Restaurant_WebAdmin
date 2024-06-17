import React, { useState } from "react";
import "./EditProfile.scss";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getLightBoxState, getThemeState } from "../../../../../store/selector";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import {
  setHideLightBox,
  setShowLightBox,
} from "../../../../../store/lightBoxImage/actions";

const EditProfile = () => {
  console.log("render editProfile");
  const [isShowAvatar, setIsShowAvatar] = useState("");
  const theme = useSelector(getThemeState);
  const lightBox = useSelector(getLightBoxState);
  const dispatch = useDispatch();
  const handleClickAvatar = () => {
    dispatch(setShowLightBox());
  };
  const handleChangeImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      let urlImage = URL.createObjectURL(file);
      setIsShowAvatar(urlImage);
    }
  };
  return (
    <div className={`form-profile ${theme ? "theme" : ""}`}>
      <div className="form-group">
        <p>Profile Image</p>
        <div className="box-img-edit">
          <div className="img">
            <img
              src={isShowAvatar ? isShowAvatar : ""}
              alt="avatar"
              onClick={handleClickAvatar}
            />
            {isShowAvatar && (
              <SlideshowLightbox
                images={[{ src: isShowAvatar }]}
                showThumbnails={true}
                open={lightBox}
                lightboxIdentifier="lbox1"
                onClose={() => {
                  dispatch(setHideLightBox());
                }}
              />
            )}
          </div>
          <input type="file" id="file" hidden onChange={handleChangeImage} />
          <label htmlFor="file" className="mt-2">
            <UploadOutlined className="ic-upload" />
          </label>
          <DeleteOutlined className="ic-delete" />
        </div>
      </div>
      <div className="form-group mt-3 mb-3">
        <p>FirstName</p>
        <input className="form-control" placeholder="Nhập firstName..." />
      </div>
      <div className="form-group">
        <p>LastName</p>
        <input className="form-control" placeholder="Nhập lastName..." />
      </div>
      <div className="text-center mt-3">
        <button className="btn btn-primary ">Save Profile</button>
      </div>
    </div>
  );
};

export default EditProfile;
