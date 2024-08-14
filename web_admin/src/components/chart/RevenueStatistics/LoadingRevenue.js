import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  CartesianGrid,
  ComposedChart,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import ConvertMoney from "../../../utils/convertMoney";
const LoadingRevenue = ({ data, selectDate }) => {
  return (
    <>
      {data && data.length > 0 ? (
        <ResponsiveContainer
          width={"100%"}
          height={320}
          style={{ padding: "5px 10px" }}
        >
          <ComposedChart data={data} margin={{ top: 20 }}>
            <XAxis
              dataKey="_id"
              tickFormatter={(value) => {
                if (selectDate === "day") {
                  const formattedValue = FormatDay7(value);
                  return `Ngày:${formattedValue}`;
                } else if (selectDate === "month") {
                  return `Tháng:${FormatDay5(value)}`;
                } else {
                  return `Năm:${value}`;
                }
              }}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => {
                if (value > 0) {
                  return ConvertMoney(value);
                } else {
                  return value;
                }
              }}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Tổng doanh thu") {
                  return `${value.toLocaleString("vi-VN")} VND`;
                }
                return value;
              }}
              labelFormatter={(label) => {
                if (selectDate === "year") {
                  return `Năm:${label}`;
                } else if (selectDate === "month") {
                  return `Tháng:${FormatDay5(label)}`;
                } else {
                  return `Ngày:${FormatDay7(label)}`;
                }
              }}
            />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar
              yAxisId="left"
              dataKey="Tổng doanh thu"
              barSize={20}
              fill="#413ea0"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Tổng lượt đặt món"
              stroke="#ff7300"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ padding: "10px 0", textAlign: "center" }}>
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default LoadingRevenue;