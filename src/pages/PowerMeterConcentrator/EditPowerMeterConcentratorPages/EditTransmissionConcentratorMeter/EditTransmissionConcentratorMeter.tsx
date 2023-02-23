import React, { FC, useState, useEffect } from "react";

import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import moment from "moment";

//ts
import {
  editConcentratorMeter,
  saveUSPDConcentratorGroupControlThunk,
  updateMeterNameThunk,
} from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { setMeterSettingsInitialValues } from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice"
import { connectBluetoothPersonalAccountSearch } from "../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.thunk";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { IEditConcentrtorMeter } from "../../../../ts/interfaces/powerMeterConcentrator";

//components
import { TheNewConcentratorMeterForm } from "../../commonComponents/concentrator/TheNewConcentratorMeterForm";
import { Counterparty } from "../../ConnectPowerMeterConcentratorPages/ConnectionByBluetooth/components/Counterparty/";
import { icons } from "../../../../utils/icons/icons";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import { changedToSend } from "../../../../utils/groupControl/groupControl";
import { Taksonomy } from "./components/Taksonomy";

export const EditTransmissionConcentratorMeter: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [openFirstCalendar, setOpenFirstCalendar] = useState(false);
  const [startDate, setStartDate] = useState<MaterialUiPickersDate | null | string>(new Date());
  const [time, setTime] = useState("10:00");

  const { selectedMeterObj, meterSettings, meterSettingsInitialValues } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const { personalAccountInitialValues } = useTypedSelector((state) => state.powerMeterBluetootConcentrator);

  useEffect(() => {
    if (meterSettings !== null) {
      if (meterSettings.verificationDate.length > 0) {
        setStartDate(moment(meterSettings.verificationDate).toISOString());
      }
      if (meterSettings.verificationTime.length > 0) {
        setTime(meterSettings.verificationTime);
      }
    }
  }, [meterSettings]);

  const dateFormatter = (str: string) => {
    return str;
  };

  const connectBluetoothPersonalAccountSearchCallback = () => {


    const initialBody = {
      meterName: formik.values.meterName,
      setUpOrganization: formik.values.setUpOrganization,
      manufacturer: formik.values.manufacturer,
      meterGeneration: formik.values.meterGeneration,
      serial: formik.values.serial,
      box: formik.values.box,
      mod: formik.values.mod,
      pos: formik.values.pos,
      primaryLine: formik.values.primaryLine,
      firstLine: formik.values.firstLine,
      secondLine: formik.values.secondLine,
      thirdLine: formik.values.thirdLine,
      phase: formik.values.phase,
      type: formik.values.type,

      residue: formik.values.residue,
      creditResidue: formik.values.creditResidue,
      password: formik.values.password,
      head: formik.values.head,
      //state
      state: formik.values.state ? "Блокирован" : "Доступен",
      prevDayEnd: formik.values.prevDayEnd,
      saveMaxPower: formik.values.saveMaxPower,
      activeEnergy: formik.values.activeEnergy,
      reactiveEnergy: formik.values.reactiveEnergy,
      threePhaseVoltage: formik.values.threePhaseVoltage,
      threePhaseAmperage: formik.values.threePhaseAmperage,
      activePower: formik.values.activePower,
      eventLogs: formik.values.eventLogs,
      errorFlagPrevDay: formik.values.errorFlagPrevDay,
      relayState: formik.values.relayState,
      dailyFixingTime: formik.values.dailyFixingTime,
      monthlyFixingTime: formik.values.monthlyFixingTime,
      relayingStatus: formik.values.relayingStatus,
    }

    dispatch(setMeterSettingsInitialValues(initialBody))



    dispatch(connectBluetoothPersonalAccountSearch(formik.values.personalAccountNumber));
  };

  // const [organisationNameValidation, setOrgValid] = useState(
  //   yup.string().required("Обязательное поле")
  // );
  // const [positionValidation, setPosValid] = useState(
  //   yup.string().required("Обязательное поле")
  // );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...meterSettingsInitialValues,
      state: meterSettingsInitialValues.state === "Доступен" ? false : true,
      // meterName: meterSettingsInitialValues.meterName,
      // setUpOrganization: meterSettingsInitialValues.setUpOrganization,
      // manufacturer: meterSettingsInitialValues.manufacturer,
      // meterGeneration: meterSettingsInitialValues.meterGeneration,
      // serial: meterSettingsInitialValues.serial,
      // box: meterSettingsInitialValues.box,
      // mod: meterSettingsInitialValues.mod,
      // pos: meterSettingsInitialValues.pos,
      // primaryLine: meterSettingsInitialValues.primaryLine,
      // firstLine: meterSettingsInitialValues.firstLine,
      // secondLine: meterSettingsInitialValues.secondLine,
      // thirdLine: meterSettingsInitialValues.thirdLine,
      // phase: meterSettingsInitialValues.phase,
      // type: meterSettingsInitialValues.type,

      // residue: meterSettingsInitialValues.residue,
      // creditResidue: meterSettingsInitialValues.creditResidue,
      // password: meterSettingsInitialValues.password,
      // head: meterSettingsInitialValues.head,
      // //state
      // state: meterSettingsInitialValues.state,
      // prevDayEnd: meterSettingsInitialValues.prevDayEnd,
      // saveMaxPower: meterSettingsInitialValues.saveMaxPower,
      // activeEnergy: meterSettingsInitialValues.activeEnergy,
      // reactiveEnergy: meterSettingsInitialValues.reactiveEnergy,
      // threePhaseVoltage: meterSettingsInitialValues.threePhaseVoltage,
      // threePhaseAmperage: meterSettingsInitialValues.threePhaseAmperage,
      // activePower: meterSettingsInitialValues.activePower,
      // eventLogs: meterSettingsInitialValues.eventLogs,
      // errorFlagPrevDay: meterSettingsInitialValues.errorFlagPrevDay,
      // relayState: meterSettingsInitialValues.relayState,
      // dailyFixingTime: meterSettingsInitialValues.dailyFixingTime,
      // monthlyFixingTime: meterSettingsInitialValues.monthlyFixingTime,
      // relayingStatus: meterSettingsInitialValues.relayingStatus,

      //контрагент
      ...personalAccountInitialValues,
      // personalAccountNumber: personalAccountInitialValues.personalAccountNumber,
      // roleName: personalAccountInitialValues.roleName,
      // firstname: personalAccountInitialValues.firstname,
      // lastname: personalAccountInitialValues.lastname,
      // fathersname: personalAccountInitialValues.fathersname,
      // organizationName: personalAccountInitialValues.organizationName,
      // phoneNumber: personalAccountInitialValues.phoneNumber,
      // email: personalAccountInitialValues.email,
      // position: personalAccountInitialValues.position,
      // city: personalAccountInitialValues.city,
      // district: personalAccountInitialValues.district,
      // street: personalAccountInitialValues.street,
      // house: personalAccountInitialValues.house,
      // flat: personalAccountInitialValues.flat,
      filterMeterName: ""
    },
    onSubmit: async (values) => {
      let obj1 = {
        id: selectedMeterObj?.id ?? "",
        meterName: values.filterMeterName,
        type: "uspd"
      }
      await dispatch(updateMeterNameThunk(obj1))

      let obj: IEditConcentrtorMeter = {
        id: selectedMeterObj !== null ? selectedMeterObj.id : "",
        primaryLine: +values.primaryLine,
        firstLine: +values.firstLine,
        secondLine: +values.secondLine,
        thirdLine: +values.thirdLine,
        phase: values.phase,
        mod: +values.mod,
        pos: +values.pos,
        box: +values.box,
        verificationDate: startDate !== null ? moment(startDate).format("YYYY-MM-DD") : "",
        verificationTime: time !== null ? time : "",
        password: values.password,
        head: values.head,
        meterName: values.meterName,
        setUpOrganization: values.setUpOrganization,
        manufacturer: values.manufacturer,
        type: values.type,
        creditResidue: values.creditResidue,
        residue: values.residue,
        prevDayEnd: values.prevDayEnd,
        saveMaxPower: values.saveMaxPower,
        numberOfTariffs: 1,
        state: values.state ? "Блокирован" : "Доступен",
        serial: +values.serial,
        serialLength: values.serial.length,
        meterGeneration: values.meterGeneration,
        desc1: {
          instantPower: false,
          numberOfDaysWithoutEnergy: false,
          lastDayReactiveSum: false,
          lastDayActiveSum: false,
          suppressErrorLogging: false,
          lastMonthReactiveSum: false,
          lastMonthActiveSum: false,
        },
        desc3: {
          activeEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activeEnergy
              : false,
          reactiveEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.reactiveEnergy
              : false,
          eventLogs:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.eventLogs
              : false,
          threePhaseVoltage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseVoltage
              : false,
          threePhaseAmperage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseAmperage
              : false,
          activePower:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activePower
              : false,
          relayingStatus: values.relayingStatus,
          relayState:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.relayState
              : false,
        },
        desc4: {
          activeEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activeEnergy
              : false,
          reactiveEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.reactiveEnergy
              : false,
          eventLogs:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.eventLogs
              : false,
          threePhaseVoltage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseVoltage
              : false,
          threePhaseAmperage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseAmperage
              : false,
          activePower:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activePower
              : false,
          relayingStatus: values.relayingStatus,
          relayState:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.relayState
              : false,
        },
        desc5: {
          activeEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activeEnergy
              : false,
          reactiveEnergy:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.reactiveEnergy
              : false,
          eventLogs:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.eventLogs
              : false,
          threePhaseVoltage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseVoltage
              : false,
          threePhaseAmperage:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.threePhaseAmperage
              : false,
          activePower:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.activePower
              : false,
          relayingStatus: values.relayingStatus,
          relayState:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.relayState
              : false,
        },
        desc6: {
          errorFlagToday:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.errorFlagPrevDay
              : false,
          errorFlagPrevDay:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.errorFlagPrevDay
              : false,
          errorFlagPrevMonth:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.errorFlagPrevDay
              : false,
          dailyFixingTime:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.dailyFixingTime
              : false,
          monthlyFixingTime:
            formik.values.meterGeneration !== "ДАЛА СА4-Э720 TX PLC IP P (5-10 A); СА4-Э720 TX PLC IP P (5-7,5 A)"
              ? values.monthlyFixingTime
              : false,
        },
        userInfo: {
          personalAccountNumber: formik.values.personalAccountNumber,
          roleName: formik.values.roleName,
          firstname: formik.values.firstname,
          lastname: formik.values.lastname,
          fathersname: formik.values.fathersname,
          organizationName: formik.values.organizationName,
          phoneNumber: formik.values.phoneNumber,
          email: formik.values.email,
          position: formik.values.position,
          city: formik.values.city,
          district: formik.values.district,
          street: formik.values.street,
          house: formik.values.house,
          flat: formik.values.flat,
        },
      };

      await dispatch(editConcentratorMeter(obj));
    },
  });

  // useEffect(() => {
  //   if (formik.values.roleName === "ROLE_LEGAL") {
  //     setOrgValid(yup.string().required("Обязательное поле"));
  //     setPosValid(yup.string().required("Обязательное поле"));
  //   } else {
  //     //@ts-ignore
  //     setOrgValid(yup.string().notRequired());
  //     //@ts-ignore
  //     setPosValid(yup.string().notRequired());
  //   }
  // }, [formik.values.roleName]);

  // TAKSONOMY
  const orgData = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator.tansonomyTree);
  const [tabValue, setTabValue] = useState<string>("description");
  const [treeState, setTreeState] = useState<any>([]);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(orgData)));
  }, [orgData]);

  const submitTaksonomy = (e: any) => {
    e.preventDefault();
    dispatch(saveUSPDConcentratorGroupControlThunk(changedToSend(treeState)));
  };

  return (
    <Form
      onSubmit={tabValue !== "taxonomy" ? formik.handleSubmit : submitTaksonomy}
      className="connection-by-bluetooth"
    >
      <div className="connection-by-bluetooth__tab tabs-type1">
        <div className="d-flex justify-content-between connection-by-bluetooth__header">
          <h1 className="connection-by-bluetooth__title">Редактировать прибор учета</h1>
        </div>
        <CTabs activeTab={tabValue as string}>
          <CNav className="connection-by-bluetooth__header" variant="tabs">
            <CNavItem>
              <CNavLink data-tab="description" onClick={() => setTabValue("description")}>
                Описание
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="time" onClick={() => setTabValue("time")}>
                Поверка
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="counterparty" onClick={() => setTabValue("counterparty")}>
                Контрагент
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="taxonomy" onClick={() => setTabValue("taxonomy")}>
                Таксономия
              </CNavLink>
            </CNavItem>
          </CNav>

          <div className="connection-by-bluetooth__wrap">
            <CTabContent>
              <CTabPane data-tab="description">
                <TheNewConcentratorMeterForm formik={formik} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="time">
                <div className="d-flex" style={{ padding: "20px" }}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                    <KeyboardDatePicker
                      open={openFirstCalendar}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      placeholder="ДД/ММ/ГГГГ"
                      value={startDate}
                      rifmFormatter={dateFormatter}
                      onClick={() => setOpenFirstCalendar(true)}
                      onClose={() => setOpenFirstCalendar(false)}
                      onChange={(date: MaterialUiPickersDate, value) => {
                        setStartDate(date);
                      }}
                      KeyboardButtonProps={{ "aria-label": "change date" }}
                      keyboardIcon={<img className="calendar-icon" src={icons.calendarIcon} alt="iconCalendar" />}
                    />
                  </MuiPickersUtilsProvider>
                  <div className="mr16px"></div>
                  <div className="input-blocks__item input-blocks__time">
                    <input name="zeroTime" onChange={(e) => setTime(e.target.value)} type="time" value={time} />
                  </div>
                </div>
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="counterparty">
                <Counterparty
                  connectBluetoothPersonalAccountSearchCallback={connectBluetoothPersonalAccountSearchCallback}
                  setBluetoothConnectionInitialValuesCallback={() => { }}
                  formik={formik}
                />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="taxonomy">
                <Taksonomy state={treeState} setState={setTreeState} tabValue={tabValue} />
              </CTabPane>
            </CTabContent>
          </div>
        </CTabs>
        <div className="connection-by-bluetooth__header-btns d-flex ">
          <MainButton
            title="Отменить"
            isSecondary
            style={{ width: 90, height: 40, fontSize: 14 }}
            onClick={() => {
              history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device");
            }}
          />
          <div className="mr16px"></div>
          <MainButton
            fetching={formik.isSubmitting}
            title="Сохранить"
            style={{ width: 139, height: 40, fontSize: 14 }}
          />
        </div>
      </div>
    </Form>
  );
};
