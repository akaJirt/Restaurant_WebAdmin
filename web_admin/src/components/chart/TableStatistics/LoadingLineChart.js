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
import Accordion from "react-bootstrap/Accordion";
import { Tag } from "antd";
import ConvertMoney from "../../../utils/convertMoney";
const LoadingLineChart = ({ dataTable, month, year, totalArr }) => {
  return (
    <>
      {dataTable && dataTable.length > 0 ? (
        <>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                Chi tiết thống kê bàn tháng {month}
              </Accordion.Header>
              <Accordion.Body>
                <div className="box-2">
                  {totalArr &&
                    totalArr.length > 0 &&
                    totalArr.map((item, index) => {
                      return (
                        <div key={index} className="box-text">
                          <div>
                            <Tag className="text-color" color="#4140a0">
                              Tổng doanh thu bàn {month} :
                            </Tag>
                            <Tag className="text-color" color="#4140a0">
                              {ConvertMoney(item.moneyMonth)}
                            </Tag>
                          </div>
                          <div>
                            <Tag className="text-color" color="#f50">
                              Tổng lượt đặt bàn {month} :
                            </Tag>
                            <Tag className="text-color" color="#f50">
                              {item.orderMonth}
                            </Tag>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                Chi tiết thông kê bàn trong năm {year}
              </Accordion.Header>
              <Accordion.Body>
                <div className="box-2">
                  {totalArr &&
                    totalArr.length > 0 &&
                    totalArr.map((item, index) => {
                      return (
                        <div key={index} className="box-text">
                          <div>
                            <Tag className="text-color" color="#108ee9">
                              Tổng doanh thu bàn {year} :
                            </Tag>
                            <Tag className="text-color" color="#108ee9">
                              {ConvertMoney(item.moneyYear)}
                            </Tag>
                          </div>
                          <div>
                            <Tag className="text-color" color="#2db7f5">
                              Tổng lượt đặt bàn {year} :
                            </Tag>
                            <Tag className="text-color" color="#2db7f5">
                              {item.orderYear}
                            </Tag>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <ResponsiveContainer
            width={"100%"}
            height={320}
            style={{ padding: "5px 10px" }}
          >
            <ComposedChart data={dataTable}>
              <XAxis
                dataKey="Bàn số"
                tickFormatter={(value) => `Bàn số: ${value}`}
              />
              <YAxis
                tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Tổng tiền bàn") {
                    return `${value.toLocaleString("vi-VN")} VND`;
                  }
                  return value;
                }}
                labelFormatter={(label) => `Bàn số: ${label}`}
              />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Bar dataKey="Tổng tiền bàn" barSize={20} fill="#413ea0" />
              <Line
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
