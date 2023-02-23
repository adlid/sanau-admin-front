import React, { FC, useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";

import { Counterparty } from "../../commonComponents/bluetooth/Counterparty/";
import { Description } from "../../commonComponents/bluetooth/Description";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";
import { useHistory } from "react-router-dom";
import { regex } from "../../../../utils/regex/regex";
import * as queryString from "querystring";

//redux
import { EditPowerMeterBluetoothType } from "../../../../ts/types/powerMeterBluetooth.types";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import {
  getBluetoothInfo,
  connectBluetoothPersonalAccountSearch,
  editConnectBluetooth,
  saveBluetoothConcentratorGroupControlThunk,
} from "../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.thunk";
import {
  resetBluetoothConnectionState,
  setBluetoothConnectionInitialValues,
} from "../../../../store/slicesAndThunks/powerConcentrator/bluetooth/bluetooth.slice";
import { Taksonomy } from "../../commonComponents/bluetooth/Taksonomy/Taksonomy";
import { changedToSend } from "../../../../utils/groupControl/groupControl";
import { updateMeterNameThunk } from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

export const EditBluetoothConcentrator: FC = () => {
  const dispatch = useAppDispatch();

  const orgData = useTypedSelector((state) => state.powerMeterBluetootConcentrator.tansonomyTree);
  const [tabValue, setTabValue] = useState<string>("description");
  const [treeState, setTreeState] = useState<any>([]);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(orgData)));
  }, [orgData]);

  const [organisationNameValidation, setOrgValid] = useState(yup.string().required("Обязательное поле"));
  const [positionValidation, setPosValid] = useState(yup.string().required("Обязательное поле"));
  const { personalAccountInitialValues, bluetoothConnectionInitialValues } = useTypedSelector(
    (state) => state.powerMeterBluetootConcentrator
  );

  const history = useHistory();
  const { serialNumber } = queryString.parse(history.location.search.substring(1));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      serialNumber: bluetoothConnectionInitialValues.serialNumber,
      setUpOrganization: bluetoothConnectionInitialValues.setUpOrganization,
      manufacturer: bluetoothConnectionInitialValues.manufacturer,
      meterId: bluetoothConnectionInitialValues.meterId,
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

      filterMeterName: ""
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
    onSubmit: async (values: any) => {
      const body1 = {
        id: bluetoothConnectionInitialValues.meterId ?? "",
        type: 'bluetooth',
        meterName: values.filterMeterName
      }
      await dispatch(updateMeterNameThunk(body1))
      dispatch(editConnectBluetooth(values));
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
    dispatch(getBluetoothInfo(serialNumber as string));
  }, []);

  const connectBluetoothPersonalAccountSearchCallback = () => {
    dispatch(connectBluetoothPersonalAccountSearch(formik.values.personalAccountNumber));
  };

  const setBluetoothConnectionInitialValuesCallback = () => {
    dispatch(
      setBluetoothConnectionInitialValues({
        serialNumber: formik.values.serialNumber,
        type: formik.values.type,
        meterId: formik.values.meterId,
        manufacturer: formik.values.manufacturer,
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
        <h1 className="connection-by-bluetooth__title">Редактировать</h1>

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
            <CNavItem>
              <CNavLink data-tab="taxonomy" onClick={() => setTabValue("taxonomy")}>
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
