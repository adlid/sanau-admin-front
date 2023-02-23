import React, { FC, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { changeMeterImpulsesNumberThunk } from "../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";

interface IEditLorawanGatewayModalProps {
  open: boolean;
  onClose: any;
  gatewayId: string | undefined;
  editThunk: any;
}

export const EditLorawanGatewayModal: FC<IEditLorawanGatewayModalProps> = (props) => {
  const { open, onClose, gatewayId, editThunk } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  const initialValues = { city: "", address: "" };
  const [values, setValues] = useState(initialValues);
  const handleChange = (name: string, value: string) => setValues({ ...values, [name]: value });

  const editWaterLorawanGateway = async () => {
    setIsRequesting(true);
    await dispatch(editThunk({ id: gatewayId, city: values.city, address: values.address }));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered className="special_modal">
      <Modal.Header className="template_modal__header greyHeaderColor" closeButton>
        <Modal.Title className="template_modal__header_title greyHeaderColor_title">Введите адрес</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <Form.Group>
          <Form.Control
            type="text"
            onChange={(e: any) => handleChange("city", e.target.value)}
            value={values.city}
            placeholder="Город"
          />
          <div className="mb8px" />
          <Form.Control
            as="textarea"
            placeholder="Адрес"
            rows={3}
            type="text"
            onChange={(e: any) => handleChange("address", e.target.value)}
            value={values.address}
          />
        </Form.Group>
        <div className="mb8px" />
      </Modal.Body>
      <Modal.Footer className="template_modal__footer">
        <Button
          onClick={onClose}
          className="template_modal__footer_btn"
          style={{ background: "#355169" }}
          disabled={isRequesting}
        >
          Отмена
        </Button>
        <Button
          variant="primary"
          className="template_modal__footer_btn"
          style={{ background: "#18A0FB" }}
          onClick={editWaterLorawanGateway}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Сохранить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
