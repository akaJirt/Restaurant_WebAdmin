import React, { useState } from "react";
import "./Promotion.scss";
import TablePromotion from "../../components/tables/tablePromotions/TablePromotion";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormPromotion from "../../components/form/formPromotions/FormPromotion";
import ModalPromotion from "./Modal/Modal";
function Promotion(props) {
  console.log("render Promotion");
  const [listDataPromotion, setListDataPromotion] = useState([]);
  const [show, setShow] = useState(false);
  const [itemPromotion, setItemPromotion] = useState({});
  const theme = useSelector(getThemeState);
  const [statusPromotion, setStatusPromotion] = useState(["create"]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [id, setId] = useState("");

  const handleSelect = (key) => {
    console.log("Selected Tab: ", key);
    // Custom logic can be added here
    if (key === "Khuyến Mãi") {
      setStatusPromotion(["create"]);
      setCode("");
      setDescription("");
      setDiscount("");
      setDiscountType("");
      setMinOrderValue("");
      setMaxDiscount("");
      setStartDate("");
      setEndDate("");
    }
  };
  console.log(listDataPromotion, "check <<<<<<<<<<<<<<<<<<<<<<DATA");
  return (
    <div className={`layout-promotion ${theme ? "theme" : ""}`}>
      <ModalPromotion
        show={show}
        setShow={setShow}
        itemPromotion={itemPromotion}
        statusPromotion={statusPromotion}
        setCode={setCode}
        setDescription={setDescription}
        setDiscount={setDiscount}
        setDiscountType={setDiscountType}
        setMinOrderValue={setMinOrderValue}
        setMaxDiscount={setMaxDiscount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setId={setId}
      />
      <Tabs
        defaultActiveKey="Khuyến Mãi"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3 mx-3"
        onSelect={handleSelect}
      >
        <Tab eventKey="Khuyến Mãi" title="Khuyến Mãi">
          <TablePromotion
            listDataPromotion={listDataPromotion}
            setListDataPromotion={setListDataPromotion}
            setShow={setShow}
            setItemPromotion={setItemPromotion}
            setStatusPromotion={setStatusPromotion}
          />
        </Tab>
        <Tab
          eventKey={
            statusPromotion[0] === "update"
              ? "Update Khuyến Mãi"
              : "Taọ Khuyến Mãi"
          }
          title={
            statusPromotion[0] === "update"
              ? "Update Khuyến Mãi"
              : "Taọ Khuyến Mãi"
          }
        >
          <FormPromotion
            setListDataPromotion={setListDataPromotion}
            setCode={setCode}
            setDescription={setDescription}
            setDiscount={setDiscount}
            setDiscountType={setDiscountType}
            setMinOrderValue={setMinOrderValue}
            setMaxDiscount={setMaxDiscount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            code={code}
            description={description}
            discount={discount}
            discountType={discountType}
            minOrderValue={minOrderValue}
            maxDiscount={maxDiscount}
            startDate={startDate}
            endDate={endDate}
            statusPromotion={statusPromotion}
            listDataPromotion={listDataPromotion}
            id={id}
          />
        </Tab>
      </Tabs>
    </div>
  );
}

export default React.memo(Promotion);
