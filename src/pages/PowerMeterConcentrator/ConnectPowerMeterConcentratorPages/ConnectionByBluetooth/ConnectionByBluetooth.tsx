import React, { FC, useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import * as queryString from "querystring";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";

import { Counterparty } from "../../commonComponents/bluetooth/Counterparty";
import { Description } from "../../commonComponents/bluetooth/Description";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
import { useHistory } from "react-router-dom";
import { regex } from "../../../../utils/regex/regex";

//redux
import { ConnectPowerMeterBluetoothType } from "../../../../ts/types/powerMeterBluetooth.types";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import {
  connectConcentratorBluetooth,
  connectBluetoothPersonalAccountSearch,
  saveBluetoothConcentratorGroupControlThunk,
} from "../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.thunk";
import {
  resetBluetoothConnectionState,
  setBluetoothConnectionInitialValues,
} from "../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.slice";
import { Taksonomy } from "../../commonComponents/bluetooth/Taksonomy";
import { changedToSend } from "../../../../utils/groupControl/groupControl";
import { useSnackbar } from "notistack";

export const ConnectionByBluetooth: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const orgData = useTypedSelector((state) => state.powerMeterBluetootConcentrator.tansonomyTree);
  const { meterId }: any = queryString.parse(history.location.search.substring(1));
  const [tabValue, setTabValue] = useState<string>("description");
  const [treeState, setTreeState] = useState<any>([]);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(orgData)));
  }, [orgData]);

  const [organisationNameValidation, setOrgValid] = useState(yup.string().required("Обязательное поле"));
  const [positionValidation, setPosValid] = useState(yup.string().required("Обязательное поле"));
  const { personalAccountInitialValues, bluetoothConnectionInitialValues, currentBluetoothMeterId } = useTypedSelector(
    (state) => state.powerMeterBluetootConcentrator
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      serialNumber: bluetoothConnectionInitialValues.serialNumber,
      manufacturer: bluetoothConnectionInitialValues.manufacturer,
      setUpOrganization: bluetoothConnectionInitialValues.setUpOrganization,
      type: bluetoothConnectionInitialValues.type,
      personalAccountNumber: personalAccountInitialValues.personalAccountNumber,
      roleName: personalAccountInitialValues.roleName,
      firstname: personalAccountInitialValues.firstname,
      lastname: personalAccountInitialValues.lastname,
      fathersname: personalAccountInitialValues.fathersname,
      organizationName: personalAccountInitialValues.organizationName,
      phoneNumber: personalAccountInitialValues.phoneNumber,
      email: personalAccountInitialValues.email,
      position: personalAccountInitialValues.position,
      city: personalAccountInitialValues.city,
      district: personalAccountInitialValues.district,
      street: personalAccountInitialValues.street,
      house: personalAccountInitialValues.house,
      flat: personalAccountInitialValues.flat,
    },
    validationSchema: yup.object({
      serialNumber: yup.string().required("Обязательное поле"),
      type: yup.string().required("Обязательное поле"),
      personalAccountNumber: yup.string().required("Обязательное поле"),
      roleName: yup.string().required("Обязательное поле полеName"),
      firstname: yup.string().required("Обязательное поле"),
      lastname: yup.string().required("Обязательное поле"),
      fathersname: yup.string().required("Обязательное поле"),
      organizationName: organisationNameValidation,
      phoneNumber: yup.string().matches(regex.phoneMask, "Не валидный формат телефона").required("Обязательное поле"),
      email: yup.string().matches(regex.email, "Не валидный email ").required("Обязательное поле"),
      position: positionValidation,
      city: yup.string().required("Обязательное поле"),
      district: yup.string().required("Обязательное поле"),
      street: yup.string().required("Обязательное поле"),
      house: yup.string().required("Обязательное поле"),
      flat: yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values: ConnectPowerMeterBluetoothType) => {
      await dispatch(connectConcentratorBluetooth(values));
    },
  });

  useEffect(() => {
    if (formik.values.roleName === "ROLE_LEGAL") {
      setOrgValid(yup.string().required("Обязательное поле"));
      setPosValid(yup.string().required("Обязательное поле"));
    } else {
      //@ts-ignore
      setOrgValid(yup.string().notRequired());
      //@ts-ignore
      setPosValid(yup.string().notRequired());
    }
  }, [formik.values.roleName]);

  useEffect(() => {
    dispatch(resetBluetoothConnectionState());
  }, []);

  const connectBluetoothPersonalAccountSearchCallback = () => {
    dispatch(connectBluetoothPersonalAccountSearch(formik.values.personalAccountNumber));
  };

  useEffect(() => {
    currentBluetoothMeterId && history.push({ search: `?meterId=${currentBluetoothMeterId}` });
  }, [currentBluetoothMeterId]);

  const setBluetoothConnectionInitialValuesCallback = () => {
    dispatch(
      setBluetoothConnectionInitialValues({
        serialNumber: formik.values.serialNumber,
        type: formik.values.type,
        meterId: "",
        manufacturer: formik.values.setUpOrganization,
        setUpOrganization: formik.values.setUpOrganization,
      })
    );
  };

  const submitTaksonomy = (e: any) => {
    e.preventDefault();
    dispatch(saveBluetoothConcentratorGroupControlThunk(changedToSend(treeState)));
  };

  return (
    <Form
      onSubmit={tabValue !== "taxonomy" ? formik.handleSubmit : submitTaksonomy}
      className="connection-by-bluetooth"
    >
      <div className="connection-by-bluetooth__tab tabs-type1">
        <h1 className="connection-by-bluetooth__title">Новый прибор учета</h1>
        <CTabs activeTab={tabValue as string}>
          <CNav className="connection-by-bluetooth__header" variant="tabs">
            <CNavItem>
              <CNavLink data-tab="description" onClick={() => setTabValue("description")}>
                Описание
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="counterparty" onClick={() => setTabValue("counterparty")}>
                Контрагент
              </CNavLink>
            </CNavItem>
            <CNavItem onClick={() => !meterId && enqueueSnackbar("Необходимо добавить ПУ", { variant: "error" })}>
              <CNavLink disabled={meterId ? false : true} data-tab="taxonomy" onClick={() => setTabValue("taxonomy")}>
                Таксономия
              </CNavLink>
            </CNavItem>
          </CNav>

          <div className="connection-by-bluetooth__wrap">
            <CTabContent>
              <CTabPane data-tab="description">
                <Description formik={formik} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="counterparty">
                <Counterparty
                  connectBluetoothPersonalAccountSearchCallback={connectBluetoothPersonalAccountSearchCallback}
                  setBluetoothConnectionInitialValuesCallback={setBluetoothConnectionInitialValuesCallback}
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
      </div>


      

      <div className="connection-by-bluetooth__btns d-flex">
        <MainButton title="Сохранить" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="Отменить"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => {
            history.push(
              "/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-bluetooth&bluetoothPage=1"
            );
          }}
        />
      </div>
    </Form>
  );
};
