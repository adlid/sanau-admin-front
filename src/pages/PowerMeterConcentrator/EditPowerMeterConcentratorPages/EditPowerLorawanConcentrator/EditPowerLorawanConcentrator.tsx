import * as yup from "yup";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as queryString from "querystring";
import { useHistory } from "react-router-dom";
import React, { FC, useState, useEffect } from "react";
import { regex } from "../../../../utils/regex/regex";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { CTabs, CTabContent, CNav, CNavItem, CNavLink, CTabPane } from "@coreui/react";
// hooks
import { useAppDispatch, useTypedSelector } from "../../../../utils/hooks/reduxHooks";
// components
import { Taksonomy } from "./commonComponents/Taksonomy";
import { Description } from "./commonComponents/Description";
import { Counterparty } from "./commonComponents/Counterparty";
import { MainButton } from "../../../../components/uiKit/Buttons/MainButton";

//redux
import { WaterCounterpartyValuesType, WaterDescriptionValuesType } from "../../../../ts/types/lorawanUdpDevice.types";
import {
  saveEditedPowerConcentratorDescriptionThunk,
  saveEditedPowerConcentratorCounterpartyThunk,
  savePowerConcentratorGroupControlThunk,
  powerConcentratorPersonalAccountSearchThunk,
  getDescriptionPowerConcentratorDevEUIThunk,
  getMeterInfoByDevEUIThunk,
} from "../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { resetEditConcentratorState } from "../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { changedToSend } from "../../../../utils/groupControl/groupControl";
import { updateMeterNameThunk } from "../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.thunk";

export const EditPowerLorawanConcentrator: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { meterId, meterName, personalAccountNumber }: any = queryString.parse(history.location.search.substring(1));

  const { personalAccountInitialValues, devEUI, loraMeterInfo } = useTypedSelector(
    (state) => state.powerMeterLorawanUdpConcentrator
  );
  const orgData = useTypedSelector((state) => state.powerMeterLorawanUdpConcentrator.tansonomyTree);

  const [tabValue, setTabValue] = useState<string>("description");
  const [treeState, setTreeState] = useState<any>([]);

  useEffect(() => {
    setTreeState(JSON.parse(JSON.stringify(orgData)));
  }, [orgData]);

  // CHANGE DESCRIPTION AND COUNTERPARTY
  const [checkTime, setCheckTime] = useState<MaterialUiPickersDate | null>(null);
  const [checkTimeErr, setCheckTimeErr] = useState<boolean>(false);

  const [organisationNameValidation, setOrgValid] = useState(yup.string().required("???????????????????????? ????????"));
  const [positionValidation, setPosValid] = useState(yup.string().required("???????????????????????? ????????"));

  const descFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      devEUI: loraMeterInfo.devEUI,
      serial: loraMeterInfo.serial,
      type: loraMeterInfo.type,
      manufacturer: loraMeterInfo.manufacturer,
      setUpOrganization: loraMeterInfo.setUpOrganization,
      filterMeterName: "",
    },
    validationSchema: yup.object({
      devEUI: yup.string().required("???????????????????????? ????????"),
      serial: yup.string().required("???????????????????????? ????????"),
      type: yup.string().required("???????????????????????? ????????"),
      manufacturer: yup.string().required("???????????????????????? ????????"),
      setUpOrganization: yup.string().required("???????????????????????? ????????"),
    }),
    onSubmit: async (values: any) => {
      const body1 = {
        id: meterId ?? "",
        type: 'network',
        meterName: values.filterMeterName
      }
      await dispatch(updateMeterNameThunk(body1))
      if (checkTime !== null) {
        await dispatch(saveEditedPowerConcentratorDescriptionThunk({ checkTime, ...values }));
      } else setCheckTimeErr(true);
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
      flat: personalAccountInitialValues.flat
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
    onSubmit: async (values: WaterCounterpartyValuesType) => {
      const { organizationName, position, ...rest } = values;
      await dispatch(
        saveEditedPowerConcentratorCounterpartyThunk(
          values.roleName === "ROLE_LEGAL" ? { meterId, ...values } : { meterId, ...rest }
        )
      );
    },
  });

  const powerConcentratorPersonalAccountSearchCallback = () => {
    dispatch(powerConcentratorPersonalAccountSearchThunk(formik.values.personalAccountNumber));
  };

  const submitTaksonomy = (e: any) => {
    e.preventDefault();
    dispatch(savePowerConcentratorGroupControlThunk(changedToSend(treeState)));
  };

  useEffect(() => {
    personalAccountNumber && powerConcentratorPersonalAccountSearchCallback();
  }, [personalAccountNumber]);

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
    dispatch(getDescriptionPowerConcentratorDevEUIThunk(meterId));
  }, [meterId]);

  useEffect(() => {
    if (devEUI) {
      dispatch(getMeterInfoByDevEUIThunk(devEUI));
    }
  }, [devEUI]);

  useEffect(() => {
    if (loraMeterInfo.checkTime) {
      setCheckTime(loraMeterInfo.checkTime);
    }
  }, [loraMeterInfo]);

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
      className="edit-water-concentrator"
    >
      <div className="edit-water-concentrator__tab tabs-type1">
        <h1 className="edit-water-concentrator__title">?????????????????????????? {meterName}</h1>

        <CTabs activeTab={tabValue as string}>
          <CNav className="edit-water-concentrator__header" variant="tabs">
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

          <div className="edit-water-concentrator__wrap">
            <CTabContent>
              <CTabPane data-tab="description">
                <Description formik={descFormik} checkTime={checkTime} setCheckTime={setCheckTime} />
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane data-tab="counterparty">
                <Counterparty
                  powerConcentratorPersonalAccountSearchCallback={powerConcentratorPersonalAccountSearchCallback}
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

      <div className="edit-water-concentrator__btns d-flex">
        <MainButton title="??????????????????" style={{ width: 139, height: 40, fontSize: 14 }} />
        <div className="mr16px"></div>
        <MainButton
          title="????????????????"
          isSecondary
          style={{ width: 90, height: 40, fontSize: 14 }}
          onClick={() =>
            history.push("/admin/concentrators/power-meter/concentrator-info?tabValue=info-by-lorawan-udp")
          }
        />
      </div>
    </Form>
  );
};
