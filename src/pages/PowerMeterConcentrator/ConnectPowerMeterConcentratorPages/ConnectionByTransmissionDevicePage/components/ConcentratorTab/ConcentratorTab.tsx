import { FC, useState, useEffect } from "react";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";

//forms
import { useFormik } from "formik";
import * as yup from "yup";
import { regex } from "../../../../../../utils/regex/regex";

//components
import { ConcentratorLists } from "../ConcentratorLists";
import { ConcentratorSchedule } from "../../../../commonComponents/concentrator/ConcentratorSchedule";
import { ConcentratorCharacter } from "../../../../commonComponents/concentrator/ConcentratorCharacter";
import { ConcentratorInterface } from "../../../../commonComponents/concentrator/ConcentratorInterface";
import { Form } from "react-bootstrap";

//redux ts
import { useTypedSelector, useAppDispatch } from "../../../../../../utils/hooks/reduxHooks";
import { Spinner } from "react-bootstrap";
import { addInfoToConcentrator } from "../../../../../../store/slicesAndThunks//powerConcentrator/transmissionDevice/transmissionDevice.thunk";
import { IAddInfoToConcentrator } from "../../../../../../ts/interfaces/powerMeterConcentrator";

type PropsType = {
  bindFormSubmit: (action: () => Promise<any>) => void;
};

export const ConcentratorTab: FC<PropsType> = ({ bindFormSubmit }) => {
  const dispatch = useAppDispatch();
  const [radioValue, toggleRadioValue] = useState("GPRS");

  const { concentratorIPandPort, allConcentratorMeters, schedule, isFetchingSelectedConcentratorMeters } =
    useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator);

  const validationSchema = yup.object({
    name: yup.string().required("Обязательное поле"),
    city: yup.string().required("Обязательное поле"),
    region: yup.string().required("Обязательное поле"),
    address: yup.string().required("Обязательное поле"),
    apnName: yup.string().required("Обязательное поле").max(20, "Не более 20 символов"),
    apnUsername: yup.string().max(20, "Не более 20 символов"),
    apnPassword: yup.string().max(20, "Не более 20 символов"),
    domainIp: yup
      .string()
      .required("Обязательное поле")
      .matches(regex.ip, "Не валидный формат")
      .max(15, "Не более 15 символов"),
    domainPort: yup.string().required("Обязательное поле").max(5, "Не более 5 символов"),
    ethernetIp:
      radioValue === "GPRS"
        ? yup.string()
        : yup.string().required("Обязательное поле").matches(regex.ip, "Не валидный формат"),
    ethernetMask:
      radioValue === "GPRS"
        ? yup.string()
        : yup.string().required("Обязательное поле").matches(regex.ip, "Не валидный формат"),
    ethernetGateway:
      radioValue === "GPRS"
        ? yup.string()
        : yup.string().required("Обязательное поле").matches(regex.ip, "Не валидный формат"),
  });

  const initialValues = {
    deviceId: allConcentratorMeters !== null ? allConcentratorMeters.deviceId.toString() : "",
    name: "",
    city: "",
    region: "",
    address: "",
    apnName: allConcentratorMeters !== null ? allConcentratorMeters.concentratorApnSettings.apnName : "",
    apnUsername: allConcentratorMeters !== null ? allConcentratorMeters.concentratorApnSettings.apnUsername : "",
    apnPassword: allConcentratorMeters !== null ? allConcentratorMeters.concentratorApnSettings.apnPassword : "",
    domainIp: allConcentratorMeters !== null ? allConcentratorMeters.concentratorDomainIpPortSettings.domainIp : "",
    domainPort:
      allConcentratorMeters !== null
        ? allConcentratorMeters.concentratorDomainIpPortSettings.domainPort.toString()
        : "",
    ethernetIp: allConcentratorMeters !== null ? allConcentratorMeters.concentratorNetworkSettings.ethernetIp : "",
    ethernetMask: allConcentratorMeters !== null ? allConcentratorMeters.concentratorNetworkSettings.ethernetMask : "",
    ethernetGateway:
      allConcentratorMeters !== null ? allConcentratorMeters.concentratorNetworkSettings.ethernetGateway : "",
    mode: radioValue,
  };

  useEffect(() => {
    if (allConcentratorMeters !== null) {
      toggleRadioValue(allConcentratorMeters.concentratorNetworkSettings.mode);
    }
  }, [allConcentratorMeters]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      let addInfoToConcentratorBody: IAddInfoToConcentrator = {
        ...concentratorIPandPort,
        ...values,
        ...schedule,
      };
      await dispatch(addInfoToConcentrator(addInfoToConcentratorBody));
    },
  });

  useEffect(() => {
    bindFormSubmit(formik.submitForm);
  }, []);

  return (
    <div className="concentrator-tab tabs-type1">
      {isFetchingSelectedConcentratorMeters && (
        <div className="concentrator-tab__preloader">
          <Spinner animation="border" size="sm" />
        </div>
      )}

      {!isFetchingSelectedConcentratorMeters && (
        <CTabs activeTab="list">
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink data-tab="list">Приборы учета ({allConcentratorMeters?.numberOfMeters})</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="character">Характеристики</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="messages">Расписание автоматического опроса</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="interface">Интерфейс подключения</CNavLink>
            </CNavItem>
          </CNav>
          
          <Form className="concentrator-tab__wrap">
            <CTabContent>
              <CTabPane data-tab="list">
                <ConcentratorLists
                  allConcentratorMeters={allConcentratorMeters !== null ? allConcentratorMeters.meters : []}
                />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="character">
                <ConcentratorCharacter formik={formik} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="messages">
                <ConcentratorSchedule schedule={schedule} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="interface">
                <ConcentratorInterface formik={formik} radioValue={radioValue} toggleRadioValue={toggleRadioValue} />
              </CTabPane>
            </CTabContent>
          </Form>
        </CTabs>
      )}
    </div>
  );
};
