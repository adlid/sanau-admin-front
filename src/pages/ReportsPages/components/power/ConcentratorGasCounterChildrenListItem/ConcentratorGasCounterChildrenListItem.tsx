import { Drawer } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo, Fragment, useEffect } from "react";
// icons
import { icons } from "../../../../../utils/icons/icons";
import { useAppDispatch, useTypedSelector } from "../../../../../utils/hooks/reduxHooks";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
} from "../../../../../store/slicesAndThunks/powerConcentrator/transmissionDevice/transmissionDevice.slice";
import { AccordionSidebar } from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByTransmissionDevice/components/ConcentratorDetailListAccordion/AccordionSidebar";
import { ReactComponent as Checked } from "../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../assets/imgs/notChecked.svg";
import { changeMeterType } from "../../../../../store/slicesAndThunks/reports/reports.slices";

type PropsType = {
  counterItem: any;
  index: number
};

export const ConcencatorGasCountersChildrenListItem: FC<PropsType> = memo((props) => {
  const { counterItem, index } = props;

  const dispatch = useAppDispatch();
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const { meterType } = useTypedSelector((state) => state.reports);

  const addMetersIdToArrCallBack = (item: any) => {
    if (item.unitedMeter && item.unitedMeter.gasJavaMeter && item.unitedMeter.gasJavaMeter.id) {
      return dispatch(addMetersIdToArr(item.unitedMeter.gasJavaMeter.id))
    }
    return dispatch(addMetersIdToArr(item.key))
  };

  const removeMetersIdFromArrCallBack = (item: any) => {
    if (item.unitedMeter && item.unitedMeter.gasJavaMeter && item.unitedMeter.gasJavaMeter.id) {
      return dispatch(removeMetersIdFromArr(item.unitedMeter.gasJavaMeter.id))
    }
    return dispatch(removeMetersIdFromArr(item.key))
  };

  const { selectedAllReport } = useTypedSelector((state) => state.reports)
  const { selectedMeters } = useTypedSelector((state) => state.powerMeterTransmissionDeviceConcentrator)

  return (
    <Fragment key={index}>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px", height: "100%" }}>
          <AccordionSidebar meter={counterItem} close={() => setSideBarOpen(false)} />
        </div>
      </Drawer>
      <div className="accordion-item">
        <Row className="accordion-item__header" style={{ maxWidth: "100%" }}>
          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column">
            <input
              type="checkbox"
              className="checkbox-table"
              checked={
                (counterItem.unitedMeter && counterItem.unitedMeter.gasJavaMeter && counterItem.unitedMeter.gasJavaMeter.id && selectedMeters.includes(counterItem.unitedMeter.gasJavaMeter.id))
                || selectedMeters.includes(counterItem.key)
                || selectedAllReport}
              onChange={(e) => {
                e.stopPropagation();
                if (e.target.checked) addMetersIdToArrCallBack(counterItem);
                else removeMetersIdFromArrCallBack(counterItem);
              }}
            />
            <span style={{ marginLeft: "20px" }}>{index}</span>
          </Col>

          <Col xl={3} lg={3} md={4} sm={4} className="table-group__column">
            {
              counterItem.title
            }
          </Col>

          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column" style={{ textAlign: 'center' }}>
            {counterItem.unitedMeter ? (counterItem.unitedMeter.gprsMeter && counterItem.unitedMeter.gprsMeter.userInfo && counterItem.unitedMeter.gprsMeter.userInfo.roleName)
              ? counterItem.unitedMeter.gprsMeter.userInfo.roleName === "ROLE_USER"
                ? "Физ. лицо"
                : "Юр. лицо"
              :
              (counterItem.unitedMeter.networkServerMeter && counterItem.unitedMeter.networkServerMeter.userInfo && counterItem.unitedMeter.networkServerMeter.userInfo.roleName)
                ? counterItem.unitedMeter.networkServerMeter.userInfo.roleName === "ROLE_USER"
                  ? "Физ. лицо"
                  : "Юр. лицо"
                :
                (counterItem.unitedMeter.bluetoothMeter && counterItem.unitedMeter.bluetoothMeter.userInfo && counterItem.unitedMeter.bluetoothMeter.userInfo.roleName)
                  ? counterItem.unitedMeter.bluetoothMeter.userInfo.roleName === "ROLE_USER"
                    ? "Физ. лицо"
                    : "Юр. лицо"
                  :
                  (counterItem.unitedMeter.gasJavaMeter && counterItem.unitedMeter.gasJavaMeter.userInfo && counterItem.unitedMeter.gasJavaMeter.userInfo.roleName)
                    ? counterItem.unitedMeter.gasJavaMeter.userInfo.roleName === "ROLE_USER"
                      ? "Физ. лицо"
                      : "Юр. лицо"
                    :
                    "-"
              :
              "-"
            }
          </Col>

          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column" style={{ textAlign: 'center' }}>
            {counterItem.unitedMeter ? (counterItem.unitedMeter.gprsMeter && counterItem.unitedMeter.gprsMeter.serial)
              ?
              counterItem.unitedMeter.gprsMeter.serial
              :
              (counterItem.unitedMeter.networkServerMeter && counterItem.unitedMeter.networkServerMeter.serial)
                ?
                counterItem.unitedMeter.networkServerMeter.serial
                :
                (counterItem.unitedMeter.bluetoothMeter && counterItem.unitedMeter.bluetoothMeter.serial)
                  ?
                  counterItem.unitedMeter.bluetoothMeter.serial
                  :
                  (counterItem.unitedMeter.gasJavaMeter && counterItem.unitedMeter.gasJavaMeter.serial)
                    ?
                    counterItem.unitedMeter.gasJavaMeter.serial
                    : '-'
              :
              '-'
            }
          </Col>

          <Col xl={2} lg={2} md={4} sm={4} className="table-group__column" style={{ textAlign: 'end' }}>
            {(counterItem.unitedMeter && counterItem.unitedMeter.active) ? <Checked /> : <NotChecked />}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
});
