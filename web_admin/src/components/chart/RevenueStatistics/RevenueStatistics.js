import React, { useCallback, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  Legend,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import { getRevenue } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay2 } from "../../../utils/FormDay";
import _ from "lodash";
const RevenueStatistics = () => {
  const [listRevenue, setListRevenue] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [isSelectDate, setIsSelectDate] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  /**************************************************GET DATA****************************************** */

  useEffect(() => {
    getRevenueApi();
  }, []);

  const getRevenueApi = async () => {
    await getRevenue("", "", setListRevenue);
  };
  /**************************************************FORMAT DATA****************************************** */

  const revenueData = useCallback(() => {
    if (listRevenue && listRevenue.length > 0) {
      let newDataRevenue = [];
      for (let i = 0; i < listRevenue.length; i++) {
        if (listRevenue[i]._id) {
          newDataRevenue.unshift({
            name: FormatDay2(listRevenue[i]._id),
            "Tổng tiền": listRevenue[i].totalRevenue,
            "Tổng đã đặt": listRevenue[i].totalOrders,
          });
        }
      }
      setDataRevenue(newDataRevenue);
    }
  }, [listRevenue]);

  useEffect(() => {
    revenueData();
  }, [revenueData]);
  /**************************************************FILTER****************************************** */
  const filterDate = useCallback(() => {
    let dataClone = _.cloneDeep(dataRevenue);

    if (dataClone && dataClone.length > 0 && isSelectDate) {
      dataClone.filter((item) => item.name === isSelectDate);
    }

    setDataFilter(dataClone);
  }, [isSelectDate, dataRevenue]);

  useEffect(() => {
    filterDate();
  }, [filterDate]);
  const data = dataRevenue;
  return (
    <div className="layout-revenue">
      <div className="box-revenue">
        <h1>Thống kê doanh thu</h1>
        <select
          value={isSelectDate}
          onChange={(e) => setIsSelectDate(e.target.value)}
        >
          <option value={""} disabled>
            Chose
          </option>
          ;
          {dataRevenue.length > 0 ? (
            dataRevenue.map((item, index) => {
              return <option key={index}>{item.name}</option>;
            })
          ) : (
            <option>Không có dữ liệu</option>
          )}
        </select>
      </div>
      <div className="containerStyle2">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="Tổng tiền" stroke="#8884d8" />
            <Line type="monotone" dataKey="Tổng đã đặt" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueStatistics;
