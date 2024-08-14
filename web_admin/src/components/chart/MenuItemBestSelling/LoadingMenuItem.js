import React from "react";
import {
  Tooltip,
  CartesianGrid,
  XAxis,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
const LoadingMenuItem = ({ data, selectDate }) => {
  const dataKeys = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter((key) => key !== "timePeriod")
      )
    )
  );

  // Hàm sinh màu sắc động dựa trên chỉ số
  const generateColor = (index) => {
    const colors = [
      "#8884d8",
      "#e3a0d7",
      "#f39c12",
      "#e74c3c",
      "#3498db",
      "#2ecc71",
      "#C2B2B4",
      "#6B4E71",
    ];
    return colors[index % colors.length];
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timePeriod"
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
          <Tooltip
            formatter={(value, name) => {
              if (name) {
                return `đã bán ${value}`;
              }
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
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={generateColor(index)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadingMenuItem;
