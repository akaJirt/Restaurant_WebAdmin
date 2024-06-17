import React from "react";
import { EDIT_PROFILE, OVERVIEW } from "../../../../utils/contants";
import Overview from "./Overview/Overview";
import EditProfile from "./EditProfile/EditProfile";

const RenderProfileRight = ({ changeTab }) => {
  console.log("render RenderProfileRight");
  switch (changeTab) {
    case OVERVIEW:
      return <Overview />;
    case EDIT_PROFILE:
      return <EditProfile />;

    default:
      return OVERVIEW;
  }
};

export default RenderProfileRight;
