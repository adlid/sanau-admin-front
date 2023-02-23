import * as queryString from "querystring";
import { Col, Row, Spinner } from "react-bootstrap";
import React, { FC, useState, useEffect } from "react";
import { Drawer, MenuItem, Select } from "@material-ui/core";
import { ConcentratorMeterItem } from "../ConcentratorMeterItem";
//components
import { Search } from "../../../../../../../components/uiKit/Search";
//redux
import { useAppDispatch, useTypedSelector } from "../../../../../../../utils/hooks/reduxHooks";
import { ConcentratorMeterType } from "../../../../../../../ts/types/lorawanUdpDevice.types";
import { searchСoncentratorMeters } from "../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.thunk";
import { setSelectedMeterObj } from "../../../../../../../store/slicesAndThunks/waterConcentrator/lorawanUdpDevice/lorawanUdpDevice.slice";
// sidebar
import { ConcentratorMeterItemSideBar } from "../Sidebars/ConcentratorMeterItemSideBar/ConcentratorMeterItemSideBar";
// modals
import { ChangeReportingPeriodModal } from "../../../../../../../components/uiKit/modals/ChangeReportingPeriodModal/ChangeReportingPeriodModal";
import { ChangePulseRatioModal } from "../../../../../../../components/uiKit/modals/ChangePulseRatioModal/ChangeReportingPeriodModal";
import { ChangeDateAndTimeModal } from "../../../../../../../components/uiKit/modals/ChangeDateAndTimeModal/ChangeDateAndTimeModal";
import { useHistory } from "react-router";
import { Pagination } from "../../../../../../../components/uiKit/Pagination";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const menuProps: any = {
  disableScrollLock: false,
  anchorOrigin: {
    vertical: 10,
    horizontal: -13,
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "12%",
    },
  },
};

type PropsType = {
  id: string;
  detailHeaderHeight: number;
};

export const ConcentratorMetersList: FC<PropsType> = ({ id, detailHeaderHeight }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");

  const [typeValue, setTypeValue] = useState("name");
  const handleChangeType = (event: any) => setTypeValue(event.target.value);

  const { page, tabValue }: any = queryString.parse(history.location.search.substring(1));

  const { isFetchingSelectedConcentratorMeters, selectedConcentratorMeters, selectedConcentrator } = useTypedSelector(
    (state) => state.waterMeterLorawanUdpDeviceConcentrator
  );

  const setSelectedMeterObjCallback = (meter: ConcentratorMeterType) => dispatch(setSelectedMeterObj(meter));

  const searchConcentratorMetersById = async () => {
    await dispatch(searchСoncentratorMeters({ id, page: page, query: searchValue, type: typeValue }));
  };

  useEffect(() => {
    searchConcentratorMetersById();
  }, [id]);

  useEffect(() => {
    setSearchValue("");
  }, [selectedConcentrator]);

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

      <div
        className="water-concentrator-meters-list"
        style={{
          height: `calc(100% - ${detailHeaderHeight + 16}px)`,
          position: "relative",
        }}
      >
        <span className="water-concentrator-meters-list__title">
          Всего приборов учета: {selectedConcentratorMeters?.data.length}
        </span>

        <div className="water-concentrator-meters-list__filter d-flex ">
          <Search
            value={searchValue}
            onChange={(value: string) => setSearchValue(value)}
            onEnterPress={searchConcentratorMetersById}
          />
          <div className="water-concentrator-meters-list__search-select-parent">
            <Select
              className="water-concentrator-meters-list__search-select"
              value={typeValue}
              onChange={handleChangeType}
              displayEmpty={true}
              MenuProps={menuProps}
            >
              <MenuItem value={"name"}>Наименование</MenuItem>
              <MenuItem value={"serial"}>Серийный номер</MenuItem>
              <MenuItem value={"personalAccountNumber"}>Лицевой счет</MenuItem>
              <MenuItem value={"partner"}>ФИО контрагента</MenuItem>
              <MenuItem value={"devEUI"}>devEUI</MenuItem>
              <MenuItem value={"address"}>Адрес</MenuItem>
              <MenuItem value={"type"}>Тип счетчика</MenuItem>
            </Select>
          </div>
        </div>

        <div className="water-concentrator-meters-list__header ">
          <Row style={{ maxWidth: "100%", paddingLeft: "25px" }}>
            <Col xl={3} lg={3} md={4} sm={4}>
              Наименование
            </Col>
            <Col xl={2} lg={2} md={4} sm={4}>
              Сер.№
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
        <div className="water-concentrator-meters-list__wrap">
          {isFetchingSelectedConcentratorMeters && (
            <div className="water-concentrator-meters-list__preloader">
              <Spinner animation="border" size="sm" />
            </div>
          )}

          {!isFetchingSelectedConcentratorMeters && !selectedConcentratorMeters?.data.length ? (
            <p style={{ display: "flex", width: "100%", margin: "20px 0px 0px", justifyContent: "center" }}>
              Нет данных
            </p>
          ) : (
            selectedConcentratorMeters?.data.map((item, index) => (
              <ConcentratorMeterItem
                key={item.id}
                meterData={item}
                setSelectedMeterObjCallback={setSelectedMeterObjCallback}
                sideBarToggle={sideBarToggle}
              />
            ))
          )}
        </div>

        <div className="indication-meters-list__pagination">
          {selectedConcentratorMeters !== null && selectedConcentratorMeters?.data.length !== 0 && (
            <Pagination
              totalPage={+selectedConcentratorMeters?.totalPage || 1}
              page={+page || 1}
              onPageChanged={async (page) => {
                await history.push({ search: `?tabValue=${tabValue}&page=${page}` });
                searchConcentratorMetersById();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
