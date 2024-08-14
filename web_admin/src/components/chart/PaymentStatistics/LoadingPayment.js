import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Line,
  ComposedChart,
} from "recharts";

const LoadingPayment = ({ data }) => {
  return (
    <>
      {data && data.length > 0 ? (
        <ResponsiveContainer
          width="100%"
          height={320}
          style={{ padding: "5px 10px" }}
        >
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timePeriod" />

            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
            />

            <YAxis yAxisId="right" orientation="right" />

            <Tooltip
              formatter={(value, name) => {
                if (
                  name === "Cash" ||
                  name === "Banking" ||
                  name === "ZaloPay"
                ) {
                  return value > 0 ? `${value.toLocaleString("vi-VN")} VND` : 0;
                }
                return value;
              }}
            />
            <Legend />

            <Bar yAxisId="left" dataKey="Cash" stackId="a" fill="#82ca9d" />
            <Bar yAxisId="left" dataKey="ZaloPay" stackId="a" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="Banking" stackId="a" fill="#ffc658" />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="CashOrder"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={true}
              name="lần giao dịch"
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="ZaloPayOrder"
              stroke="#8884d8"
              dot={{ r: 3 }}
              strokeWidth={2}
              connectNulls={true}
              name="lần giao dịch"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="BankingOrder"
              stroke="#ffc658"
              strokeWidth={2}
              connectNulls={true}
              dot={{ r: 3 }}
              name="lần giao dịch"
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

export default LoadingPayment;
