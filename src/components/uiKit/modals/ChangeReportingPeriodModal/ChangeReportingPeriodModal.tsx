import React, { FC, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { changeMeterReportPeriodThunk } from "../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";

interface IChangeReportingPeriodModalProps {
  open: boolean;
  onClose: any;
  meterId: string;
}

export const ChangeReportingPeriodModal: FC<IChangeReportingPeriodModalProps> = (props) => {
  const { open, onClose, meterId } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [value, setValue] = useState<string>("5");
  const handleChange = (e: any) => setValue(e.target.value);

  const changeReportingPeriod = async () => {
    setIsRequesting(true);
    await dispatch(changeMeterReportPeriodThunk({ period: value, meterId }));
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered className="special_modal">
      <Modal.Header className="template_modal__header greyHeaderColor" closeButton>
        <Modal.Title className="template_modal__header_title greyHeaderColor_title">
          Изменить отчетный период
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <Form.Control as="select" value={value} onChange={handleChange} className="form-control-select">
          <option value={"5"}>5 минут</option>
          <option value={"10"}>10 минут</option>
          <option value={"20"}>20 минут</option>
          <option value={"60"}>60 минут</option>
          <option value={"1440"}>1 день</option>
          <option value={"2880"}>2 дня</option>
          <option value={"14400"}>10 дней</option>
          <option value={"43200"}>1 месяц</option>
        </Form.Control>
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
          onClick={changeReportingPeriod}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Изменить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
