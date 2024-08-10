import React from "react";
import PaymentStatistics from "../../components/chart/PaymentStatistics/PaymentStatistics";
import "./Statistical.scss";
import RevenueStatistics from "../../components/chart/RevenueStatistics/RevenueStatistics";

const Statistical = () => {
  return (
    <div className="layout-statistical">
      <div className="row">
        <div className="col-6">
          <PaymentStatistics />
        </div>
        <div className="col-6">
          <RevenueStatistics />
        </div>
      </div>
    </div>
  );
};

export default Statistical;
