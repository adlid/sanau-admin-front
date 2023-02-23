import moment from "moment";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import React, { FC, useState } from "react";
import { icons } from "../../../../utils/icons/icons";
import { Button, Modal, Spinner } from "react-bootstrap";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { changeWaterLorawanTimeDateThunk } from "../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";

interface IChangeDateAndTimeModalProps {
  open: boolean;
  onClose: any;
  meterId: string;
}

export const ChangeDateAndTimeModal: FC<IChangeDateAndTimeModalProps> = (props) => {
  const { open, onClose, meterId } = props;
  const dispatch: any = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [time, setTime] = useState("");

  const changeDateAndTime = async () => {
    setIsRequesting(true);
    await dispatch(
      changeWaterLorawanTimeDateThunk({
        meterId,
        time: time,
        date: moment(startDate).format("YYYY-MM-DD"),
      })
    );
    setIsRequesting(false);
    onClose();
  };

  return (
    <Modal
      {...props}
      show={open}
      onHide={onClose}
      dialogClassName="template_modal small"
      centered
      className="special_modal"
    >
      <Modal.Header className="template_modal__header greyHeaderColor" closeButton>
        <Modal.Title className="template_modal__header_title greyHeaderColor_title">Изменить дату и время</Modal.Title>
      </Modal.Header>
      <Modal.Body className="template_modal__body">
        <div className="delete-concentrator-popup__wrap changeTimeConcentratorPopup">
          <div className="changeTimeConcentratorPopup__wrap d-flex justify-content-between">
            <div className="changeTimeConcentratorPopup__item">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                <KeyboardDatePicker
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
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="mr12px"></div>
            <div className="modals_changeTimeConcentratorPopup__item">
              <div className="input-blocks__item input-blocks__time">
                <input name="zeroTime" onChange={(e) => setTime(e.target.value)} type="time" value={time} />
              </div>
            </div>
          </div>
        </div>
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
          onClick={changeDateAndTime}
          disabled={isRequesting}
        >
          {isRequesting ? <Spinner animation="border" size="sm" /> : "Изменить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
