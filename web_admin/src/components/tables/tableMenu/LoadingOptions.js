import React from "react";
import itemMenu from "../../../images/test.jpg";

const LoadingOptions = ({ option, index }) => {
  console.log("render LoadingOptions");
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{option.name}</td>
      <td className="img">
        <img src={option.image_url || itemMenu} alt="hinh anh" loading="lazy" />
      </td>
    </tr>
  );
};

export default React.memo(LoadingOptions);
