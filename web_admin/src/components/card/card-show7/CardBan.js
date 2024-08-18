import React, { useCallback, useEffect, useState } from "react";
import { Card } from "antd";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import "./CardBan.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { toast } from "react-toastify";
import { apiTables } from "../../../api/AxiosInstall";
import LoadingCardBan from "./LoadingCardBan";
const CardBan = (props) => {
  console.log("render CardBan");
  const theme = useSelector(getThemeState);
  const [listDataTable, setListDataTable] = useState([]);
  const [isOpen] = useState("open");
  const [listDataTableSuccess, setListDataTableSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**********************************GET DATA********************** */
  useEffect(() => {
    getTableApi();
  }, []);
  const getTableApi = async () => {
    try {
      setIsLoading(true);

      const res = await apiTables.getTable();
      if (res && res.data && res.data.success === "success") {
        setIsLoading(false);

        setListDataTable(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };

  /**********************************DATA SUCCESS********************** */
  const getDataSuccess = useCallback(() => {
    if (listDataTable && listDataTable.length > 0 && isOpen) {
      let newData = [];
      for (let i = 0; i < listDataTable.length; i++) {
        if (listDataTable[i].status === isOpen) {
          newData.push(listDataTable[i]);
        }
      }
      console.log(newData, "check new data");

      setListDataTableSuccess(newData);
    }
  }, [listDataTable, isOpen]);
  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  return (
    <Card
      className={`card-ban ${theme ? "theme" : ""}`}
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Bàn đang hoạt động</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      {isLoading ? (
        <div className="box-loading">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <div className="box-body">
          {listDataTableSuccess && listDataTableSuccess.length > 0 ? (
            listDataTableSuccess.map((item, index) => (
              <LoadingCardBan key={index} data={item} />
            ))
          ) : (
            <span className="sp">Không có bàn nào hoạt động</span>
          )}
        </div>
      )}
    </Card>
  );
};

export default React.memo(CardBan);
