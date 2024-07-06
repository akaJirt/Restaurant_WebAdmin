import React from "react";
import LoadingSkeleton from "../../pages/categories/LoadingSkeleton/LoadingSkeleton";
import Table from "react-bootstrap/Table";

const SkeletonCategory = () => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th style={{ width: "148.9px" }}>
            <LoadingSkeleton style={{ height: "25px" }} />
          </th>
          <th>
            <LoadingSkeleton style={{ height: "25px" }} />
          </th>
          <th>
            <LoadingSkeleton style={{ height: "25px" }} />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
        </tr>
        <tr>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
        </tr>
        <tr>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
        </tr>
        <tr>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
        </tr>
        <tr>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
          <td>
            <LoadingSkeleton style={{ height: "45px" }} />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SkeletonCategory;
