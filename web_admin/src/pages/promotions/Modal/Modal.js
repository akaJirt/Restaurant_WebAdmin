import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deletePromotion } from "../../../api/call_api/promotions/fetchApiPromotions";
import FormatDate from "../../../utils/FormatDate";
import { useCallback, useEffect } from "react";

function ModalPromotion({
  show,
  setShow,
  itemPromotion,
  statusPromotion,
  dataForm,
  setCode,
  setDescription,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount,
  setStartDate,
  setEndDate,
  setId,
}) {
  console.log(
    itemPromotion,
    "itemPromotion",
    statusPromotion,
    "statusPromotion",
    dataForm,
    "dataForm"
  );

  const getDataPromotion = useCallback(() => {
    if (statusPromotion[0] === "update") {
      setId(itemPromotion?.item?._id);
      setCode(itemPromotion?.item?.code);
      setDescription(itemPromotion?.item?.description);
      setDiscount(itemPromotion?.item?.discount);
      setDiscountType(itemPromotion?.item?.discountType);
      setMinOrderValue(itemPromotion?.item?.minOrderValue);
      setMaxDiscount(itemPromotion?.item?.maxDiscount);
      setStartDate(FormatDate(itemPromotion?.item?.startDate));
      setEndDate(FormatDate(itemPromotion?.item?.endDate));
    } else {
      setCode("");
      setDescription("");
      setDiscount("");
      setDiscountType("");
      setMinOrderValue("");
      setMaxDiscount("");
      setStartDate("");
      setEndDate("");
      setId("");
    }
  }, [
    statusPromotion,
    itemPromotion?.item,
    setCode,
    setDescription,
    setDiscount,
    setDiscountType,
    setEndDate,
    setMaxDiscount,
    setMinOrderValue,
    setStartDate,
    setId,
  ]);

  useEffect(() => {
    getDataPromotion();
  }, [getDataPromotion]);

  const handleClose = () => setShow(false);

  const handleClickXoa = async () => {
    if (statusPromotion[0] === "delete") {
      await deletePromotion(itemPromotion.id);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {statusPromotion[0] === "delete" && "Delete Promotion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusPromotion[0] === "delete" && (
            <>
              Bạn chắc chắn là muốn xóa Mã giảm giá
              <b>{itemPromotion.code} này không</b>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickXoa}>
            {statusPromotion[0] === "delete" && "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPromotion;
