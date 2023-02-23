import { FC, useState } from "react"
import { Form, Modal } from "react-bootstrap";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { icons } from "../../../../../../utils/icons/icons"
import { CustomRadio } from "../../../../../../components/uiKit/Inputs/CustomRadio"
import { MainButton } from "../../../../../../components/uiKit/Buttons/MainButton";

//formik
import { useFormik } from "formik";
import * as yup from "yup";
import { useTypedSelector } from '../../../../../../utils/hooks/reduxHooks';
//popups 
import { CustomizeDisplayModesPopup } from "./components/CustomizeDisplayModesPopup"
import { GPSParamsPopup } from "./components/GPSParamsPopup"
import { PowerPopup } from "./components/PowerPopup"


export const ParamsPage: FC = () => {
  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null>(null);
  const [startHour, setStartHour] = useState("");

  const [firstPopup, toggleFirstPopup] = useState(false)
  const [secondPopup, toggleSecondPopup] = useState(false)
  const [thirdPopup, toggleThirdPopup] = useState(false)


  const { attributes } = useTypedSelector(state => state.powerMeterGPRSMeter.GPRSResponseInitialValues)



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activeEnergy: attributes.activeEnergy,
      closeDay: attributes.closeDay,
      closeHour: attributes.closeHour,
      instantPower: attributes.instantPower,
      maxPower: attributes.maxPower,
      networkSettings: attributes.networkSettings,
      pagingDelay: attributes.pagingDelay,
      reactiveEnergy: attributes.reactiveEnergy,
      reserveT1: attributes.reserveT1,
      reserveT2: attributes.reserveT2,
      reserveT3: attributes.reserveT3,
      reserveT4: attributes.reserveT4,
      status: attributes.status,
      t1: attributes.t1,
      t2: attributes.t2,
      t3: attributes.t3,
      t4: attributes.t4,
      tariffScheduleDate: attributes.tariffScheduleDate,
      totalEnergy: attributes.totalEnergy,
      transitionDelay: attributes.transitionDelay,
    },
    validationSchema: yup.object({

    }),
    onSubmit: async (values: any) => {

    },
  });


  return <div className="">
    <div className="bluetooth-connection-counterparty__header d-flex align-items-end">
      <Form.Group className="concentrator-character__form-item ">
        <Form.Label>Сетевой адрес</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="personalAccountNumber"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.personalAccountNumber}
        // isInvalid={
        //     !!formik.errors.personalAccountNumber &&
        //     !!formik.touched.personalAccountNumber
        // }
        />
        {/* {formik.touched.personalAccountNumber &&
                    formik.errors.personalAccountNumber && (
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.personalAccountNumber}
                        </Form.Control.Feedback>
                    )} */}
      </Form.Group>
      <div className="mr12px"></div>
      <Form.Group className="concentrator-character__form-item">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          name="lastname"
        //   onChange={formik.handleChange}
        //   onBlur={formik.handleBlur}
        //   value={formik.values.lastname}
        //   isInvalid={!!formik.errors.lastname && !!formik.touched.lastname}
        />
        {/* {formik.touched.lastname && formik.errors.lastname && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastname}
              </Form.Control.Feedback>
            )} */}
      </Form.Group>
    </div>
    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Режимы индикации
      </h4>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Длительность показа в основном режиме (сек)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={60}
            placeholder=""
            name="pagingDelay"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.pagingDelay}
            isInvalid={!!formik.errors.pagingDelay && !!formik.touched.pagingDelay}
          />
          {formik.touched.pagingDelay && formik.errors.pagingDelay && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.pagingDelay}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="mr12px"></div>

        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Время возврата основного режима из расширенного (сек)</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={60}
            placeholder=""
            name="transitionDelay"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.transitionDelay}
            isInvalid={!!formik.errors.transitionDelay && !!formik.touched.transitionDelay}
          />
          {formik.touched.transitionDelay && formik.errors.transitionDelay && (
            <Form.Control.Feedback type="invalid">
              {formik.errors.transitionDelay}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </div>

      {/* <div className="gprs2-info__titles">
        <div className="d-flex align-items-center">
          <div className="gprs2-info__title1">
            Title
          </div>
          <div className="mr8px"></div>
          <div className="gprs2-info__title2">
            Title
          </div>
        </div>
        <div className="mb8px"></div>
        <div className="d-flex align-items-center">
          <div className="gprs2-info__title1">
            Title
          </div>
          <div className="mr8px"></div>
          <div className="gprs2-info__title3">
            Title
          </div>
        </div>
      </div> */}

      <div className="mb20px"></div>

      <div className="link link--active" onClick={() => toggleFirstPopup(true)}>
        Настроить
      </div>
    </div>
    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Тарифное расписание
      </h4>
      <div className="mb20px"></div>

      <div className="d-flex">
        <Form.Group className="concentrator-character__form-item">
          <Form.Label style={{ display: "block" }}>Число, день</Form.Label>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <KeyboardDatePicker
              style={{ width: "100%", }}
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
        </Form.Group>
        <div className="mr12px"></div>
        <Form.Group className="concentrator-character__form-item">
          <Form.Label>Время час</Form.Label>
          <input
            name="zeroTime"
            style={{ width: "100%", height: "40px", border: "1px solid #D7E2F2" }}
            onChange={(e) => setStartHour(e.target.value)}
            type="time"
            value={startHour}
          />
        </Form.Group>

      </div>
    </div>
    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Конфигурация часовых срезов
      </h4>
      <div className="mb20px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.activeEnergy}
          name="creditResidue"
          type="checkbox"
          label="Активная энергия"
          onChange={(e) => { }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.reactiveEnergy}
          name="creditResidue"
          type="checkbox"
          label="Реактивная энергия"
          onChange={(e) => { }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.totalEnergy}
          name="creditResidue"
          type="checkbox"
          label="Суммарная энергия"
          onChange={(e) => {
          }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.instantPower}
          name="creditResidue"
          type="checkbox"
          label="Мгновенная мощность"
          onChange={(e) => {
          }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.maxPower}
          name="creditResidue"
          type="checkbox"
          label="Максимальная мощность"
          onChange={(e) => {
          }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.networkSettings}
          name="creditResidue"
          type="checkbox"
          label="Параметры сети"
          onChange={(e) => {
          }}
        />
      </Form.Group>
      <div className="mb12px"></div>
      <Form.Group>
        <Form.Check
          checked={formik.values.status}
          name="creditResidue"
          type="checkbox"
          label="Статус"
          onChange={(e) => {
          }}
        />
      </Form.Group>
    </div>
    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Верхний предел мощности
      </h4>
      <div className="mb20px"></div>
      <div className="link link--active" onClick={() => toggleThirdPopup(true)}>
        Настроить
      </div>
    </div>

    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Коэффициент трансформатора
      </h4>
      <div className="mb20px"></div>

      <div className="d-flex">
        <CustomRadio
          title="100 А"
          value="asc"
          selectedRadioValue={"asc"}
          onClick={(target) => {
          }}
        />

        <div className="mr20px">

        </div>

        <CustomRadio
          title="5 А"
          value="asc"
          selectedRadioValue={"asc"}
          onClick={(target) => {
          }}
        />
      </div>

      <div className="mb20px"></div>

      <span className="gprs2-info__subtitle">
        Коэффициент:
      </span>
      <span className="gprs2-info__subtitle">
        1
      </span>


    </div>

    <div className="bluetooth-connection-counterparty__border">
      <h4 className="bluetooth-connection-counterparty__subtitle">
        Параметры GPRS
      </h4>
      <div className="mb20px"></div>
      <div className="link link--active" onClick={() => toggleSecondPopup(true)}>
        Настроить
      </div>

      <div className="mb20px"></div>
      <div className="mb20px"></div>
    </div>
    <div className="gprs2-info__footer">
      <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
    </div>

    <Modal
      show={firstPopup}
      onHide={() => {
        toggleFirstPopup(false)
      }}
      dialogClassName="display-modes-popup__container"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <CustomizeDisplayModesPopup toggleFirstPopup={toggleFirstPopup} />
    </Modal>

    <Modal
      show={secondPopup}
      onHide={() => {
        toggleSecondPopup(false)
      }}
      dialogClassName="delete-concentrator-popup"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <GPSParamsPopup />
    </Modal>

    <Modal
      show={thirdPopup}
      onHide={() => {
        toggleThirdPopup(false)
      }}
      dialogClassName="power-popup__container"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <PowerPopup toggleThirdPopup={toggleThirdPopup} />
    </Modal>
  </div>
}