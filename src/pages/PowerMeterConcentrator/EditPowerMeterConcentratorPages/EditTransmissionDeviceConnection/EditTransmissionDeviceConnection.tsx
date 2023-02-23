import { FC, useState, useEffect } from "react";
import {
  CTabs,
  CTabContent,
  CNav,
  CNavItem,
  CNavLink,
  CTabPane,
} from "@coreui/react";

import { Form } from "react-bootstrap";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton/";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

//form
import { regex } from "../../../../utils/regex/regex";
import { useFormik } from "formik";
import * as yup from "yup";

// components
import { ConcentratorSchedule } from "../../commonComponents/concentrator/ConcentratorSchedule";
import { ConcentratorCharacter } from "../../commonComponents/concentrator/ConcentratorCharacter/";
import { ConcentratorInterface } from "../../commonComponents/concentrator/ConcentratorInterface/";

//redux
import {
  useTypedSelector,
  useAppDispatch,
} from "../../../../utils/hooks/reduxHooks";
import { editToConcentrator } from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

export const EditTransmissionDeviceConnection: FC = () => {
 
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();


  const { selectedConcentrator, schedule } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const [radioValue, toggleRadioValue] = useState("GPRS");
  const [submitForm, setSubmitForm] = useState<() => any>();

  const { isFetchingConcentratorEdit } = useTypedSelector(
    (state) => state.powerMeterTransmissionDeviceConcentrator
  );

  const bindFormSubmit = (action: () => Promise<any>) => {
    if (!submitForm) {
      setSubmitForm(() => () => action());
    }
  };

  const clickSubmitForm = () => {
    if (submitForm) {
      submitForm();
    }
  };

  const initialValues = {
    deviceId:
      selectedConcentrator !== null
        ? selectedConcentrator.deviceId.toString()
        : "",
    name: (selectedConcentrator !== null && selectedConcentrator.name) ? selectedConcentrator.name : "",
    city: (selectedConcentrator !== null && selectedConcentrator.city) ? selectedConcentrator.city : "",
    region: (selectedConcentrator !== null && selectedConcentrator.region) ? selectedConcentrator.region : "",
    address: (selectedConcentrator !== null && selectedConcentrator.address) ? selectedConcentrator.address : "",
    apnName: (selectedConcentrator !== null && selectedConcentrator.apnName) ? selectedConcentrator.apnName : "",
    apnUsername:
      (selectedConcentrator !== null && selectedConcentrator.apnUsername) ? selectedConcentrator.apnUsername : "",
    apnPassword:
      (selectedConcentrator !== null && selectedConcentrator.apnPassword) ? selectedConcentrator.apnPassword : "",
    domainIp:
      (selectedConcentrator !== null && selectedConcentrator.domainIp) ? selectedConcentrator.domainIp : "",
    domainPort:
      (selectedConcentrator !== null && selectedConcentrator.domainPort)
        ? selectedConcentrator.domainPort.toString()
        : "",
    ethernetIp:
      (selectedConcentrator !== null && selectedConcentrator.ethernetIp) ? selectedConcentrator.ethernetIp : "",
    ethernetMask:
      (selectedConcentrator !== null && selectedConcentrator.ethernetMask) ? selectedConcentrator.ethernetMask : "",
    ethernetGateway:
      (selectedConcentrator !== null && selectedConcentrator.ethernetGateway) ? selectedConcentrator.ethernetGateway : "",
    mode: radioValue,
  };

  const validationSchema = yup.object({
    name: yup.string().required("Обязательное поле"),
    city: yup.string().required("Обязательное поле"),
    region: yup.string().required("Обязательное поле"),
    address: yup.string().required("Обязательное поле"),
    apnName: yup
      .string()
      .required("Обязательное поле")
      .max(20, "Не более 20 символов"),
    apnUsername: yup.string().max(20, "Не более 20 символов"),
    apnPassword: yup.string().max(20, "Не более 20 символов"),
    domainIp: yup
      .string()
      .required("Обязательное поле")
      .matches(regex.ip, "Не валидный формат")
      .max(15, "Не более 15 символов"),
    domainPort: yup
      .string()
      .required("Обязательное поле")
      .max(5, "Не более 5 символов"),
    ethernetIp:
      radioValue === "GPRS"
        ? yup.string()
        : yup
          .string()
          .required("Обязательное поле")
          .matches(regex.ip, "Не валидный формат"),
    ethernetMask:
      radioValue === "GPRS"
        ? yup.string()
        : yup
          .string()
          .required("Обязательное поле")
          .matches(regex.ip, "Не валидный формат"),
    ethernetGateway:
      radioValue === "GPRS"
        ? yup.string()
        : yup
          .string()
          .required("Обязательное поле")
          .matches(regex.ip, "Не валидный формат"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(
        editToConcentrator({
          ...values,
          ...schedule,
          id: selectedConcentrator !== null ? selectedConcentrator.id : "",
        })
      );
    },
  });

  useEffect(() => {
    bindFormSubmit(formik.submitForm);
  }, []);

  useEffect(() => {
    if(Object.keys(formik.errors).length > 0 ){
      enqueueSnackbar('Заполните все поля',{
        variant: "error"
      })
    }
  }, [formik.errors])


  useEffect(() => {
    if (selectedConcentrator !== null) {
      toggleRadioValue(selectedConcentrator.mode)
    }
  }, [selectedConcentrator]);


  return (
    <div className="concentrator-tab concentrator-tab--edit tabs-type1">
      <h2 className="concentrator-tab__title">
        Редактировать УСПД
      </h2>
      <CTabs activeTab="editInfo">
        <CNav variant="tabs">
          <CNavItem>
            <CNavLink data-tab="editInfo">Характеристики</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="editSchedule">
              Расписание автоматического опроса
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink data-tab="interface">Интерфейс подключения</CNavLink>
          </CNavItem>
        </CNav>

        <Form className="concentrator-tab__wrap">
          <CTabContent>
            <CTabPane data-tab="editInfo">
              <ConcentratorCharacter isDeviceIdDisabled={false} formik={formik} />
            </CTabPane>
          </CTabContent>
          <CTabContent>
            <CTabPane data-tab="editSchedule">
              <ConcentratorSchedule schedule={schedule} />
            </CTabPane>
          </CTabContent>
          <CTabContent>
            <CTabPane data-tab="interface">
              <ConcentratorInterface
                radioValue={radioValue}
                toggleRadioValue={toggleRadioValue}
                formik={formik}
              />
            </CTabPane>
          </CTabContent>
        </Form>
      </CTabs>

      <div className="concentrator-tab__footer d-flex">
        <MainButton
          title="Сохранить"
          style={{ width: 139, height: 40, fontSize: 14 }}
          onClick={() => {
              clickSubmitForm();
          }}
          fetching={isFetchingConcentratorEdit}
        />
        <div className="mr16px"></div>
        <MainButton
          isSecondary
          title="Отменить"
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push(
              "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-transmision-device"
            );
          }}
        />
      </div>
    </div>
  );
};
