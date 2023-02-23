import moment from "moment";
import { Col, Row } from "react-bootstrap";
import React, { FC, useState, memo } from "react";
// icons
import { icons } from "../../../../../utils/icons/icons";
// components
import { Drawer } from "@material-ui/core";
import { ConcentratorItemSideBar } from "../../../../PowerMeterConcentrator/InfoPowerMeterConcentratorPages/components/InfoByLorawanNUdp/components/Sidebars/ConcentratorItemSideBar/ConcentratorItemSideBar";
import { useAppDispatch } from "../../../../../utils/hooks/reduxHooks";
import { setPowerLorawanSelectedConcentrator } from "../../../../../store/slicesAndThunks/powerConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";

type PropsType = {
  concentratorData: any;
  setSelectedGatewayFunc: (id: string) => void;
};

export const ConcentratorLorawanListItem: FC<PropsType> = memo((props) => {
  const { concentratorData, setSelectedGatewayFunc } = props;

  const dispatch = useAppDispatch();

  const [hovered, setHovered] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const toggleSidebar = (bool: boolean) => setSideBarOpen(bool);

  const setSelectedMeterObjCallback = () => dispatch(setPowerLorawanSelectedConcentrator(concentratorData));

  return (
    <>
      <Drawer
        anchor={"right"}
        open={sideBarOpen}
        onClose={() => setSideBarOpen(false)}
        classes={{ paper: "table-drawer" }}
      >
        <div style={{ width: "450px" }}>
          <ConcentratorItemSideBar close={() => setSideBarOpen(false)} />
        </div>
      </Drawer>

      <Row className="concentrators-list-item__row">
        <Col
          xl={1}
          lg={1}
          md={4}
          sm={4}
          className="concentrators-list-item__column table-group__column-checkbox"
          onClick={() => setSelectedGatewayFunc(concentratorData.id)}
        ></Col>

        <Col
          xl={3}
          lg={3}
          md={4}
          sm={4}
          className="concentrators-list-item__column"
          onClick={() => setSelectedGatewayFunc(concentratorData.id)}
        >
          <span className="concentrators-list-item__id">{`${concentratorData.gatewayID}` || "-"}</span>
        </Col>

        <Col
          xl={3}
          lg={3}
          md={4}
          sm={4}
          className="concentrators-list-item__column"
          onClick={() => setSelectedGatewayFunc(concentratorData.id)}
        >
          <span className="concentrators-list-item__id">{concentratorData.name || "-"}</span>
        </Col>

        <Col
          xl={2}
          lg={2}
          md={4}
          sm={4}
          className="concentrators-list-item__column"
          onClick={() => setSelectedGatewayFunc(concentratorData.id)}
        >
          <span className="concentrators-list-item__id">{concentratorData.description}</span>
        </Col>

        <Col
          xl={2}
          lg={2}
          md={4}
          sm={4}
          className="concentrators-list-item__column"
          onClick={() => setSelectedGatewayFunc(concentratorData.id)}
        >
          <span className="concentrators-list-item__id">
            {concentratorData.createdAt ? moment(concentratorData.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
          </span>
        </Col>

        <Col xl={1} lg={1} md={4} sm={4} className="concentrators-list-item__column">
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
      <hr className="tableDivider" />
    </>
  );
});
