import React from "react";
import {
  CHANGE_PASSWORD,
  EDIT_PROFILE,
  OVERVIEW,
} from "../../../../utils/contants";
import Overview from "./Overview/Overview";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";

const RenderProfileRight = ({ changeTab }) => {
  console.log("render RenderProfileRight");
  switch (changeTab) {
    case OVERVIEW:
      return <Overview />;
    case EDIT_PROFILE:
      return <EditProfile />;
    case CHANGE_PASSWORD:
      return <ChangePassword />;

    default:
      return OVERVIEW;
  }
};

export default RenderProfileRight;
