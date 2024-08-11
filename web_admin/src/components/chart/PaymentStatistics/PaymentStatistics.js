import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { getPayment } from "../../../api/call_api/statistical/fetchApiStatistical";
import ConvertMoney from "../../../utils/convertMoney";
import { FormatDay2, FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import { IoIosCloseCircle } from "react-icons/io";
import { Tag } from "antd";
import Accordion from "react-bootstrap/Accordion";
import { LoadingOutlined } from "@ant-design/icons";
const PaymentStatistics = () => {
  const [listPayment, setListPayment] = useState([]);
  const [dataA, setDataA] = useState([]);
  const [dataB, setDataB] = useState([]);
  const [selectPaymentYear, setSelectPaymentYear] = useState("");
  const [selectPaymentMonth, setSelectPaymentMonth] = useState("");
  const [dataPaymentFilter, setDataPaymentFilter] = useState([]);
  const [dataPaymentFind, setDataPaymentFind] = useState([]);
  const [dataPaymentFind2, setDataPaymentFind2] = useState([]);
  const [totalMonth, setTotalMonth] = useState("");
  const [totalYear, setTotalYear] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [totalQuantityYear, setTotalQuantityYear] = useState("");
  const [selectPayment, setSelectPayment] = useState("Tìm kiếm theo năm");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startFind, setStartFind] = useState(false);
  const [startDateAndEndDate, setStartDateAndEndDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMt, setIsMt] = useState(false);
  const [dataMonthYear, setDataMonthYear] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  /**************************************************GET PAYMENT****************************************** */
  const getPaymentApi = useCallback(async () => {
    if (selectPayment === "Tìm kiếm theo năm" && startFind === false) {
      await getPayment("", "", setListPayment, setIsLoading);
    }
  }, [selectPayment, startFind]);

  useEffect(() => {
    getPaymentApi();
  }, [getPaymentApi]);

  /**************************************************XU LI SET YEAR AND SELECT YEAR****************************************** */

  let dateYear = useMemo(() => {
    return [
      ...new Set(listPayment.map((item) => FormatDay4(item.timePeriod) || [])),
    ];
  }, [listPayment]);

  useEffect(() => {
    if (dateYear && dateYear.length > 0 && !selectPaymentYear) {
      setSelectPaymentYear(dateYear[dateYear.length - 1]);
    }
  }, [dateYear, selectPaymentYear]);

  /**************************************************XU LI MONTH****************************************** */
  const getMonth = useCallback(() => {
    if (listPayment && listPayment.length > 0 && selectPaymentYear) {
      let newMonth = [];
      for (let i = 0; i < listPayment.length; i++) {
        if (FormatDay4(listPayment[i].timePeriod) === selectPaymentYear) {
          newMonth.unshift(listPayment[i].timePeriod);
        }
      }
      setDataMonthYear(newMonth);
    }
  }, [listPayment, selectPaymentYear]);
  useEffect(() => {
    getMonth();
  }, [getMonth]);

  let dataMonth = useMemo(() => {
    return [...new Set(dataMonthYear.map((item) => FormatDay5(item)) || [])];
  }, [dataMonthYear]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && !selectPaymentMonth) {
      setSelectPaymentMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectPaymentMonth("");
    }
  }, [dataMonth, selectPaymentMonth]);
  /**************************************************XU LI FILTER****************************************** */

  useEffect(() => {
    if (listPayment && listPayment.length > 0 && selectPaymentYear) {
      let dataFilter = listPayment.filter(
        (item) => FormatDay4(item.timePeriod) === selectPaymentYear
      );
      setDataPaymentFilter(dataFilter);
    }
  }, [listPayment, selectPaymentYear]);
  /**************************************************XU LI FIND AND REDUCE****************************************** */
  const findAndReduce = useCallback(() => {
    if (dataPaymentFilter && dataPaymentFilter.length > 0) {
      dataPaymentFilter.reduce((arr, curr) => {
        let findData = arr.find(
          (item) =>
            item.paymentMethod === curr.paymentMethod &&
            FormatDay5(item.timePeriod) === FormatDay5(curr.timePeriod)
        );
        if (findData) {
          findData.totalRevenue += curr.totalRevenue;
          findData.totalOrders += curr.totalOrders;
        } else {
          arr.push({ ...curr });
        }
        setDataPaymentFind(arr);
        return arr;
      }, []);
    }
  }, [dataPaymentFilter]);
  useEffect(() => {
    findAndReduce();
  }, [findAndReduce]);

  /**************************************************FIND MONTH 2****************************************** */
  const getFindMonth = useCallback(() => {
    if (
      listPayment &&
      listPayment.length > 0 &&
      startFind === true &&
      selectPayment === "Tìm kiếm trong khoảng"
    ) {
      listPayment.reduce((arr, curr) => {
        let findData = arr.find(
          (item) => FormatDay5(item.timePeriod) === FormatDay5(curr.timePeriod)
        );
        if (findData) {
          findData.totalRevenue += curr.totalRevenue;
          findData.totalOrders += curr.totalOrders;
        } else {
          arr.push({ ...curr });
        }

        setDataPaymentFind2(arr);
        return arr;
      }, []);
    } else {
      setDataPaymentFind2([]);
    }
  }, [listPayment, startFind, selectPayment]);

  useEffect(() => {
    getFindMonth();
  }, [getFindMonth]);
  /**************************************************SET startDateAndEndDate****************************************** */
  const getStartDateAndEndDate = useCallback(() => {
    if (
      listPayment &&
      listPayment.length > 0 &&
      selectPayment === "Tìm kiếm trong khoảng" &&
      startFind === true
    ) {
      const [first, last] = [
        listPayment[0].timePeriod,
        listPayment[listPayment.length - 1].timePeriod,
      ];
      setStartDateAndEndDate([first, last]);
    }
  }, [listPayment, selectPayment, startFind]);

  useEffect(() => {
    getStartDateAndEndDate();
  }, [getStartDateAndEndDate]);

  /**************************************************SUCCESS DATA****************************************** */

  const dataPaymentStatistics = useCallback(() => {
    if (dataPaymentFind && dataPaymentFind.length > 0 && selectPaymentMonth) {
      let newDataA = [];
      let newDataB = [];
      let newTotalMonth = 0;
      let newTotalQuantity = 0;
      let newTotalYear = 0;
      let newTotalQuantityYear = 0;
      if (
        selectPayment === "Tìm kiếm theo năm" ||
        (startFind === false && selectPayment === "Tìm kiếm trong khoảng")
      ) {
        setStartFind(false);
        setStartDate("");
        setEndDate("");
        if (startFind === false) {
          for (let i = 0; i < dataPaymentFind.length; i++) {
            newTotalYear += dataPaymentFind[i].totalRevenue;
            newTotalQuantityYear += dataPaymentFind[i].totalOrders;
            if (
              FormatDay5(dataPaymentFind[i].timePeriod) ===
                selectPaymentMonth &&
              FormatDay4(dataPaymentFind[i].timePeriod) === selectPaymentYear
            ) {
              newTotalMonth += dataPaymentFind[i].totalRevenue;
              newTotalQuantity += dataPaymentFind[i].totalOrders;
              newDataA.push({
                name: dataPaymentFind[i].paymentMethod
                  ? "Tổng số giao dịch"
                  : dataPaymentFind[i].paymentMethod,
                value: dataPaymentFind[i].totalOrders,
              });
              newDataB.push({
                name: dataPaymentFind[i].paymentMethod,
                value: dataPaymentFind[i].totalRevenue,
              });
            }
          }
        }
      } else {
        if (
          startFind === true &&
          dataPaymentFind2 &&
          dataPaymentFind2.length > 0
        ) {
          for (let i = 0; i < dataPaymentFind2.length; i++) {
            newTotalYear += dataPaymentFind2[i].totalRevenue;
            newDataA.push({
              name: dataPaymentFind2[i].paymentMethod
                ? "Tổng số giao dịch"
                : dataPaymentFind2[i].paymentMethod,
              value: dataPaymentFind2[i].totalOrders,
            });
            newDataB.push({
              name: `${FormatDay5(dataPaymentFind2[i].timePeriod)}`,
              value: dataPaymentFind2[i].totalRevenue,
            });
          }
        }
      }
      setTotalYear(newTotalYear);
      setTotalMonth(newTotalMonth);
      setTotalQuantity(newTotalQuantity);
      setTotalQuantityYear(newTotalQuantityYear);
      setDataA(newDataA);
      setDataB(newDataB);
    }
  }, [
    dataPaymentFind,
    selectPaymentMonth,
    startFind,
    selectPayment,
    dataPaymentFind2,
    selectPaymentYear,
  ]);

  useEffect(() => {
    dataPaymentStatistics();
  }, [dataPaymentStatistics]);

  const data01 = dataA;
  const data02 = dataB;
  /**************************************************FIND DATE****************************************** */

  const handleClickFind = async () => {
    if (startDate && endDate && selectPayment === "Tìm kiếm trong khoảng") {
      await getPayment(startDate, endDate, setListPayment, setIsLoading);
      setStartFind(true);
    }
  };

  return (
    <div className="layout-payment">
      <div className="box-payment mb-2">
        <h1>Thống kê doanh thu</h1>
        <div className="find-data mt-2">
          <select
            value={selectPayment}
            onChange={(e) => setSelectPayment(e.target.value)}
          >
            <option>Tìm kiếm theo năm</option>
            <option>Tìm kiếm trong khoảng</option>
          </select>
          {selectPayment === "Tìm kiếm theo năm" ? (
            <>
              <select
                value={selectPaymentMonth}
                onChange={(e) => setSelectPaymentMonth(e.target.value)}
              >
                {dataMonth.length > 0 ? (
                  dataMonth.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        Tháng:{item}
                      </option>
                    );
                  })
                ) : (
                  <option>Không có dữ liệu tháng</option>
                )}
              </select>
              <select
                value={selectPaymentYear}
                onChange={(e) => setSelectPaymentYear(e.target.value)}
              >
                <option>2025</option>
                {dateYear.length > 0
                  ? dateYear.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          Năm:{item}
                        </option>
                      );
                    })
                  : "không có dữ liệu"}
              </select>
            </>
          ) : (
            <div className="box-date">
              <div className="form-date">
                <label>Từ ngày:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-date">
                <label>Đến ngày:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="bt-date">
                <button onClick={handleClickFind}>Tìm</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="containerStyle">
        {dataA && dataA.length > 0 && dataB && dataB.length > 0 ? (
          <>
            {isLoading ? (
              <div className="box-loading text-center">
                <LoadingOutlined className="loading" />
              </div>
            ) : (
              <>
                {listPayment && listPayment.length > 0 ? (
                  <>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          {startFind === false
                            ? `Chi tiết giao dịch tháng ${selectPaymentMonth}`
                            : `Chi tiết giao dich từ ngày ${FormatDay2(
                                startDateAndEndDate[0]
                              )} đến ngày ${FormatDay2(
                                startDateAndEndDate[1]
                              )}`}
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="box2">
                            {startFind === false ? (
                              <>
                                <span>
                                  <Tag color="orange" className="text-color">
                                    Tổng tiền thanh toán tháng{" "}
                                    {selectPaymentMonth} :
                                  </Tag>
                                  <Tag color="#87d068" className="text-color">
                                    {ConvertMoney(totalMonth)}
                                  </Tag>
                                </span>
                                <span>
                                  <Tag color="orange" className="text-color">
                                    Tổng số giao dịch tháng {selectPaymentMonth}{" "}
                                    :
                                  </Tag>

                                  <Tag color="#87d068" className="text-color">
                                    {`${totalQuantity} lần`}
                                  </Tag>
                                </span>
                              </>
                            ) : (
                              <>
                                {dataPaymentFind2.map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="box-content-tag"
                                    >
                                      <div className="box-tag">
                                        <Tag
                                          color={COLORS[index % COLORS.length]}
                                          className="text-color"
                                        >
                                          {`Tổng tiền tháng ${FormatDay5(
                                            item.timePeriod
                                          )} : `}
                                        </Tag>
                                        <Tag
                                          color={COLORS[index % COLORS.length]}
                                          className="text-color"
                                        >
                                          {`${ConvertMoney(item.totalRevenue)}`}
                                        </Tag>
                                      </div>
                                      <div className="box-tag">
                                        <Tag
                                          color={COLORS[index % COLORS.length]}
                                          className="text-color"
                                        >
                                          {`Tổng số giao dịch ${FormatDay5(
                                            item.timePeriod
                                          )} :`}
                                        </Tag>
                                        <Tag
                                          color={COLORS[index % COLORS.length]}
                                          className="text-color"
                                        >
                                          {`${item.totalOrders} lần`}
                                        </Tag>
                                      </div>
                                    </div>
                                  );
                                })}
                                <div>
                                  <Tag color="#f50" className="text-color">
                                    Tổng tiền năm
                                    {FormatDay4(startDateAndEndDate[0])} :
                                  </Tag>
                                  <Tag className="text-color" color="#f50">
                                    {ConvertMoney(totalYear)}
                                  </Tag>
                                </div>
                                <div>
                                  <Tag
                                    color="#108ee9"
                                    onClick={() => setIsMt(!isMt)}
                                    style={{ cursor: "pointer" }}
                                    className="text-color"
                                  >
                                    {isMt ? (
                                      <IoIosCloseCircle size={20} />
                                    ) : (
                                      `Máy tính`
                                    )}
                                  </Tag>
                                  {isMt && (
                                    <>
                                      <Tag color="#108ee9">
                                        <input
                                          placeholder="nhập số"
                                          className="ip-ss"
                                          type="text"
                                        />
                                      </Tag>
                                      <Tag color="#108ee9">+</Tag>
                                      <Tag color="#108ee9">
                                        <input
                                          placeholder="nhập số"
                                          className="ip-ss"
                                          type="text"
                                        />
                                      </Tag>
                                      <Tag color="#108ee9">=</Tag>
                                      <Tag color="#108ee9">?</Tag>
                                    </>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      {startFind === false &&
                        selectPayment === "Tìm kiếm theo năm" && (
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              Chi tiết giao dịch năm {selectPaymentYear}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className="box2">
                                <span>
                                  <Tag color="orange" className="text-color">
                                    Tổng tiền thanh toán trong năm{" "}
                                    {selectPaymentYear} :
                                  </Tag>

                                  <Tag color="#87d068" className="text-color">
                                    {ConvertMoney(totalYear)}
                                  </Tag>
                                </span>
                                <span>
                                  <Tag color="orange" className="text-color">
                                    Tổng số lần thanh toán trong năm{" "}
                                    {selectPaymentYear} :
                                  </Tag>

                                  <Tag color="#87d068" className="text-color">
                                    {`${totalQuantityYear} lần`}
                                  </Tag>
                                  <span className="text-color"></span>
                                </span>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        )}
                    </Accordion>
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie
                          data={data01}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          fill="#8884d8"
                        >
                          {data01.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>

                        <Pie
                          data={data02}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#82ca9d"
                          label={({ name, value }) =>
                            `${name} : ${ConvertMoney(value)}`
                          }
                        >
                          {data02.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="content-bar">
                      {dataA.length > 0 &&
                        dataA.map((item, index) => {
                          return (
                            <div className="box-bar">
                              <div
                                className="bar"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              ></div>
                              <span
                                key={index}
                                style={{ color: COLORS[index % COLORS.length] }}
                              >
                                {item.name ? "Tổng số giao dịch" : item.name} :{" "}
                                {item.value}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <div className="no-data">
                    Không có dữ liệu từ ngày {FormatDay2(startDate)} đến ngày{" "}
                    {FormatDay2(endDate)}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div style={{ padding: "10px 0", textAlign: "center" }}>
            Không có dữ liệu
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatistics;
