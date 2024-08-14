import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAverage } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingAverageStatistical from "./LoadingAverageStatistical";
import { LoadingOutlined } from "@ant-design/icons";

const AverageStatistical = () => {
  const [listDataAverage, setListDataAverage] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [month, setMonth] = useState([]);
  const [listDataAverageSuccess, setListDataAverageSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /****************************************GET DATA ************************/
  const getAverageApi = useCallback(async () => {
    if (selectDate) {
      await getAverage(selectDate, "", "", setListDataAverage, setIsLoading);
    }
  }, [selectDate]);

  useEffect(() => {
    getAverageApi();
  }, [getAverageApi]);
  /****************************************GET YEAR AND SELECT YEAR ************************/
  let dataYear = useMemo(() => {
    if (listDataAverage && listDataAverage.length > 0) {
      if (selectDate !== "year") {
        return [
          ...new Set(listDataAverage.map((item) => FormatDay4(item._id) || [])),
        ];
      } else {
        return [...new Set(listDataAverage.map((item) => item._id || []))];
      }
    }
  }, [listDataAverage, selectDate]);
  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);

  /****************************************GET MONTH AND SELECT MONTH ************************/
  const getMonth = useCallback(() => {
    if (listDataAverage && listDataAverage.length > 0 && selectYear) {
      let dataFilter = listDataAverage.filter(
        (item) => FormatDay4(item._id) === selectYear
      );
      setMonth(dataFilter);
    }
  }, [selectYear, listDataAverage]);
  useEffect(() => {
    getMonth();
  }, [getMonth]);

  let dataMonth = useMemo(() => {
    if (month && month.length > 0) {
      return [...new Set(month.map((item) => FormatDay5(item._id)))];
    }
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth?.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectMonth]);
  /****************************************SUCCESS DATA ************************/

  const getDataSuccess = useCallback(() => {
    if (
      listDataAverage &&
      listDataAverage.length > 0 &&
      selectDate &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < listDataAverage.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay5(listDataAverage[i]._id) === selectMonth &&
            FormatDay4(listDataAverage[i]._id) === selectYear
          ) {
            newData.unshift(listDataAverage[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listDataAverage[i]._id) === selectYear) {
            newData.unshift(listDataAverage[i]);
          }
        }
        if (selectDate === "year") {
          if (listDataAverage[i]._id === parseInt(selectYear)) {
            newData.unshift(listDataAverage[i]);
          }
        }
      }
      setListDataAverageSuccess(newData);
    }
  }, [listDataAverage, selectDate, selectYear, selectMonth]);

  console.log(listDataAverageSuccess, "listDataAverageSuccess");

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  return (
    <div className="layout-average-statistical mt-4">
      <div className="content-average">
        <h1>Thống kê trung bình tổng tiền</h1>
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
              {dataMonth && dataMonth.length ? (
                dataMonth.map((month, i) => {
                  return (
                    <option key={i} value={month}>
                      {month}
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
              dataYear.map((year, i) => {
                return (
                  <option key={i} value={year}>
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
          <LoadingAverageStatistical
            data={listDataAverageSuccess}
            selectDate={selectDate}
          />
        )}
      </div>
    </div>
  );
};

export default AverageStatistical;
