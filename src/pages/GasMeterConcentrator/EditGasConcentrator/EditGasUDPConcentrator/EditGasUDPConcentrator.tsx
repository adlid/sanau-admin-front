import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import { regex } from "../../../../utils/regex/regex";
import React, { FC, useState, useEffect } from "react";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";

// components
import { Taksonomy } from "./commonComponents/Taksonomy";
import { Description } from "./commonComponents/Description";
import { Counterparty } from "./commonComponents/Counterparty";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";

// redux
import {
  saveEditedGasConcentratorDescriptionThunk,
  saveEditedGasConcentratorCounterpartyThunk,
  saveGasConcentratorGroupControlThunk,
  gasConcentratorPersonalAccountSearchThunk,
  getDescriptionGasConcentratorBarcodeThunk,
} from "../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.thunk";
import { resetEditConcentratorState } from "../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";

import { changedToSend } from "../../../../utils/groupControl/groupControl";

export const EditGasUDPConcentrator: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [tabValue, setTabValue] = useState<string>("description");
  const { meterId, meterName, personalAccountNumber }: any = queryString.parse(history.location.search.substring(1));

  // CHANGE TAKSONOMY
  const [treeState, setTreeState] = useState<any>([]);
  const orgData = useTypedSelector((state) => state.gasMeterUdpDeviceConcentrator.tansonomyTree);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(orgData)));
  }, [orgData]);

  // CHANGE DESCRIPTION AND COUNTERPARTY
  const [checkTime, setCheckTime] = useState<MaterialUiPickersDate | null>(null);

  const [organisationNameValidation, setOrgValid] = useState(yup.string().required("???????????????????????? ????????"));
  const [positionValidation, setPosValid] = useState(yup.string().required("???????????????????????? ????????"));
  const { personalAccountInitialValues, barcode } = useTypedSelector((state) => state.gasMeterUdpDeviceConcentrator);

  const descFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      meterName: "",
      barcode: barcode,
      setUpDate: "",
      manufacturer: "",
      verificationDate: "",
      verificationTime: "",
      dateReleased: "",
      setUpOrganization: "",
    },
    validationSchema: yup.object({
      meterName: yup.string().required("???????????????????????? ????????"),
      barcode: yup.string().required("???????????????????????? ????????"),
      manufacturer: yup.string().required("???????????????????????? ????????"),
      setUpOrganization: yup.string().required("???????????????????????? ????????"),
    }),
    onSubmit: async (values: any) => {
      await dispatch(saveEditedGasConcentratorDescriptionThunk({ verificationDate: checkTime, ...values }));
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personalAccountNumber: personalAccountInitialValues.personalAccountNumber || personalAccountNumber,
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
      personalAccountNumber: yup.string().required("???????????????????????? ????????"),
      roleName: yup.string().required("???????????????????????? ???????? ????????"),
      firstname: yup.string().required("???????????????????????? ????????"),
      lastname: yup.string().required("???????????????????????? ????????"),
      fathersname: yup.string().required("???????????????????????? ????????"),
      organizationName: organisationNameValidation,
      phoneNumber: yup.string().matches(regex.phoneMask, "???? ???????????????? ???????????? ????????????????").required("???????????????????????? ????????"),
      email: yup.string().matches(regex.email, "???? ???????????????? email ").required("???????????????????????? ????????"),
      position: positionValidation,
      city: yup.string().required("???????????????????????? ????????"),
      district: yup.string().required("???????????????????????? ????????"),
      street: yup.string().required("???????????????????????? ????????"),
      house: yup.string().required("???????????????????????? ????????"),
      flat: yup.string().required("???????????????????????? ????????"),
    }),
    onSubmit: async (values: any) => {
      const { organizationName, position, ...rest } = values;
      await dispatch(
        saveEditedGasConcentratorCounterpartyThunk(
          values.roleName === "ROLE_LEGAL"
            ? { barcode, personalAccountNumber: values.personalAccountNumber, userInfo: { ...values } }
            : { barcode, personalAccountNumber: values.personalAccountNumber, userInfo: { ...rest } }
        )
      );
    },
  });

  const submitTaksonomy = (e: any) => {
    e.preventDefault();
    dispatch(saveGasConcentratorGroupControlThunk(changedToSend(treeState)));
  };

  const waterConcentratorPersonalAccountSearchCallback = () => {
    dispatch(gasConcentratorPersonalAccountSearchThunk(formik.values.personalAccountNumber));
  };

  useEffect(() => {
    if (formik.values.roleName === "ROLE_LEGAL") {
      setOrgValid(yup.string().required("???????????????????????? ????????"));
      setPosValid(yup.string().required("???????????????????????? ????????"));
    } else {
      //@ts-ignore
      setOrgValid(yup.string().notRequired());
      //@ts-ignore
      setPosValid(yup.string().notRequired());
    }
  }, [formik.values.roleName]);

  useEffect(() => {
    dispatch(getDescriptionGasConcentratorBarcodeThunk(meterId));
  }, [meterId]);

  useEffect(() => {
    personalAccountNumber && waterConcentratorPersonalAccountSearchCallback();
  }, [personalAccountNumber]);

  useEffect(() => {
    return () => {
      dispatch(resetEditConcentratorState());
    };
  }, []);

  return (
    <Form
      onSubmit={
        tabValue === "description"
          ? descFormik.handleSubmit
          : tabValue === "counterparty"
          ? formik.handleSubmit
          : submitTaksonomy
      }
      className="edit-gas-udp-concentrator"
    >
      <div className="edit-gas-udp-concentrator__tab tabs-type1">
        <h1 className="edit-gas-udp-concentrator__title">?????????????????????????? {meterName || barcode}</h1>

        <CTabs activeTab={tabValue as string}>
          <CNav className="edit-gas-udp-concentrator__header" variant="tabs">
            <CNavItem>
              <CNavLink data-tab="description" onClick={() => setTabValue("description")}>
                ????????????????
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="counterparty" onClick={() => setTabValue("counterparty")}>
                ????????????????????
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink data-tab="taxonomy" onClick={() => setTabValue("taxonomy")}>
                ????????????????????
              </CNavLink>
            </CNavItem>
          </CNav>

          <div className="edit-gas-udp-concentrator__wrap">
            <CTabContent>
              <CTabPane data-tab="description">
                <Description formik={descFormik} checkTime={checkTime} setCheckTime={setCheckTime} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="counterparty">
                <Counterparty
                  waterConcentratorPersonalAccountSearchCallback={waterConcentratorPersonalAccountSearchCallback}
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

      <div className="edit-gas-udp-concentrator__btns d-flex">
        <MainButton title="??????????????????" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="????????????????"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() => history.push("/admin/concentrators/gas-meter/concentrator-info?tabValue=by-udp")}
        />
      </div>
    </Form>
  );
};
