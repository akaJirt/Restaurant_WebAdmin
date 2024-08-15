import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getMenuItem } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingMenuItemStatistical from "./LoadingMenuItemStatistical";
import { LoadingOutlined } from "@ant-design/icons";

const MenuItemStatistical = () => {
  const [listDataMenuItem, setListDataMenuItem] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [month, setMonth] = useState([]);
  const [dataMenuItemSuccess, setDataMenuItemSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /********************************************GET API DATA***************************** */
  const getMenuItemApi = useCallback(async () => {
    if (selectDate) {
      await getMenuItem(selectDate, "", "", setListDataMenuItem, setIsLoading);
    }
  }, [selectDate]);

  useEffect(() => {
    getMenuItemApi();
  }, [getMenuItemApi]);
  /********************************************GET YEAR AND SELECT YEAR***************************** */
  let dataYear = useMemo(() => {
    if (listDataMenuItem && listDataMenuItem.length > 0) {
      if (selectDate !== "year") {
        return [
          ...new Set(
            listDataMenuItem.map((item) => FormatDay4(item.timePeriod))
          ),
        ];
      } else {
        return [...new Set(listDataMenuItem.map((item) => item.timePeriod))];
      }
    }
  }, [listDataMenuItem, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /********************************************GET MONTH AND SELECT MONTH***************************** */
  const getMonth = useCallback(() => {
    if (listDataMenuItem && listDataMenuItem.length > 0 && selectYear) {
      let filterMonth = listDataMenuItem.filter(
        (item) => FormatDay4(item.timePeriod) === selectYear
      );
      setMonth(filterMonth.reverse());
    }
  }, [listDataMenuItem, selectYear]);

  useEffect(() => {
    getMonth();
  }, [getMonth]);

  let dataMonth = useMemo(() => {
    if (month && month.length > 0) {
      return [
        ...new Set(month.map((item) => FormatDay5(item.timePeriod)) || []),
      ];
    }
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (selectMonth.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectMonth]);
  /********************************************CONVERT DATA***************************** */
  let result = listDataMenuItem.reduce((arr, curr) => {
    const { timePeriod, totalQuantity, name } = curr;

    if (!arr[timePeriod]) {
      arr[timePeriod] = { timePeriod };
    }
    arr[timePeriod][name] = totalQuantity;
    return arr;
  }, []);
  const formatResult = Object.values(result);
  /********************************************Success DATA***************************** */
  const getDataSuccess = useCallback(() => {
    if (
      formatResult &&
      formatResult.length > 0 &&
      selectMonth &&
      selectDate &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < formatResult.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay5(formatResult[i].timePeriod) === selectMonth &&
            FormatDay4(formatResult[i].timePeriod) === selectYear
          ) {
            newData.push(formatResult[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(formatResult[i].timePeriod) === selectYear) {
            newData.push(formatResult[i]);
          }
        }
        if (selectDate === "year") {
          if (formatResult[i].timePeriod === parseInt(selectYear)) {
            newData.push(formatResult[i]);
          }
        }
      }
      if (JSON.stringify(newData) !== JSON.stringify(dataMenuItemSuccess)) {
        setDataMenuItemSuccess(newData);
      }
    }
  }, [formatResult, selectDate, selectYear, selectMonth, dataMenuItemSuccess]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  return (
    <div className="layout-menu-item-statistical">
      <div className="content-menu-item">
        <div className="box-menu mb-2 select">
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
              dataYear.map((year, i) => {
                return (
                  <option value={year} key={i}>
                    Năm:{year}
                  </option>
                );
              })
            ) : (
              <option>Không có dữ liệu</option>
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
          <LoadingMenuItemStatistical
            data={dataMenuItemSuccess}
            selectDate={selectDate}
          />
        )}
      </div>
    </div>
  );
};

export default MenuItemStatistical;
