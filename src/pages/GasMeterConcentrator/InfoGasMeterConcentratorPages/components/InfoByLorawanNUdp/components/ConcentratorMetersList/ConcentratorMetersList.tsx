import React, { FC, useState, useEffect } from "react";
import { ConcentratorMeterItem } from "../ConcentratorMeterItem";
import { Col, Row, Spinner } from "react-bootstrap";

//components
import { Search } from "../../../../../../../components/uiKit/Search";

//redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { ConcentratorMeterType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { get–°oncentratorMeters } from "../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { setSelectedMeterObj } from "../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
import { Drawer } from "@material-ui/core";
import { ConcentratorMeterItemSideBar } from "../Sidebars/ConcentratorMeterItemSideBar/ConcentratorMeterItemSideBar";
import { ChangeReportingPeriodModal } from "../../../../../../../components/uiKit/modals/ChangeReportingPeriodModal/ChangeReportingPeriodModal";
import { ChangePulseRatioModal } from "../../../../../../../components/uiKit/modals/ChangePulseRatioModal/ChangeReportingPeriodModal";
import { ChangeDateAndTimeModal } from "../../../../../../../components/uiKit/modals/ChangeDateAndTimeModal/ChangeDateAndTimeModal";

type PropsType = {
  id: string;
};

export const ConcentratorMetersList: FC<PropsType> = ({ id }) => {
  const dispatch = useAppDispatch();

  const [pageNum, setPageNum] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");

  const { isFetchingSelectedConcentratorMeters, selectedConcentratorMeters } = useTypedSelector(
    (state) => state.waterMeterLorawanUdpDeviceConcentrator
  );

  const setSelectedMeterObjCallback = (meter: ConcentratorMeterType) => dispatch(setSelectedMeterObj(meter));

  useEffect(() => {
    dispatch(get–°oncentratorMeters({ id, page: 1 }));
  }, [id]);


  // SIDEBAR HANDLERS
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  // MODALS HANDLERS
  const [selectedMeterId, setSelectedMeterId] = useState<string>("");
  const [reportingPeriodModalOpen, setReportingPeriodModalOpen] = useState<boolean>(false);
  const [pulseRatioModalOpen, setPulseRatioModalOpen] = useState<boolean>(false);
  const [dateAndTimeModalOpen, setDateAndTimeModalOpen] = useState<boolean>(false);

  const openReportingPeriodModal = (meterId: string) => {
    setSelectedMeterId(meterId);
    setReportingPeriodModalOpen(true);
  };

  const openPulseRatioModal = (meterId: string) => {
    setSelectedMeterId(meterId);
    setPulseRatioModalOpen(true);
  };

  const openDateAndTimeModal = (meterId: string) => {
    setSelectedMeterId(meterId);
    setDateAndTimeModalOpen(true);
  };

  return (
    <>
      <ChangeDateAndTimeModal
        open={dateAndTimeModalOpen}
        onClose={() => setDateAndTimeModalOpen(false)}
        meterId={selectedMeterId}
      />
      <ChangeReportingPeriodModal
        open={reportingPeriodModalOpen}
        onClose={() => setReportingPeriodModalOpen(false)}
        meterId={selectedMeterId}
      />
      <ChangePulseRatioModal
        open={pulseRatioModalOpen}
        onClose={() => setPulseRatioModalOpen(false)}
        meterId={selectedMeterId}
      />
      <Drawer anchor={"right"} open={sideBarOpen} onClose={sideBarToggle(false)} classes={{ paper: "table-drawer" }}>
        <div style={{ width: "450px" }}>
          <ConcentratorMeterItemSideBar
            close={sideBarToggle(false)}
            openReportingPeriodModal={openReportingPeriodModal}
            openPulseRatioModal={openPulseRatioModal}
            openDateAndTimeModal={openDateAndTimeModal}
          />
        </div>
      </Drawer>
      <div className="gas-lorawan-udp-concentrator-meters-list">
        <span className="gas-lorawan-udp-concentrator-meters-list__title">
          –í—Ā–Ķ–≥–ĺ –Ņ—Ä–ł–Ī–ĺ—Ä–ĺ–≤ —É—á–Ķ—ā–į: {selectedConcentratorMeters?.data.length}
        </span>

        <div className="gas-lorawan-udp-concentrator-meters-list__filter d-flex ">
          <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
          <div className="mr12px "></div>
        </div>

        <div className="gas-lorawan-udp-concentrator-meters-list__header ">
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              –Ě–į–ł–ľ–Ķ–Ĺ–ĺ–≤–į–Ĺ–ł–Ķ
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              –°–Ķ—Ä.‚ĄĖ
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              –õ–ł—Ü–Ķ–≤–ĺ–Ļ —Ā—á–Ķ—ā
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              –ü–ĺ—Ā–Ľ–Ķ–ī–Ĺ—Ź—Ź –į–ļ—ā–ł–≤–Ĺ–ĺ—Ā—ā—Ć
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              –ź–ļ—ā–ł–≤–Ķ–Ĺ
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              –ü—Ä–ł–≤—Ź–∑–į–Ĺ
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}></Col>
          </Row>
        </div>
        <div className="gas-lorawan-udp-concentrator-meters-list__wrap">
          {isFetchingSelectedConcentratorMeters && (
            <div className="gas-lorawan-udp-concentrator-meters-list__preloader">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          {!isFetchingSelectedConcentratorMeters &&
            selectedConcentratorMeters?.data.map((item, index) => (
              <ConcentratorMeterItem
                key={item.id}
                meterData={item}
                setSelectedMeterObjCallback={setSelectedMeterObjCallback}
                sideBarToggle={sideBarToggle}
              />
            ))}
        </div>
      </div>
    </>
  );
};



