import React, { useCallback, useEffect, useMemo, useState } from "react";

import LoadingLineChart from "./LoadingLineChart";
import { getTable } from "../../../api/call_api/statistical/fetchApiStatistical";
import { useDispatch, useSelector } from "react-redux";
import { statisticalArrListTableState } from "../../../store/selector";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import { LoadingOutlined } from "@ant-design/icons";

const TableStatistics = () => {
  const dispatch = useDispatch();
  const getStateArr = useSelector(statisticalArrListTableState);
  // const getLoading = useSelector(statisticalLoadingTableState);
  const [month, setMonth] = useState([]);
  const [tableNumber, setTableNumber] = useState([]);
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectTableNumber, setSelectTableNumber] = useState("");
  const [dataFind, setDataFind] = useState([]);
  const [dataTableStatistic, setDataTableStatistic] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [isLoading, setIsLoading] = useState(false);

  /***********************************************GET DATA TABLE****************** */
  const getTableApi = useCallback(async () => {
    if (selectDate) {
      await getTable(selectDate, "", "", dispatch, setIsLoading);
    }
  }, [dispatch, selectDate]);

  useEffect(() => {
    getTableApi();
  }, [getTableApi]);
  /***********************************************GET YEAR****************** */

  const dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(getStateArr.map((item) => FormatDay4(item.timePeriod))),
      ];
    } else {
      return [...new Set(getStateArr.map((item) => item.timePeriod || []))];
    }
  }, [getStateArr, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0) {
      let lastYear = dataYear[dataYear.length - 1];
      setSelectYear(lastYear);
    }
  }, [dataYear]);
  /***********************************************GET LAY MONTH AND TABLE****************** */

  const getFilterMonth = useCallback(async () => {
    if (selectYear && getStateArr && getStateArr.length > 0) {
      let newMonth = [];
      let newTableNumber = [];
      for (let i = 0; i < getStateArr.length; i++) {
        if (FormatDay4(getStateArr[i].timePeriod) === selectYear) {
          newMonth.unshift({ month: FormatDay5(getStateArr[i].timePeriod) });
        }
        if (FormatDay5(getStateArr[i].timePeriod) === selectMonth) {
          newTableNumber.unshift({ table: getStateArr[i].tableNumber });
        }
      }

      setMonth(newMonth.length > 0 ? newMonth : []);
      setTableNumber(newTableNumber);
    }
  }, [selectYear, getStateArr, selectMonth]);

  useEffect(() => {
    getFilterMonth();
  }, [getFilterMonth]);
  /***********************************************Xu li SET MONTH AND TABLE****************** */

  let dataMonth = useMemo(() => {
    return [...new Set(month.map((item) => item.month || []))];
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectMonth("");
    }
  }, [selectMonth, dataMonth]);

  let dataTableNumber = useMemo(() => {
    return [...new Set(tableNumber.map((item) => item.table || []))];
  }, [tableNumber]);

  useEffect(() => {
    if (dataTableNumber && dataTableNumber.length > 0 && !selectTableNumber) {
      setSelectTableNumber(dataTableNumber[0]);
    }
  }, [dataTableNumber, selectTableNumber]);

  /***********************************************Xu li Find AND REDUCE****************** */
  const dataReduceFind = useCallback(() => {
    if (
      getStateArr &&
      getStateArr.length > 0 &&
      selectMonth &&
      selectTableNumber &&
      selectYear
    ) {
      getStateArr.reduce((arr, curr) => {
        let dataFind = arr.find(
          (item) =>
            FormatDay5(item.timePeriod) === FormatDay5(curr.timePeriod) &&
            item.tableNumber === curr.tableNumber &&
            FormatDay4(item.timePeriod) === FormatDay4(curr.timePeriod)
        );
        if (dataFind) {
          dataFind.totalOrders += curr.totalOrders;
          dataFind.totalRevenue += curr.totalRevenue;
        } else {
          arr.push({ ...curr });
        }
        setDataFind(arr);
        return arr;
      }, []);
    }
  }, [getStateArr, selectMonth, selectTableNumber, selectYear]);

  useEffect(() => {
    dataReduceFind();
  }, [dataReduceFind]);

  /***********************************************SUCCESS DATA****************** */

  const dataSuccess = useCallback(() => {
    if (
      dataFind &&
      dataFind.length > 0 &&
      selectMonth &&
      selectYear &&
      selectDate
    ) {
      let newData = [];
      if (selectDate === "day") {
        for (let i = 0; i < dataFind.length; i++) {
          if (
            FormatDay4(dataFind[i].timePeriod) === selectYear &&
            FormatDay5(dataFind[i].timePeriod) === selectMonth
          ) {
            newData.push({
              Bàn: dataFind[i].tableNumber,
              "Tổng tiền bàn": dataFind[i].totalRevenue,
              "Tổng lượt đặt bàn": dataFind[i].totalOrders,
            });
          }
        }
      }
      if (selectDate === "year") {
        for (let i = 0; i < dataFind.length; i++) {
          if (
            FormatDay4(dataFind[i].timePeriod) === selectYear ||
            dataFind[i].timePeriod === parseInt(selectYear)
          ) {
            newData.push({
              Bàn: dataFind[i].tableNumber,
              "Tổng tiền bàn": dataFind[i].totalRevenue,
              "Tổng lượt đặt bàn": dataFind[i].totalOrders,
            });
          }
        }
      }

      setDataTableStatistic(newData);
    }
  }, [dataFind, selectMonth, selectYear, selectDate]);

  useEffect(() => {
    dataSuccess();
  }, [dataSuccess]);

  return (
    <div className="layout-table-statistical">
      <div className="box-table">
        <h1>Thống kê bàn</h1>
        <div className="select-table mt-2 mb-2">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo tháng</option>
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
                <option>không có dữ liệu tháng</option>
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
                    Năm:{year}
                  </option>
                );
              })
            ) : (
              <option>không có dữ liệu Năm</option>
            )}
          </select>
        </div>
      </div>
      <div className="containerStyle2">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <LoadingLineChart
            dataTable={dataTableStatistic}
            month={selectMonth}
            year={selectYear}
          />
        )}
      </div>
    </div>
  );
};

export default TableStatistics;
