import React, { useCallback, useEffect, useMemo, useState } from "react";

import LoadingLineChart from "./LoadingLineChart";
import { getTable } from "../../../api/call_api/statistical/fetchApiStatistical";
import { useDispatch, useSelector } from "react-redux";
import { statisticalArrListTableState } from "../../../store/selector";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";

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
  const [totalArr, setTotalArr] = useState([]);

  /***********************************************GET DATA TABLE****************** */
  const getTableApi = useCallback(async () => {
    await getTable(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getTableApi();
  }, [getTableApi]);
  /***********************************************GET YEAR****************** */
  const dataYear = useMemo(() => {
    return [
      ...new Set(getStateArr.map((item) => FormatDay4(item.timePeriod) || [])),
    ];
  }, [getStateArr]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    }
  }, [selectYear, dataYear]);
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
    if (dataFind && dataFind.length > 0 && selectMonth && selectYear) {
      let newData = [];
      let totalMonth = 0;
      let totalOrderMonth = 0;
      let totalYear = 0;
      let totalOrderYear = 0;

      for (let i = 0; i < dataFind.length; i++) {
        totalYear += dataFind[i].totalRevenue;
        totalOrderYear += dataFind[i].totalOrders;

        if (
          FormatDay4(dataFind[i].timePeriod) === selectYear &&
          FormatDay5(dataFind[i].timePeriod) === selectMonth
        ) {
          totalMonth += dataFind[i].totalRevenue;
          totalOrderMonth += dataFind[i].totalOrders;
          newData.push({
            "Bàn số": dataFind[i].tableNumber,
            "Tổng tiền bàn": dataFind[i].totalRevenue,
            "Tổng lượt đặt bàn": dataFind[i].totalOrders,
          });
        }
      }
      setTotalArr([
        {
          moneyMonth: totalMonth,
          orderMonth: totalOrderMonth,
          moneyYear: totalYear,
          orderYear: totalOrderYear,
        },
      ]);

      setDataTableStatistic(newData);
    }
  }, [dataFind, selectMonth, selectYear]);

  useEffect(() => {
    dataSuccess();
  }, [dataSuccess]);

  return (
    <div className="layout-table">
      <div className="box-table">
        <h1>Thống kê bàn</h1>
        <div className="select-table mt-2 mb-2">
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
          <select
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
          >
            <option>Năm:2025</option>;
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
        <LoadingLineChart
          dataTable={dataTableStatistic}
          month={selectMonth}
          year={selectYear}
          totalArr={totalArr}
        />
      </div>
    </div>
  );
};

export default TableStatistics;
