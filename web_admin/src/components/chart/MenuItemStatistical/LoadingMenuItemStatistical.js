import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Legend,
  BarChart,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";

const LoadingMenuItemStatistical = ({ data, selectDate }) => {
  const formatData = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter((key) => key !== "timePeriod")
      )
    )
  );

  const getColor = (index) => {
    let Color = [
      "#8884d8", // Đen xanh đậm
      "#82ca9d", // Xanh lá đậm
      "#ff7300", // Tím đậm
      "#83a6ed", // Đỏ đậm
      "#8dd1e1", // Cam đậm
      "#a4de6c", // Xanh nước biển đậm
      "#d0ed57", // Xám đậm
      "#4d4dff", // Xanh dương đậm
      "#ffc658", // Xanh lá cây rất đậm
      "#BFD7EA", // Đỏ tươi đậm
    ];
    return Color[index % Color.length];
  };

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{ left: 20, top: 20, right: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timePeriod"
          tickFormatter={(label) => {
            if (selectDate === "year") {
              return `Năm:${label}`;
            } else if (selectDate === "month") {
              return `Tháng:${FormatDay5(label)}`;
            } else {
              return `Ngày:${FormatDay7(label)}`;
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
        {formatData &&
          formatData.length > 0 &&
          formatData.map((item, index) => {
            return (
              <Bar
                dataKey={item}
                key={index}
                fill={getColor(index)}
                barSize={25}
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LoadingMenuItemStatistical;
