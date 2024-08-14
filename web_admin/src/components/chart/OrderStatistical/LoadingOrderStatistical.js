import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";

const LoadingOrderStatistical = ({ data, selectDate }) => {
  return (
    <ResponsiveContainer
      width={"100%"}
      height={320}
      style={{ padding: "5px 10px" }}
    >
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="_id"
          tickFormatter={(label) => {
            if (selectDate === "day") {
              return `Ngày:${FormatDay7(label)}`;
            } else if (selectDate === "month") {
              return `Tháng:${FormatDay5(label)}`;
            } else {
              return `Năm:${label}`;
            }
          }}
          interval={0}
        />
        <Tooltip
          labelFormatter={(label) => {
            if (selectDate === "day") {
              return `Ngày:${FormatDay7(label)}`;
            } else if (selectDate === "month") {
              return `Tháng:${FormatDay5(label)}`;
            } else {
              return `Năm:${label}`;
            }
          }}
        />
        <Legend />
        <Line
          type="monotone"
          name="Tổng lượt đặt món"
          dataKey="totalOrders"
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoadingOrderStatistical;
