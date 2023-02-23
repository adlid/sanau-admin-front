import moment from "moment";
import { Drawer } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo } from "react";
// icons
import { icons } from "../../../../../utils/icons/icons";
import { ReactComponent as Checked } from "../../../../../assets/imgs/checked.svg";
import { ReactComponent as NotChecked } from "../../../../../assets/imgs/notChecked.svg";
// redux
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import {
  addMetersIdToArr,
  removeMetersIdFromArr,
  setSelectedMeterObj,
} from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { ConcentratorMeterItemSideBar } from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByLorawanNUdp/components/Sidebars/ConcentratorMeterItemSideBar/ConcentratorMeterItemSideBar";

type PropsType = {
  meterData: any;
};

export const MetersLorawanListItem: FC<PropsType> = memo((props) => {
  const { meterData } = props;

  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSidebar = (bool: boolean) => setSideBarOpen(bool);

  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  const setSelectedMeterObjCallback = () => dispatch(setSelectedMeterObj(meterData));

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px" }}>
          <ConcentratorMeterItemSideBar close={() => setSideBarOpen(false)} />
        </div>
      </Drawer>

      <div className="power-lorawan-concentrator-meter-item">
        <Row className="power-lorawan-concentrator-meter-item__header " style={{ wordWrap: "break-word" }}>
          <Col xl={3} lg={3} md={4} sm={4}>
            <input
              type="checkbox"
              className="checkbox-table"
              checked={meterData.selected}
              onChange={(e) => {
                e.stopPropagation();
                if (e.target.checked) addMetersIdToArrCallBack(meterData.id);
                else removeMetersIdFromArrCallBack(meterData.id);
              }}
            />
            <span style={{ marginLeft: "20px" }}>{meterData.deviceName || "-"}</span>
          </Col>
          <Col xl={2} lg={2} md={4} sm={4} style={{ wordWrap: "break-word" }}>
            {meterData.serial || "-"}
          </Col>
          <Col xl={2} lg={2} md={4} sm={4} style={{ wordWrap: "break-word" }}>
            {meterData.personalAccountNumber || "-"}
          </Col>
          <Col xl={2} lg={2} md={4} sm={4}>
            {meterData.lastFixDate ? moment(meterData.lastFixDate).format("DD.MM.YYYY HH:mm") : "-"}
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}>
            {meterData.active ? <Checked /> : <NotChecked />}
          </Col>
          <Col xl={1} lg={1} md={4} sm={4}>
            {meterData.personalAccountNumber ? <Checked /> : <NotChecked />}
          </Col>
          <Col
            xl={1}
            lg={1}
            md={4}
            sm={4}
            style={{ display: "flex", justifyContent: "flex-end", paddingRight: "35px" }}
          >
            <img
              src={hovered ? icons.moreActiveIcon : icons.moreIcon}
              alt="menu"
              className="indication-meters-item__more"
              onClick={() => {
                setSelectedMeterObjCallback();
                toggleSidebar(true);
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          </Col>
        </Row>
      </div>
    </>
  );
});
