import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getOrder } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingOrderStatistical from "./LoadingOrderStatistical";
import { LoadingOutlined } from "@ant-design/icons";

const OrderStatistical = () => {
  const [listDataOrder, setListDataOrder] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [month, setMonth] = useState([]);
  const [listDataOrderSuccess, setListDataOrderSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /*****************************************GET DATA******************************* */
  const getOrderApi = useCallback(async () => {
    if (selectDate) {
      await getOrder(selectDate, "", "", setListDataOrder, setIsLoading);
    }
  }, [selectDate]);
  useEffect(() => {
    getOrderApi();
  }, [getOrderApi]);

  /*****************************************GET YEAR AND SELECT YEAR******************************* */
  const dataYear = useMemo(() => {
    if (listDataOrder && listDataOrder.length > 0) {
      if (selectDate !== "year") {
        return [
          ...new Set(listDataOrder.map((item) => FormatDay4(item._id) || [])),
        ];
      } else {
        return [...new Set(listDataOrder.map((item) => item._id || []))];
      }
    }
  }, [listDataOrder, selectDate]);
  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /*****************************************GET MONTH AND SELECT MONTH******************************* */
  const getMonth = useCallback(() => {
    if (listDataOrder && listDataOrder && selectYear) {
      let filterData = listDataOrder.filter(
        (item) => FormatDay4(item._id) === selectYear
      );
      setMonth(filterData);
    }
  }, [listDataOrder, selectYear]);
  useEffect(() => {
    getMonth();
  }, [getMonth]);

  let dataMonth = useMemo(() => {
    if (month && month.length > 0) {
      return [...new Set(month.map((item) => FormatDay5(item._id)) || [])];
    }
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth?.length === 0) {
      setSelectMonth("");
    }
  }, [selectMonth, dataMonth]);
  /*****************************************SUCCESS DATA******************************* */
  const getDataSuccess = useCallback(() => {
    if (
      listDataOrder &&
      listDataOrder.length > 0 &&
      selectDate &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < listDataOrder.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay4(listDataOrder[i]._id) === selectYear &&
            FormatDay5(listDataOrder[i]._id) === selectMonth
          ) {
            newData.unshift(listDataOrder[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listDataOrder[i]._id) === selectYear) {
            newData.unshift(listDataOrder[i]);
          }
        }
        if (selectDate === "year") {
          if (listDataOrder[i]._id === parseInt(selectYear)) {
            newData.unshift(listDataOrder[i]);
          }
        }
      }
      setListDataOrderSuccess(newData);
    }
  }, [listDataOrder, selectDate, selectYear, selectMonth]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  return (
    <div className="layout-order-statistical">
      <div className="content-order">
        <h1>Thống kê đặt món</h1>
        <div className="box-date mt-2 mb-2">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo ngày</option>
            <option value={"month"}>Tìm kiếm theo tháng</option>
            <option value={"year"}>Tìm kiếm trong năm</option>
          </select>
          {selectDate === "day" && (
            <select
              value={selectMonth}
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {dataMonth && dataMonth.length > 0 ? (
                dataMonth.map((month, i) => {
                  return (
                    <option value={month} key={i}>
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
              dataYear.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    Năm:{item}
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
          <LoadingOrderStatistical
            data={listDataOrderSuccess}
            selectDate={selectDate}
          />
        )}
      </div>
    </div>
  );
};

export default OrderStatistical;
