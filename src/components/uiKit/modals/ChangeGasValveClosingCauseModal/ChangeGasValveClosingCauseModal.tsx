import React, { FC, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { changeMeterImpulsesNumberThunk } from "../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";

interface IChangeGasValveClosingCauseModalProps {
  open: boolean;
  onClose: any;
  meterId?: string;
}

export const ChangeGasValveClosingCauseModal: FC<IChangeGasValveClosingCauseModalProps> = (props) => {
  const { open, onClose, meterId } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const handleChange = (e: any) => setValue(e.target.value);

  const changeGasValveClosingCause = async () => {
    setIsRequesting(true);
    // await dispatch(changeMeterImpulsesNumberThunk({ meterId, impulses: value }));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered className="special_modal">
      <Modal.Header className="template_modal__header greyHeaderColor" closeButton>
        <Modal.Title className="template_modal__header_title greyHeaderColor_title">
          Причина закрытия клапана по команде
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <Form.Group>
          <Form.Control as="textarea" rows={3} type="text" onChange={handleChange} value={value} />
        </Form.Group>
        <div className="mb8px" />
        {/* <p className="template_modal__body_input-helper">Введите значение от 1 до 100</p> */}
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
          // onClick={changeGasValveClosingCause}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Сохранить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
