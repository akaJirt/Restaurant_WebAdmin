import { Avatar } from "antd";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ConvertMoney from "../../../../utils/convertMoney";

function ModalOrder({ show, setShow, listDataItem }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Món đã đặt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listDataItem && listDataItem.length > 0 ? (
            listDataItem.map((item, index) => {
              return (
                <fieldset key={index} className="border rounded-3 p-3">
                  <legend
                    className="float-none w-auto px-3"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {item.engName}:
                  </legend>
                  <div className="row">
                    <div className="col-2">
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 80,
                          xxl: 100,
                        }}
                        icon={<img src={item.image_url} alt="img_user" />}
                      />
                    </div>
                    <div className="col-10">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tên món"
                        className="mb-3"
                      >
                        <Form.Control
                          defaultValue={item.name}
                          type="text"
                          placeholder="name@example.com"
                          disabled
                          readOnly
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Số lượng"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.quantity}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="mt-3 mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Giá"
                      className="mb-3"
                    >
                      <Form.Control
                        value={ConvertMoney(item.price || 0)}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </fieldset>
              );
            })
          ) : (
            <div>Không có dữ liệu</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalOrder;
