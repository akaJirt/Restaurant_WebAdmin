import React from "react";
import PaymentStatistics from "../../components/chart/PaymentStatistics/PaymentStatistics";
import "./Statistical.scss";
import TableStatistics from "../../components/chart/TableStatistics/TableStatistics";
import RevenueStatistic from "../../components/chart/RevenueStatistics/RevenueStatistic";
import MenuItemBestSelling from "../../components/chart/MenuItemBestSelling/MenuItemBestSelling";
import MenuItemStatistical from "../../components/chart/MenuItemStatistical/MenuItemStatistical";
import OrderStatistical from "../../components/chart/OrderStatistical/OrderStatistical";
import AverageStatistical from "../../components/chart/AverageStatistical/AverageStatistical";

const Statistical = () => {
  return (
    <div className="layout-statistical">
      <div className="box-row3">
        <div>
          <PaymentStatistics />
        </div>
        <div className="mt-3 mb-3">
          <TableStatistics />
        </div>
        <div className="mt-3 mb-3">
          <RevenueStatistic />
        </div>
        <div className="mt-3 mb-3">
          <MenuItemBestSelling />
        </div>
        <div className="mt-3 mb-3">
          <MenuItemStatistical />
        </div>
        <div className="mt-3 mb-3">
          <OrderStatistical />
        </div>
        <div className="mt-3 mb-3">
          <AverageStatistical />
        </div>
      </div>
    </div>
  );
};

export default Statistical;
