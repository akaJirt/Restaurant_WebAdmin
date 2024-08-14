import React from "react";
import PaymentStatistics from "../../components/chart/PaymentStatistics/PaymentStatistics";
import "./Statistical.scss";
import TableStatistics from "../../components/chart/TableStatistics/TableStatistics";
import RevenueStatistic from "../../components/chart/RevenueStatistics/RevenueStatistic";
import MenuItemBestSelling from "../../components/chart/MenuItemBestSelling/MenuItemBestSelling";

const Statistical = () => {
  return (
    <div className="layout-statistical">
      <div className="box-row">
        <PaymentStatistics />
        <TableStatistics />
      </div>
      <div className="box-row2">
        <RevenueStatistic />
        <MenuItemBestSelling />
      </div>
    </div>
  );
};

export default Statistical;
