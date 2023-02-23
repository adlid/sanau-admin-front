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
} from "../../../../../store/slicesAndThunks/powerConcentrator/gprs/gprs.slice";
import { ConcentratorGRPSItemSideBar } from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByTCP/components/ConcentratorItemSideBar/ConcentratorGRPSItemSideBar";

type PropsType = {
  meterData: any;
};

export const MetersTCPIPListItem: FC<PropsType> = memo((props) => {
  const { meterData } = props;

  const dispatch = useAppDispatch();
  const [hovered, setHovered] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSidebar = (bool: boolean) => setSideBarOpen(bool);

  const addMetersIdToArrCallBack = (id: string) => dispatch(addMetersIdToArr(id));
  const removeMetersIdFromArrCallBack = (id: string) => dispatch(removeMetersIdFromArr(id));

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px" }}>
          <ConcentratorGRPSItemSideBar close={() => setSideBarOpen(false)} selectedItem={meterData} />
        </div>
      </Drawer>
      <div className="power-lorawan-concentrator-meter-item">
        <Row style={{ wordWrap: "break-word", padding: "16px" }}>
          <Col xl={6}>
            <Row>
              <Col xl={1} lg={1}>
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
              </Col>
              <Col xl={3} lg={3}>
                {meterData.ip || "---"}
                {/* IP */}
              </Col>
              <Col xl={2} lg={2}>
                {meterData.port || "---"}
                {/* Порт */}
              </Col>
              <Col xl={3} lg={3}>
                {meterData.apnName || "---"}
                {/* Сетевой адрес */}
              </Col>
              <Col xl={3} lg={3}>
                {meterData.deviceId || "---"}
                {/* Серийный номер */}
              </Col>
            </Row>
          </Col>
          <Col xl={6}>
            <Row>
              <Col xl={3} lg={2}>
                {"---"}
                {/* Лицевой счет */}
              </Col>
              <Col xl={3} lg={2}>
                {meterData.updatedAt ? moment(meterData.updatedAt).format("DD.MM.YYYY HH:mm") : "---"}
                {/* Посл. активность */}
              </Col>
              <Col xl={2} lg={2}>
                {meterData.active ? <Checked /> : <NotChecked />}
              </Col>
              <Col xl={2} lg={2}>
                {"---"}
                {/* Привязан */}
              </Col>
              <Col xl={2} lg={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img
                  src={hovered ? icons.moreActiveIcon : icons.moreIcon}
                  alt="menu"
                  className="indication-meters-item__more"
                  onClick={() => toggleSidebar(true)}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
});
