import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { getLocationState } from "../../store/selector";
import "./Profile.scss";
const Profile = (props) => {
  console.log("render profile");
  const location = useLocation();
  let locationProfile = location.pathname.slice(0, 1);
  let locationNameProfile = location.pathname.slice(1, 9).toLocaleUpperCase();
  const getLocation = useSelector(getLocationState);
  let locationHome = getLocation.payload
    ? getLocation.payload.slice(1, 5).toLocaleUpperCase()
    : " ";
  return (
    <>
      <div>
        <NavLink to={"/home"} className={"test"}>
          {locationHome}
        </NavLink>
        <span>{` ${locationProfile} ${locationNameProfile}`}</span>
      </div>
    </>
  );
};

export default Profile;
