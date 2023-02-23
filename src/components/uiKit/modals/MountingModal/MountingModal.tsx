import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import React, { FC, useState, useEffect } from "react";
import { icons } from "../../../../utils/icons/icons";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
//  redux
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { meterMountingThunk } from "../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.thunk";
import { useSnackbar } from "notistack";

interface IMountingModalProps {
  open: boolean;
  onClose: any;
  meter: any;
}

export const MountingModal: FC<IMountingModalProps> = (props) => {
  const { open, onClose, meter } = props;

  // hooks
  const { enqueueSnackbar } = useSnackbar();
  const dispatch: any = useAppDispatch();

  const [validated, setValidated] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>("UDP");
  const handleChangeSelect = (e: any) => setSelectValue(e.target.value);

  const [inputValue, setInputValue] = useState<string>("");
  const handleChangeInput = (e: any) => setInputValue(e.target.value);

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(new Date());

  const mountMeter = async () => {
    if (!inputValue) {
      setValidated(true);
      enqueueSnackbar("Серийный номер не указан", { variant: "error" });
      return;
    }

    setIsRequesting(true);
    await dispatch(
      meterMountingThunk({
        serialNumber: inputValue,
        oldMeterSerialNumber: meter.barcode,
        meterType: "GAS",
        assemblingDate: startDate,
        type: selectValue,
        proceed: true,
      })
    );
    setIsRequesting(false);
    onClose();
  };

  useEffect(() => {
    return () => {
      setOpenFirstCalendar(false);
      setInputValue("");
      setSelectValue("UDP");
      setStartDate(new Date());
      setValidated(false);
    };
  }, [open]);

  return (
    <Modal {...props} show={open} onHide={onClose} dialogClassName="template_modal" centered className="special_modal">
      <Modal.Header className="template_modal__header greyHeaderColor" closeButton>
        <Modal.Title className="template_modal__header_title greyHeaderColor_title">Монтаж</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <p className="template_modal__body_text">Серийный номер</p>
        <div className="mb8px" />
        <Form.Control
          type="text"
          onChange={handleChangeInput}
          value={inputValue}
          placeholder=""
          style={validated && !inputValue ? { borderColor: "red" } : {}}
        />
        {validated && !inputValue && (
          <>
            <div className="mb8px" />
            <p className="template_modal__body_input-helper-error">Обязательное поле</p>
          </>
        )}
        <div className="mb20px" />
        <p className="template_modal__body_text">Тип подключения</p>
        <div className="mb8px" />
        <Form.Control as="select" value={selectValue} onChange={handleChangeSelect} className="form-control-select">
          <option value={"UDP"}>UDP</option>
        </Form.Control>
        {selectValue !== "UDP" && (
          <>
            <div className="mb8px" />
            <p className="template_modal__body_input-helper-error">
              Тип подключения был изменен. После сохранения прибор учета переместиться в список с соответствующим типом
              подключения
            </p>
          </>
        )}

        <div className="mb20px" />
        <p className="template_modal__body_text">Дата монтажа</p>
        <div className="mb8px" />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <KeyboardDatePicker
            style={{ width: "100%", height: "48px" }}
            open={openFirstCalendar}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            placeholder="ДД/ММ/ГГГГ"
            value={startDate}
            onClick={() => setOpenFirstCalendar(true)}
            onClose={() => setOpenFirstCalendar(false)}
            onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
            KeyboardButtonProps={{ "aria-label": "change date" }}
            keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
            InputProps={{ style: { height: 48 } }}
          />
        </MuiPickersUtilsProvider>
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
          onClick={mountMeter}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Сохранить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
