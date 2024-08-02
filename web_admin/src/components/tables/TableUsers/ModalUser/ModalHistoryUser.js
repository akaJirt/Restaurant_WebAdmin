import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Avatar } from "antd";
import { useCallback, useEffect, useState } from "react";
import { historyPaymentUser } from "../../../../api/call_api/auth/fetchApiAuth";
import { FormatDay } from "../../../../utils/FormDay";
import _ from "lodash";
import ConvertMoney from "../../../../utils/convertMoney";
const ModalHistoryUser = ({ show, setShow, item }) => {
  const [data, setData] = useState([]);
  console.log(data, "check data");
  const [listCash, setListCash] = useState({});
  const [listZaloPay, setlistZaloPay] = useState({});

  console.log(listZaloPay.amount, "listZaloPay");

  const getApiHistoryPayment = useCallback(async () => {
    if (item && show === true) {
      await historyPaymentUser(item._id, setData);
    } else {
      setData([]);
    }
  }, [item, show]);

  useEffect(() => {
    getApiHistoryPayment();
  }, [getApiHistoryPayment]);

  const getDataListPayment = useCallback(() => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].paymentMethod === "ZaloPay") {
          let newDataZaloPay = data[i];
          setlistZaloPay(newDataZaloPay);
        }
        if (data[i].paymentMethod === "Cash") {
          let newDataCash = data[i];
          setListCash(newDataCash);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    getDataListPayment();
  }, [getDataListPayment]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết người dùng <b>{item.fullName}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thông tin</Accordion.Header>
              <Accordion.Body>
                <div className="text-center mb-3">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<img src={item.img_avatar_url} alt="img_user" />}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Full Name"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.fullName}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.email}
                        type="email"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Role"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.role}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Xác Thực"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.isVerified}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Lịch sử đặt món</Accordion.Header>
              <Accordion.Body>
                {_.isArray(data) && data.length > 0 ? (
                  <>
                    <div className="row">
                      <div className="col-6">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              Thanh toán tiền mặt
                            </Accordion.Header>
                            <Accordion.Body>
                              <div>
                                <div className="mb-3">
                                  <h1 style={{ fontSize: "1.2rem" }}>
                                    Thông tin món
                                  </h1>
                                </div>
                                <div className="mt-3 mb-3">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Số bàn"
                                    className="mb-3"
                                  >
                                    <Form.Control
                                      defaultValue={listCash.tableNumber}
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
                                    label="Ngày đặt"
                                    className="mb-3"
                                  >
                                    <Form.Control
                                      defaultValue={FormatDay(
                                        listCash.createdAt
                                      )}
                                      type="text"
                                      placeholder="name@example.com"
                                      disabled
                                      readOnly
                                    />
                                  </FloatingLabel>
                                  <div className="mt-3 mb-3">
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Tổng Tiền"
                                      className="mb-3"
                                    >
                                      <Form.Control
                                        value={ConvertMoney(
                                          listCash.amount || 0
                                        )}
                                        type="text"
                                        placeholder="name@example.com"
                                        disabled
                                        readOnly
                                      />
                                    </FloatingLabel>
                                  </div>
                                </div>
                                {listCash?.items?.length > 0 &&
                                  listCash.items.map((item, index) => {
                                    return (
                                      <fieldset
                                        key={index}
                                        className="border rounded-3 p-3"
                                      >
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
                                          <div className="col-3">
                                            <Avatar
                                              size={{
                                                xs: 24,
                                                sm: 32,
                                                md: 40,
                                                lg: 64,
                                                xl: 80,
                                                xxl: 100,
                                              }}
                                              icon={
                                                <img
                                                  src={item.image_url}
                                                  alt="img_user"
                                                />
                                              }
                                            />
                                          </div>
                                          <div className="col-9">
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
                                              value={ConvertMoney(
                                                item.price || 0
                                              )}
                                              type="text"
                                              placeholder="name@example.com"
                                              disabled
                                              readOnly
                                            />
                                          </FloatingLabel>
                                        </div>
                                      </fieldset>
                                    );
                                  })}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                      <div className="col-6">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              Thanh toán bằng ZaloPay
                            </Accordion.Header>
                            <Accordion.Body>
                              <div>
                                <div className="mb-3">
                                  <h1 style={{ fontSize: "1.2rem" }}>
                                    Thông tin món
                                  </h1>
                                </div>
                                <div className="mt-3 mb-3">
                                  <FloatingLabel
                                    controlId="floatingInput"
                                    label="Số bàn"
                                    className="mb-3"
                                  >
                                    <Form.Control
                                      defaultValue={listZaloPay.tableNumber}
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
                                    label="Ngày đặt"
                                    className="mb-3"
                                  >
                                    <Form.Control
                                      defaultValue={FormatDay(
                                        listZaloPay.createdAt
                                      )}
                                      type="text"
                                      placeholder="name@example.com"
                                      disabled
                                      readOnly
                                    />
                                  </FloatingLabel>
                                  <div className="mt-3 mb-3">
                                    <FloatingLabel
                                      controlId="floatingInput"
                                      label="Tổng Tiền"
                                      className="mb-3"
                                    >
                                      <Form.Control
                                        value={ConvertMoney(
                                          listZaloPay.amount || 0
                                        )}
                                        type="text"
                                        placeholder="name@example.com"
                                        disabled
                                        readOnly
                                      />
                                    </FloatingLabel>
                                  </div>
                                </div>
                                {listZaloPay?.items?.length > 0 &&
                                  listZaloPay.items.map((item, index) => {
                                    return (
                                      <fieldset
                                        key={index}
                                        className="border rounded-3 p-3"
                                      >
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
                                          <div className="col-3">
                                            <Avatar
                                              size={{
                                                xs: 24,
                                                sm: 32,
                                                md: 40,
                                                lg: 64,
                                                xl: 80,
                                                xxl: 100,
                                              }}
                                              icon={
                                                <img
                                                  src={item.image_url}
                                                  alt="img_user"
                                                />
                                              }
                                            />
                                          </div>
                                          <div className="col-9">
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
                                              value={ConvertMoney(
                                                item.price || 0
                                              )}
                                              type="text"
                                              placeholder="name@example.com"
                                              disabled
                                              readOnly
                                            />
                                          </FloatingLabel>
                                        </div>
                                      </fieldset>
                                    );
                                  })}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">Không có dữ liệu</div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHistoryUser;
