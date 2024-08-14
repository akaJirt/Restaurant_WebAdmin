import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  ComposedChart,
  Bar,
} from "recharts";

const LoadingLineChart = ({ dataTable }) => {
  return (
    <>
      {dataTable && dataTable.length > 0 ? (
        <>
          <ResponsiveContainer
            width={"100%"}
            height={320}
            style={{ padding: "5px 10px" }}
          >
            <ComposedChart data={dataTable}>
              <XAxis
                dataKey="Bàn"
                tickFormatter={(value) => `Bàn: ${value} `}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Tổng tiền bàn") {
                    return `${value.toLocaleString("vi-VN")} VND`;
                  }
                  return value;
                }}
                labelFormatter={(label) => `Bàn: ${label}`}
              />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Bar
                yAxisId="left"
                dataKey="Tổng tiền bàn"
                barSize={20}
                fill="#413ea0"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Tổng lượt đặt bàn"
                stroke="#ff7300"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div style={{ padding: "10px 0", textAlign: "center" }}>
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default LoadingLineChart;
