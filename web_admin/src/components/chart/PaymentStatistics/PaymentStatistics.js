import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getPayment } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingPayment from "./LoadingPayment";
import { LoadingOutlined } from "@ant-design/icons";
import { FcSearch } from "react-icons/fc";
import FindStatistical from "../../findStatistical/FindStatistical";
const PaymentStatistics = () => {
  const [listPayment, setListPayment] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [month, setMonth] = useState([]);
  const [listNewDataPayment, setListNewDataPayment] = useState([]);
  const [dataPaymentSuccess, setDataPaymentSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [runDate, setRunDate] = useState(false);
  /*******************************************GET API PAYMENT********************************** */
  const getPaymentApi = useCallback(async () => {
    if (selectDate !== "find") {
      setStarDate("");
      setEndDate("");
      setRunDate(false);
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
      let filterData = listPayment.filter(
        (item) => FormatDay4(item.timePeriod) === selectYear
      );
      if (filterData) {
        setMonth(filterData.reverse());
      }
    }
  }, [listPayment, selectYear]);
  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);

  const dataMonth = useMemo(() => {
    return [...new Set(month.map((item) => FormatDay5(item.timePeriod)) || [])];
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && selectYear && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectYear, selectMonth]);
  /*******************************************CONVERT DATA PAYMENT********************************** */
  const dataReduce = useCallback(() => {
    if (listPayment && listPayment.length > 0) {
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

      if (JSON.stringify(formatResult) !== JSON.stringify(listNewDataPayment)) {
        setListNewDataPayment(formatResult);
      }
    }
  }, [listPayment, listNewDataPayment]);

  useEffect(() => {
    dataReduce();
  }, [dataReduce]);
  console.log(listNewDataPayment, "listNewDataPayment");

  /*******************************************DATA-SUCCESS********************************* */
  const getSuccess = useCallback(() => {
    if (
      listNewDataPayment &&
      listNewDataPayment.length > 0 &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < listNewDataPayment.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay4(listNewDataPayment[i].timePeriod) === selectYear &&
            FormatDay5(listNewDataPayment[i].timePeriod) === selectMonth
          ) {
            newData.push(listNewDataPayment[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listNewDataPayment[i].timePeriod) === selectYear) {
            newData.push(listNewDataPayment[i]);
          }
        }
        if (selectDate === "year") {
          if (listNewDataPayment[i].timePeriod === parseInt(selectYear)) {
            newData.push(listNewDataPayment[i]);
          }
        }
        if (selectDate === "find" && starDate && endDate && runDate) {
          newData.push(listNewDataPayment[i]);
        }
      }
      setDataPaymentSuccess(newData);
    }
  }, [
    listNewDataPayment,
    selectMonth,
    selectYear,
    selectDate,
    starDate,
    endDate,
    runDate,
  ]);

  useEffect(() => {
    getSuccess();
  }, [getSuccess]);

  /************************************FIND DATA******************************** */
  const handleClickFind = async () => {
    setRunDate(true);
    await getPayment("day", starDate, endDate, setListPayment, setIsLoading);
  };

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
            <option value={"find"}>Tìm kiếm trong khoảng</option>
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
          {selectDate !== "find" ? (
            <select
              value={selectYear}
              onChange={(e) => setSelectYear(e.target.value)}
            >
              {dataYear && dataYear.length > 0 ? (
                dataYear.map((year, index) => {
                  return (
                    <option key={index} value={year}>
                      Năm:{year}
                    </option>
                  );
                })
              ) : (
                <option>Không có dữ liệu năm</option>
              )}
            </select>
          ) : (
            <div className="box-find">
              <FindStatistical
                handleClickFind={handleClickFind}
                valueStart={starDate}
                onChangeStart={(e) => setStarDate(e.target.value)}
                valueEnd={endDate}
                onChangeEnd={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : dataPaymentSuccess && dataPaymentSuccess.length > 0 ? (
          <LoadingPayment data={dataPaymentSuccess} selectDate={selectDate} />
        ) : (
          <div className="text-center py-3 find">
            Vui lòng nhập ngày bắt đầu và ngày kết thúc để bắt đầu tìm kiếm{" "}
            <FcSearch size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatistics;
