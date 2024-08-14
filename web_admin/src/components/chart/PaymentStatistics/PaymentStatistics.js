import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getPayment } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay2, FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingPayment from "./LoadingPayment";
import { LoadingOutlined } from "@ant-design/icons";

const PaymentStatistics = () => {
  const [listPayment, setListPayment] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [month, setMonth] = useState([]);
  const [listNewDataPayment, setListNewDataPayment] = useState([]);
  const [dataPaymentSuccess, setDataPaymentSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*******************************************GET API PAYMENT********************************** */
  const getPaymentApi = useCallback(async () => {
    if (selectDate) {
      await getPayment(selectDate, "", "", setListPayment, setIsLoading);
    }
  }, [selectDate]);

  useEffect(() => {
    getPaymentApi();
  }, [getPaymentApi]);
  /*******************************************GET YEAR AND SELECT YEAR********************************** */
  const dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(
          listPayment.map((item) => FormatDay4(item.timePeriod) || [])
        ),
      ];
    } else {
      return [...new Set(listPayment.map((item) => item.timePeriod || []))];
    }
  }, [listPayment, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    } else if (dataYear.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /*******************************************GET MONTH AND SELECT MONTH********************************** */
  const getDataMonth = useCallback(() => {
    if (listPayment && listPayment.length > 0 && selectYear) {
      let newDataMonth = [];
      for (let i = 0; i < listPayment.length; i++) {
        if (FormatDay4(listPayment[i].timePeriod) === selectYear) {
          newDataMonth.unshift(FormatDay5(listPayment[i].timePeriod));
        }
      }
      setMonth(newDataMonth);
    }
  }, [listPayment, selectYear]);
  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);

  const dataMonth = useMemo(() => {
    return [...new Set(month.map((item) => item) || [])];
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && selectYear && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectYear, selectMonth]);
  /*******************************************CONVERT DATA PAYMENT********************************** */
  const paymentMethod = [
    "Cash",
    "ZaloPay",
    "Banking",
    "CashOrder",
    "ZaloPayOrder",
    "BankingOrder",
  ];
  const result = listPayment.reduce((arr, curr) => {
    const { timePeriod, paymentMethod, totalRevenue, totalOrders } = curr;
    if (!arr[timePeriod]) {
      arr[timePeriod] = { timePeriod };
    }
    arr[timePeriod][paymentMethod] = totalRevenue;
    arr[timePeriod][`${paymentMethod}Order`] = totalOrders;
    return arr;
  }, []);

  paymentMethod.forEach((method) => {
    Object.keys(result).forEach((timePeriod) => {
      if (!result[timePeriod][method]) {
        result[timePeriod][method] = 0;
      }
    });
  });

  const formatResult = Object.values(result);

  useEffect(() => {
    if (formatResult && formatResult.length > 0) {
      if (JSON.stringify(formatResult) !== JSON.stringify(listNewDataPayment)) {
        setListNewDataPayment(formatResult);
      }
    } else if (formatResult.length === 0) {
      setListNewDataPayment([]);
    }
  }, [formatResult, listNewDataPayment]);

  /*******************************************DATA-SUCCESS********************************* */
  const getSuccess = useCallback(() => {
    if (
      listNewDataPayment &&
      listNewDataPayment.length > 0 &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      if (selectDate === "day") {
        for (let i = 0; i < listNewDataPayment.length; i++) {
          if (
            FormatDay4(listNewDataPayment[i].timePeriod) === selectYear &&
            FormatDay5(listNewDataPayment[i].timePeriod) === selectMonth
          ) {
            newData.push({
              timePeriod: `${FormatDay2(listNewDataPayment[i].timePeriod)}`,
              ZaloPay: listNewDataPayment[i].ZaloPay,
              ZaloPayOrder: listNewDataPayment[i].ZaloPayOrder,
              CashOrder: listNewDataPayment[i].CashOrder,
              BankingOrder: listNewDataPayment[i].BankingOrder,
              Cash: listNewDataPayment[i].Cash,
              Banking: listNewDataPayment[i].Banking,
            });
          }
        }
      }
      if (selectDate === "month") {
        for (let i = 0; i < listNewDataPayment.length; i++) {
          if (FormatDay4(listNewDataPayment[i].timePeriod) === selectYear) {
            newData.push({
              timePeriod: `${FormatDay2(listNewDataPayment[i].timePeriod)}`,
              ZaloPay: listNewDataPayment[i].ZaloPay,
              ZaloPayOrder: listNewDataPayment[i].ZaloPayOrder,
              CashOrder: listNewDataPayment[i].CashOrder,
              BankingOrder: listNewDataPayment[i].BankingOrder,
              Cash: listNewDataPayment[i].Cash,
              Banking: listNewDataPayment[i].Banking,
            });
          }
        }
      }
      if (selectDate === "year") {
        for (let i = 0; i < listNewDataPayment.length; i++) {
          if (listNewDataPayment[i].timePeriod === parseInt(selectYear)) {
            newData.push({
              timePeriod: listNewDataPayment[i].timePeriod,
              ZaloPay: listNewDataPayment[i].ZaloPay,
              ZaloPayOrder: listNewDataPayment[i].ZaloPayOrder,
              CashOrder: listNewDataPayment[i].CashOrder,
              BankingOrder: listNewDataPayment[i].BankingOrder,
              Cash: listNewDataPayment[i].Cash,
              Banking: listNewDataPayment[i].Banking,
            });
          }
        }
      }
      setDataPaymentSuccess(newData);
    }
  }, [listNewDataPayment, selectMonth, selectYear, selectDate]);
  useEffect(() => {
    getSuccess();
  }, [getSuccess]);

  return (
    <div className="layout-payment">
      <div className="box-payment mb-2">
        <h1>Thống kê thanh toán</h1>
        <div className="find-data mt-2">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo ngày</option>
            <option value={"month"}>Tìm kiếm trong tháng</option>
            <option value={"year"}>Tìm kiếm trong năm</option>
          </select>
          {selectDate === "day" && (
            <select
              value={selectMonth}
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {dataMonth && dataMonth.length > 0 ? (
                dataMonth.map((month, index) => {
                  return (
                    <option key={index} value={month}>
                      Tháng:{month}
                    </option>
                  );
                })
              ) : (
                <option>Không có dữ liệu tháng</option>
              )}
            </select>
          )}
          <select
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
          >
            {dataYear && dataYear.length > 0 ? (
              dataYear.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })
            ) : (
              <option>Không có dữ liệu năm</option>
            )}
          </select>
        </div>
      </div>
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <LoadingPayment data={dataPaymentSuccess} />
        )}
      </div>
    </div>
  );
};

export default PaymentStatistics;
