import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getPayment } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
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

  const result = listPayment.reduce((arr, curr) => {
    const { timePeriod, paymentMethod, totalRevenue, totalOrders } = curr;
    if (!arr[timePeriod]) {
      arr[timePeriod] = { timePeriod };
    }
    arr[timePeriod][paymentMethod] = totalRevenue;
    arr[timePeriod][`${paymentMethod}Order`] = totalOrders;
    return arr;
  }, []);

  const formatResult = Object.values(result);
  console.log(formatResult, "check format result");

  useEffect(() => {
    if (formatResult && formatResult.length > 0) {
      if (JSON.stringify(formatResult) !== JSON.stringify(listNewDataPayment)) {
        setListNewDataPayment(formatResult);
      }
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
            newData.push(listNewDataPayment[i]);
          }
        }
      }
      if (selectDate === "month") {
        for (let i = 0; i < listNewDataPayment.length; i++) {
          if (FormatDay4(listNewDataPayment[i].timePeriod) === selectYear) {
            newData.push(listNewDataPayment[i]);
          }
        }
      }
      if (selectDate === "year") {
        for (let i = 0; i < listNewDataPayment.length; i++) {
          if (listNewDataPayment[i].timePeriod === parseInt(selectYear)) {
            newData.push(listNewDataPayment[i]);
          }
        }
      }
      console.log(newData);

      setDataPaymentSuccess(newData);
    }
  }, [listNewDataPayment, selectMonth, selectYear, selectDate]);
  useEffect(() => {
    getSuccess();
  }, [getSuccess]);

  return (
    <div className="layout-payment">
      <div className="box-payment">
        <div className="find-data mb-2 select">
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
          <LoadingPayment data={dataPaymentSuccess} selectDate={selectDate} />
        )}
      </div>
    </div>
  );
};

export default PaymentStatistics;
