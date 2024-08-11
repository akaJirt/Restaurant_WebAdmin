import React from "react";
import PaymentStatistics from "../../components/chart/PaymentStatistics/PaymentStatistics";
import "./Statistical.scss";
import TableStatistics from "../../components/chart/TableStatistics/TableStatistics";

const Statistical = () => {
  return (
    <div className="layout-statistical">
      <div className="row">
        <div className="col-6">
          <PaymentStatistics />
        </div>
        <div className="col-6">
          <TableStatistics />
        </div>
      </div>
    </div>
  );
};

export default Statistical;
