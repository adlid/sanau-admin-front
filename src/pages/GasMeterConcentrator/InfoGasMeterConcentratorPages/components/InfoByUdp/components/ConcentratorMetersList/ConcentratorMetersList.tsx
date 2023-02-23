import { useHistory } from "react-router";
import * as queryString from "querystring";
import { Drawer } from "@material-ui/core";
import { Col, Modal, Row, Spinner } from "react-bootstrap";
import React, { FC, useState, useEffect } from "react";
import { ConcentratorMeterItem } from "../ConcentratorMeterItem";
//components
import { Search } from "../../../../../../../components/uiKit/Search";
//redux
import { GasConcentratorMeterType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import {
  activateGasMeter,
  deactivateGasMeter,
  getСoncentratorMeters,
} from "../../../../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.thunk";
import {
  removeAllMeters,
  selectAllMeters,
  setSelectedMeterObj,
} from "../../../../../../../store/slicesAndThunks/gasConcentrator/udpDevice/udpDevice.slice";
// SIDEBARS AND MODALS
import { ConcentratorMeterItemSideBar } from "../Sidebars/ConcentratorMeterItemSideBar/ConcentratorMeterItemSideBar";
import { ChangeReportingPeriodModal } from "../../../../../../../components/uiKit/modals/ChangeReportingPeriodModal/ChangeReportingPeriodModal";
import { ChangePulseRatioModal } from "../../../../../../../components/uiKit/modals/ChangePulseRatioModal/ChangeReportingPeriodModal";
import { ChangeDateAndTimeModal } from "../../../../../../../components/uiKit/modals/ChangeDateAndTimeModal/ChangeDateAndTimeModal";
import { MainButton } from "../../../../../../../components/uiKit/Buttons/MainButton";
import { OutlineButton } from "../../../../../../../components/uiKit/Buttons/OutlineButton";
import { Pagination } from "../../../../../../../components/uiKit/Pagination";

import { MountingModal } from "../../../../../../../components/uiKit/modals/MountingModal/MountingModal";
import { ActivateConcentratorMeterPopup } from "../../../../../../../components/powerMeterConcentrator/ActivateConcentratorMeterPopup";
import { DeactivateConcentratorMeterPopup } from "../../../../../../../components/powerMeterConcentrator/DeactivateConcentratorMeterPopup";

type PropsType = {
  detailHeaderHeight: number;
};

export const ConcentratorMetersList: FC<PropsType> = ({ detailHeaderHeight }) => {
  // hooks
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { page, tabValue }: any = queryString.parse(history.location.search.substring(1));

  // table tabs
  const [meterType, setMeterType] = useState<string>("all");

  // search
  const [searchValue, setSearchValue] = useState("");

  // data from redux
  const { isFetchingSelectedConcentratorMeters, selectedConcentratorMeters, selectedMeters } = useTypedSelector(
    (state) => state.gasMeterUdpDeviceConcentrator
  );
  const setSelectedMeterObjCallback = (meter: GasConcentratorMeterType) => dispatch(setSelectedMeterObj(meter));

  // sidebar handlers
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const sideBarToggle = (state: boolean) => (event: any) => setSideBarOpen(state);

  // state handlers
  const [activateDeactivateLoading, setActivateDeactivateLoading] = useState<boolean>(false);
  // modals handlers
  const [selectedMeterId, setSelectedMeterId] = useState<string>("");
  const [selectedMeter, setSelectedMeter] = useState<any>();
  const [reportingPeriodModalOpen, setReportingPeriodModalOpen] = useState<boolean>(false);
  const [pulseRatioModalOpen, setPulseRatioModalOpen] = useState<boolean>(false);
  const [dateAndTimeModalOpen, setDateAndTimeModalOpen] = useState<boolean>(false);
  const [mountingModalOpen, setMountingModalOpen] = useState<boolean>(false);

  const [deactivateConcentratorMeter, toggleDeactivateConcentratorMeter] = useState(false);
  const [activateConcentratorMeter, toggleActivateConcentratorMeter] = useState(false);

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

  const openMountingModal = (meter: any) => {
    setSelectedMeter(meter);
    setMountingModalOpen(!mountingModalOpen);
  };

  const onDeactivateMeterClick = async () => {
    setActivateDeactivateLoading(true);
    await dispatch(deactivateGasMeter(selectedMeters));
    setActivateDeactivateLoading(false);
  };

  const onActivateMeterClick = async () => {
    setActivateDeactivateLoading(true);
    await dispatch(activateGasMeter(selectedMeters));
    setActivateDeactivateLoading(false);
  };

  useEffect(() => {
    dispatch(getСoncentratorMeters(page || 1));
  }, []);

  return (
    <>
      <MountingModal open={mountingModalOpen} onClose={() => setMountingModalOpen(false)} meter={selectedMeter} />
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
      <Modal
        show={deactivateConcentratorMeter}
        onHide={() => toggleDeactivateConcentratorMeter(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <DeactivateConcentratorMeterPopup
          toggleDeactivateConcentratorMeter={toggleDeactivateConcentratorMeter}
          selectedMeters={selectedMeters}
          selectedConcentratorMeters={selectedConcentratorMeters?.data || []}
          isFetchingModal={activateDeactivateLoading}
          onClick={onDeactivateMeterClick}
        />
      </Modal>

      <Modal
        show={activateConcentratorMeter}
        onHide={() => toggleActivateConcentratorMeter(false)}
        dialogClassName="delete-concentrator-popup"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ActivateConcentratorMeterPopup
          toggleActivateConcentratorMeter={toggleActivateConcentratorMeter}
          selectedMeters={selectedMeters}
          selectedConcentratorMeters={selectedConcentratorMeters?.data || []}
          isFetchingModal={activateDeactivateLoading}
          onClick={onActivateMeterClick}
        />
      </Modal>
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

      <div
        className="gas-udp-concentrator-meters-list"
        style={{ height: `calc(100% - ${detailHeaderHeight + 16}px)`, position: "relative" }}
      >
        <span className="gas-udp-concentrator-meters-list__title">
          Всего приборов учета: {selectedConcentratorMeters?.data.length}
        </span>

        <div className="gas-udp-concentrator-meters-list__filter d-flex ">
          <Search value={searchValue} onChange={(value: string) => setSearchValue(value)} />
          <div className="mr12px" />
          <div className="d-flex">
            <MainButton
              title="Активировать"
              style={{ width: 158, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0}
              onClick={() => toggleActivateConcentratorMeter(true)}
            />
            <div className="mr12px "></div>
            <MainButton
              title="Деактивировать"
              isAlarm
              style={{ width: 175, height: 40, fontSize: 14 }}
              isDisabled={selectedMeters.length === 0}
              onClick={() => toggleDeactivateConcentratorMeter(true)}
            />
          </div>
        </div>

        {/* TODO ГАЗ */}
        <div className="gas-udp-concentrator-meters-list__category d-flex">
          <OutlineButton onClick={() => setMeterType("all")} selectedBtnValue={meterType} btnValue="all" name="Все" />
          <div className="mr12px"></div>
          <OutlineButton
            onClick={() => setMeterType("active")}
            selectedBtnValue={meterType}
            btnValue="active"
            name="Активные"
          />
          <div className="mr12px"></div>
          <OutlineButton
            onClick={() => setMeterType("deactive")}
            selectedBtnValue={meterType}
            btnValue="deactive"
            name="Заблокированные"
          />
          <div className="mr12px"></div>
          <OutlineButton
            onClick={() => setMeterType("deleted")}
            selectedBtnValue={meterType}
            btnValue="deleted"
            name="Удаленные"
          />
        </div>

        <div className="gas-udp-concentrator-meters-list__header ">
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={1} lg={1} md={4} sm={4}>
              <input
                type="checkbox"
                className="checkbox-table"
                checked={
                  selectedConcentratorMeters?.data.length !== 0 &&
                  selectedConcentratorMeters?.data.filter((meter) => selectedMeters.includes(meter.id)).length ===
                    selectedConcentratorMeters?.data.length
                }
                onChange={(e) => {
                  if (
                    selectedConcentratorMeters?.data.filter((meter) => selectedMeters.includes(meter.id)).length !==
                    selectedConcentratorMeters?.data.length
                  )
                    dispatch(selectAllMeters());
                  else dispatch(removeAllMeters());
                }}
              />
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Наименование
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Серийный номер
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Лицевой счет
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Последняя активность
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              Активен
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}>
              Привязан
            </Col>
            <Col xl={1} lg={1} md={4} sm={4}></Col>
          </Row>
        </div>
        <div className="gas-udp-concentrator-meters-list__wrap">
          {isFetchingSelectedConcentratorMeters && (
            <div className="gas-udp-concentrator-meters-list__preloader">
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
                openMountingModal={openMountingModal}
              />
            ))}
        </div>

        <div className="indication-meters-list__pagination">
          {selectedConcentratorMeters !== null && selectedConcentratorMeters?.data.length !== 0 && (
            <Pagination
              totalPage={+selectedConcentratorMeters?.totalPage || 1}
              page={+page || 1}
              onPageChanged={async (page) => {
                await history.push({ search: `?tabValue=${tabValue}&page=${page}` });
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
