import React from "react";
import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";

const LineChart = (props) => {
  const theme = useSelector(getThemeState);

  const options = {
    series: [
      {
        name: "Bán Hàng",
        data: [31, 40, 28, 51, 42, 82, 56, 61, 70, 91, 58, 75],
      },
      {
        name: "Doanh Thu",
        data: [11, 32, 45, 32, 34, 52, 41, 33, 44, 52, 36, 40],
      },
      {
        name: "Khách Hàng",
        data: [15, 11, 32, 18, 9, 24, 11, 20, 18, 22, 17, 19],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4,
    },
    colors: ["#4154f1", "#2eca6a", "#ff771d"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2023-01-01T00:00:00.000Z",
        "2023-02-01T00:00:00.000Z",
        "2023-03-01T00:00:00.000Z",
        "2023-04-01T00:00:00.000Z",
        "2023-05-01T00:00:00.000Z",
        "2023-06-01T00:00:00.000Z",
        "2023-07-01T00:00:00.000Z",
        "2023-08-01T00:00:00.000Z",
        "2023-09-01T00:00:00.000Z",
        "2023-10-01T00:00:00.000Z",
        "2023-11-01T00:00:00.000Z",
        "2023-12-01T00:00:00.000Z",
      ],
      labels: {
        style: {
          colors: theme ? "#fff" : "#000", // Màu của nhãn trục x
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme ? "#fff" : "#000", // Màu của nhãn trục y
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    legend: {
      labels: {
        colors: theme ? "#fff" : "#000", // Màu của tên trong chú giải
      },
    },
  };

  return (
    <ApexCharts
      options={options}
      series={options.series}
      type="area"
      height={350}
    />
  );
};

export default LineChart;
