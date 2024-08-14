import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoadingMenuItem from "./LoadingMenuItem";
import { getMenuitem } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import { LoadingOutlined } from "@ant-design/icons";

const MenuItemBestSelling = () => {
  const [listMenuitem, setListMenuitem] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [dataFilterMonth, setDataFilterMonth] = useState([]);
  const [dataMenuitem, setDataMenuitem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /******************************************GET API MENU ITEM*************************** */
  const getMenuitemApi = useCallback(async () => {
    if (selectDate) {
      await getMenuitem(selectDate, "", "", setListMenuitem, setIsLoading);
    }
  }, [selectDate]);

  useEffect(() => {
    getMenuitemApi();
  }, [getMenuitemApi]);
  /******************************************GET YEAR AND SELECT YEAR*************************** */

  let dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(listMenuitem.map((item) => FormatDay4(item.timePeriod))),
      ];
    } else {
      return [...new Set(listMenuitem.map((item) => item.timePeriod))];
    }
  }, [selectDate, listMenuitem]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    } else if (dataYear.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /******************************************GET Month AND SELECT Month*************************** */
  const getDataMonth = useCallback(() => {
    if (listMenuitem && listMenuitem.length > 0 && selectYear) {
      let dataFilter = listMenuitem.filter(
        (item) => FormatDay4(item.timePeriod) === selectYear
      );
      if (dataFilter) {
        setDataFilterMonth(dataFilter);
      } else {
        setDataFilterMonth([]);
      }
    }
  }, [listMenuitem, selectYear]);

  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);
  const dataMonth = useMemo(() => {
    if (dataFilterMonth && dataFilterMonth.length > 0 && selectYear) {
      return [
        ...new Set(
          dataFilterMonth.map((item) => FormatDay5(item.timePeriod) || [])
        ),
      ];
    }
  }, [dataFilterMonth, selectYear]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[dataMonth?.length - 1]);
    } else if (dataMonth?.length === 0) {
      setSelectMonth([]);
    }
  }, [dataMonth, selectMonth]);
  /******************************************CONVERT DATA*************************** */

  let result = listMenuitem.reduce((arr, curr) => {
    const { timePeriod, totalQuantity, name } = curr;

    if (!arr[timePeriod]) {
      arr[timePeriod] = { timePeriod };
    }

    arr[timePeriod][name] = totalQuantity;

    return arr;
  }, []);

  let formatResult = Object.values(result);
  console.log(formatResult, "check<<<<");
  console.log(selectDate, selectMonth, selectYear);

  /******************************************SUCCESS DATA*************************** */
  const menuitemSuccessData = useCallback(() => {
    if (
      formatResult &&
      formatResult.length > 0 &&
      selectMonth &&
      selectYear &&
      selectDate
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
      console.log(newData, "check new dataa");

      if (JSON.stringify(newData) !== JSON.stringify(dataMenuitem)) {
        setDataMenuitem(newData);
      }
    }
  }, [formatResult, selectDate, selectMonth, selectYear, dataMenuitem]);
  useEffect(() => {
    menuitemSuccessData();
  }, [menuitemSuccessData]);

  return (
    <div className="layout-menuitem-best-selling">
      <div className="box-menuitem">
        <h1>Thống kê món ăn ngon</h1>
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
                dataMonth.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      Tháng:{item}
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
                  <option value={item} key={index}>
                    Năm:{item}
                  </option>
                );
              })
            ) : (
              <option>Không có dữ liệu năm</option>
            )}
          </select>
        </div>
        <div className="containerStyle">
          {isLoading ? (
            <div className="box-loading text-center">
              <LoadingOutlined className="loading" />
            </div>
          ) : (
            <LoadingMenuItem data={dataMenuitem} selectDate={selectDate} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemBestSelling;
