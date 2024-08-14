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
const LoadingRevenue = ({ data, selectDate }) => {
  return (
    <>
      {data && data.length > 0 ? (
        <ResponsiveContainer
          width={"100%"}
          height={320}
          style={{ padding: "5px 10px" }}
        >
          <ComposedChart data={data}>
            <XAxis
              dataKey="_id"
              tickFormatter={
                selectDate === "year" && ((value) => `Năm: ${value}`)
              }
              label={{
                value: "Ngày",
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
            />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Tổng doanh thu") {
                  return `${value.toLocaleString("vi-VN")} VND`;
                }
                return value;
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
