import React, { useState } from "react";
import { Checkbox } from "antd";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import "./FormRegister.scss";
const FormRegisterUser = (props) => {
  const [testImg, setTestImg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleChangImg = (e) => {
    let img = e.target.files[0];
    let url = URL.createObjectURL(img);
    setTestImg(url);
  };
  const handleClickShowImg = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">PhoneNumber</label>
        <input
          type="number"
          className="form-control"
          placeholder="enter phone..."
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">FirstName</label>
        <input
          type="text"
          className="form-control"
          placeholder="enter firstName..."
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">LastName</label>
        <input
          type="text"
          className="form-control"
          placeholder="enter lastName..."
        />
      </div>
      <div className="row form-avatar">
        <div className="col-8">
          <div className="form-group mb-3">
            <label className="mb-2">Avatar</label>
            <input
              type="file"
              className="form-control"
              onChange={handleChangImg}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="img" onClick={handleClickShowImg}>
            <img alt="hinh anh" src={testImg} />
          </div>
        </div>
      </div>
      {testImg && (
        <SlideshowLightbox
          images={[{ src: testImg }]}
          showThumbnails={true}
          open={isOpen}
          lightboxIdentifier="lbox1"
          onClose={() => {
            setIsOpen(false);
          }}
        ></SlideshowLightbox>
      )}
      <div className="form-group mb-3">
        <label className="mb-2">Role</label>
        <select value={"Admin"} className="form-control">
          <option value={"a"}>Admin</option>
          <option value={"k"}>Khách Hàng</option>
          <option value={"p"}>Phục Vụ</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="enter password..."
        />
      </div>
      <div className="form-group">
        <Checkbox className="text-checkbox">
          <span>I agree and accept the</span>
          <span className="span"> terms and conditions</span>
        </Checkbox>
      </div>
      <div className="text-center button mt-3">
        <button o className="btn btn-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default FormRegisterUser;
